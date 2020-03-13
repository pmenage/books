import { Request, Response } from 'express';
import { ImportModel } from '../models/import.model';

export class ImportController {
    importModelList: ImportModel[] = [
        {
            bookId: 'e0ca5478-4d53-4252-b3d3-21b0d12b13e9',
            type: 'word',
            url: 'url1',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: '53c7a69a-8ef1-44ce-92e2-f1dcf0402bfa',
            type: 'pdf',
            url: 'url2',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: 'a80aa5d4-ed86-4d16-b063-db03bf869694',
            type: 'wattpad',
            url: 'url3',
            state: 'finished',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
    ];

    findAll(req: Request, res: Response) {
        try {
            res.status(200).send(this.importModelList);
        } catch (e) {
            res.status(404).send(e.message);
        }
    };

    create(req: Request, res: Response) {
        const index = this.importModelList.length;
        try {
            this.importModelList.push(new ImportModel(req.body.import.bookId, req.body.import.type, req.body.import.url));
            res.sendStatus(201);
        } catch (e) {
            res.status(500).send(e.message);
        }

        setTimeout(() => {
            this.importModelList[index].state = 'finished';
            this.importModelList[index].updatedAt = Date.now();
        }, 5000)
    };
}
