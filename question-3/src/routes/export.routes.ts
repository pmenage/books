import { Router, Request, Response } from 'express';
import { ExportController } from '../controllers/export.controller';

class ExportRoutes {
    public router: Router = Router();
    public exportController: ExportController = new ExportController();

    constructor() {
        this._config();
    }

    private _config(): void {
        this.router.get('/', (req: Request, res: Response) =>
            this.exportController.findAll(req, res)
        );
        this.router.post('/', (req: Request, res: Response) =>
            this.exportController.create(req, res)
        );
    }
}

export const exportRoutes = new ExportRoutes().router;