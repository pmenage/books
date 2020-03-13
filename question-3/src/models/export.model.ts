export class ExportModel {
    bookId: string;
    type: 'epub' | 'pdf';
    state: 'pending' | 'finished';
    createdAt: number;
    updatedAt: number;

    constructor(bookId: string, type: 'epub' | 'pdf') {
        this.bookId = bookId;
        this.type = type;
        this.state = 'pending';
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
