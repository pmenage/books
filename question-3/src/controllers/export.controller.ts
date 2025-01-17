import { Request, Response } from 'express';
import { ExportModel, ExportType } from '../models/export.model';
import { getExportJobDuration, JobState } from '../helpers/job.helper';

export class ExportController {
    exportModelList: ExportModel[] = [
        {
            bookId: '06e8d6dd-f0d5-4d84-a13b-82fe1db58a6f',
            type: ExportType.EPUB,
            state: JobState.FINISHED,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            bookId: 'eefac8a5-18cb-4a93-9b80-9bab1d185e40',
            type: ExportType.PDF,
            state: JobState.FINISHED,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ];
    timeoutIds: NodeJS.Timeout[] = [];

    findAll(req: Request, res: Response) {
        try {
            const exportListByState = {
                pending: this.exportModelList.filter(exportModel => exportModel.state === JobState.PENDING),
                finished: this.exportModelList.filter(exportModel => exportModel.state === JobState.FINISHED),
            }
            res.status(200).send(exportListByState);
        } catch (e) {
            res.status(404).send(e.message);
        }
    };

    create(req: Request, res: Response) {
        const index = this.exportModelList.length;
        const exportModel = req.body;
        try {
            this.exportModelList.push(new ExportModel(exportModel.bookId, exportModel.type));
            res.sendStatus(201);
        } catch (e) {
            res.status(500).send(e.message);
            return;
        }

        const timeout = getExportJobDuration(exportModel.type);

        const timeoutId = setTimeout(() => {
            const timeoutIndex = this.timeoutIds.indexOf(timeoutId);
            if (timeoutIndex > -1) {
                this.timeoutIds.splice(timeoutIndex, 1);
            }
            this.exportModelList[index].state = JobState.FINISHED;
            this.exportModelList[index].updatedAt = Date.now();
        }, timeout);

        this.timeoutIds.push(timeoutId);
    };

    clearTimeouts() {
        this.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    }
}
