import { body, validationResult } from 'express-validator';
import { NextFunction, Response, Request } from 'express';

export const importValidationRules = () => {
    return [
        body('import.bookId', 'Book id must be a guid - for example: 93a1a11b-5ce4-4dcd-8d47-aa3221ba9f26').isLength({ min: 36, max: 36 }),
        body('import.type', 'Type must be one of the following: word, pdf, wattpad, or evernote').matches(/^(word|pdf|wattpad|evernote)$/),
        body('import.url', 'Url must be a valid url.').matches(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/),
    ];
}

export const exportValidationRules = () => {
    return [
        body('export.bookId', 'Book id must be a guid - for example: 93a1a11b-5ce4-4dcd-8d47-aa3221ba9f26').isLength({ min: 36, max: 36 }),
        body('export.type', 'Type must be one of the following: word, pdf, wattpad, or evernote').matches(/^(epub|pdf)$/),
    ];
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any[] = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}