export class ImportModel {
    bookId: string;
    type: 'word' | 'pdf' | 'wattpad' | 'evernote';
    url: string;
    state: 'pending' | 'finished';
    createdAt: number;
    updatedAt: number;

    constructor(bookId: string, type: 'word' | 'pdf' | 'wattpad' | 'evernote', url: string) {
        this.bookId = bookId;
        this.type = type;
        this.url = url;
        this.state = 'pending';
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
