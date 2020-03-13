import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import { ExportController } from './export.controller';
import { JobState } from '../helpers/job.helper';

describe('ExportController', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    let exportController: ExportController;

    describe('create', () => {
        beforeEach(() => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse();
            exportController = new ExportController();
        });
        afterEach(() => {
            exportController.clearTimeouts();
        })
        test('should create a new export', () => {
            // Given
            req.body = {
                bookId: '06e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
                type: 'test',
            }

            // When
            exportController.create(req, res);

            // Then
            expect(res.statusCode).toBe(201);
        });

        test('should create a new export with pending state', async () => {
            // Given
            req.body = {
                bookId: '36e8d6dd-f0d5-4d84-a13b-82fe1db58a6',
                type: 'test',
            }

            // When
            exportController.create(req, res);

            // Then
            const lastExport = exportController.exportModelList.find(exportModel => exportModel.bookId === req.body.bookId);
            expect(lastExport?.state).toBe(JobState.PENDING);
        });

        test('should create a new export with finished state after 1 second', async () => {
            // Given
            req.body = {
                bookId: '16e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
                type: 'test',
            }

            // When
            exportController.create(req, res);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Then
            const lastExport = exportController.exportModelList.find(exportModel => exportModel.bookId === req.body.bookId);
            expect(lastExport?.state).toBe(JobState.FINISHED);
        });

        test('should find initial exports and pending should be empty', () => {
            // Given

            // When
            exportController.findAll(req, res);

            // Then
            expect(res.statusCode).toBe(200);
            expect(res._getData().pending.length).toBe(0);
        });

        test('should find initial exports and finished should have length 2', () => {
            // Given

            // When
            exportController.findAll(req, res);

            // Then
            expect(res.statusCode).toBe(200);
            expect(res._getData().finished.length).toBe(2);
        });
    });
})
