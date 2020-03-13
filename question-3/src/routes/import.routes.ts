import { Request, Response, Router } from "express";
import { ImportController } from "../controllers/import.controller";
import { importValidationRules, validate } from "../validators/validator";

class ImportRoutes {
    public router: Router = Router();
    public importController: ImportController = new ImportController();

    constructor() {
        this._config();
    }

    private _config(): void {
        this.router.get('/', (req: Request, res: Response) =>
            this.importController.findAll(req, res)
        );
        this.router.post('/', importValidationRules(), validate, (req: Request, res: Response) =>
            this.importController.create(req, res)
        );
    }
}

export const importRoutes = new ImportRoutes().router;