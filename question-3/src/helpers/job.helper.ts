import { ExportType } from '../models/export.model';
import { ImportType } from '../models/import.model';

export enum JobState {
    PENDING = 'pending',
    FINISHED = 'finished',
}

export const getImportJobDuration = (type: ImportType | 'test'): number => {
    switch (type) {
        case 'word':
        case 'pdf':
        case 'wattpad':
        case 'evernote':
            return 60000;
        case 'test':
            return 500
        default:
            return 60000;
    }
}

export const getExportJobDuration = (type: ExportType | 'test'): number => {
    switch (type) {
        case ExportType.EPUB:
            return 10000;
        case ExportType.PDF:
            return 25000;
        case 'test':
            return 500
        default:
            return 60000;
    }
}