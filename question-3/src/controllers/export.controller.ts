import { Request, Response } from 'express';
import { ExportModel } from '../models/export.model';

export class ExportController {
    exportModelList: ExportModel[] = [
        {
            bookId: '06e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
            type: 'epub',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: 'eefac8a5-18cb-4a93-9b80-9bab1d185e40',
            type: 'pdf',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: '1488a310-c57b-4e09-9810-194718273aa5',
            type: 'epub',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ];

    findAll(req: Request, res: Response) {
        try {
            res.status(200).send(this.exportModelList);
        } catch (e) {
            res.status(404).send(e.message);
        }
    };

    create(req: Request, res: Response) {
        const index = this.exportModelList.length;
        try {
            this.exportModelList.push(new ExportModel(req.body.export.bookId, req.body.export.type));
            res.sendStatus(201);
        } catch (e) {
            res.status(500).send(e.message);
        }

        setTimeout(() => {
            this.exportModelList[index].state = 'finished';
            this.exportModelList[index].updatedAt = Date.now();
        }, 5000)
    };
}
