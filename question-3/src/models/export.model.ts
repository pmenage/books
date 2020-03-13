import { JobState } from '../helpers/job.helper';

export enum ExportType {
    EPUB = 'epub',
    PDF = 'pdf',
}

export class ExportModel {
    bookId: string;
    type: ExportType;
    state: JobState;
    createdAt: number;
    updatedAt: number;

    constructor(bookId: string, type: ExportType) {
        this.bookId = bookId;
        this.type = type;
        this.state = JobState.PENDING;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
