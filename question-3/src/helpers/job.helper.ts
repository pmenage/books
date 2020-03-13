export const getImportJobDuration = (type: 'word' | 'pdf' | 'wattpad' | 'evernote' | 'test'): number => {
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

export const getExportJobDuration = (type: 'epub' | 'pdf' | 'test'): number => {
    switch (type) {
        case 'epub':
            return 10000;
        case 'pdf':
            return 25000;
        case 'test':
            return 500
        default:
            return 60000;
    }
}