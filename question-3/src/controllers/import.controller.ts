import { Request, Response } from 'express';
import { ImportModel, ImportType } from '../models/import.model';
import { getImportJobDuration, JobState } from '../helpers/job.helper';

export class ImportController {
    importModelList: ImportModel[] = [
        {
            bookId: 'e0ca5478-4d53-4252-b3d3-21b0d12b13e9',
            type: ImportType.WORD,
            url: 'http://www.example.com',
            state: JobState.FINISHED,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: '53c7a69a-8ef1-44ce-92e2-f1dcf0402bfa',
            type: ImportType.EVERNOTE,
            url: 'http://www.example.com',
            state: JobState.FINISHED,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ];
    timeoutIds: NodeJS.Timeout[] = [];

    findAll(req: Request, res: Response) {
        try {
            res.status(200).send(this.importModelList);
        } catch (e) {
            res.status(404).send(e.message);
        }
    };

    create(req: Request, res: Response) {
        const index = this.importModelList.length;
        const importModel = req.body.import;
        try {
            this.importModelList.push(new ImportModel(importModel.bookId, importModel.type, importModel.url));
            res.sendStatus(201);
        } catch (e) {
            return res.status(500).send(e.message);
        }

        const timeout = getImportJobDuration(importModel.type);

        const timeoutId = setTimeout(() => {
            const timeoutIndex = this.timeoutIds.indexOf(timeoutId);
            if (timeoutIndex > -1) {
                this.timeoutIds.splice(timeoutIndex, 1);
            }
            this.importModelList[index].state = JobState.FINISHED;
            this.importModelList[index].updatedAt = Date.now();
        }, timeout);

        this.timeoutIds.push(timeoutId);
    };

    clearTimeouts() {
        this.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    }
}
