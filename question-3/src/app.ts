import express from 'express';
import bodyParser from 'body-parser';
import { exportRoutes } from './routes/export.routes';
import { importRoutes } from './routes/import.routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this._config();
        this._initRoutes();
    }

    private _config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private _initRoutes(): void {
        this.app.use('/export', exportRoutes);
        this.app.use('/import', importRoutes);
    }
}

export default new App().app;