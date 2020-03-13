import { JobState } from '../helpers/job.helper';

export enum ImportType {
    WORD = 'word',
    PDF = 'pdf',
    WATTPAD = 'wattpad',
    EVERNOTE = 'evernote',
}

export class ImportModel {
    bookId: string;
    type: ImportType;
    url: string;
    state: JobState;
    createdAt: number;
    updatedAt: number;

    constructor(bookId: string, type: ImportType, url: string) {
        this.bookId = bookId;
        this.type = type;
        this.url = url;
        this.state = JobState.PENDING;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
