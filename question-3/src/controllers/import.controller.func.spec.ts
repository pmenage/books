import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import { ImportController } from './import.controller';

describe('ImportController', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    let importController: ImportController;

    describe('create', () => {
        beforeEach(() => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse();
            importController = new ImportController();
        });
        afterEach(() => {
            importController.clearTimeouts();
        })
        test('should create a new import', () => {
            // Given
            req.body = {
                import: {
                    bookId: '06e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
                    type: 'test',
                    url: 'http://www.example.com',
                }
            }

            // When
            importController.create(req, res);

            // Then
            expect(res.statusCode).toBe(201);
        });

        test('should create a new import with pending state', async () => {
            // Given
            req.body = {
                import: {
                    bookId: '36e8d6dd-f0d5-4d84-a13b-82fe1db58a6',
                    type: 'test',
                    url: 'http://www.example.com',
                }
            }

            // When
            importController.create(req, res);

            // Then
            const lastImport = importController.importModelList.find(importModel => importModel.bookId === req.body.import.bookId);
            expect(lastImport?.state).toBe('pending');
        });

        test('should create a new import with finished state after 1 second', async () => {
            // Given
            req.body = {
                import: {
                    bookId: '16e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
                    type: 'test',
                    url: 'http://www.example.com',
                }
            }

            // When
            importController.create(req, res);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Then
            const lastImport = importController.importModelList.find(importModel => importModel.bookId === req.body.import.bookId);
            expect(lastImport?.state).toBe('finished');
        });

        test('should return an internal server error', () => {
            req.body = {
                test: {
                    bookId: '26e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
                    type: 'test',
                    url: 'http://www.example.com',
                }
            }
            importController.create(req, res);
            expect(res.statusCode).toBe(500);
        });
    });
})
