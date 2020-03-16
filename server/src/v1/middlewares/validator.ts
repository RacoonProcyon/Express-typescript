import { ERROR } from '../constant';
import { Request, Response, NextFunction } from 'express';
import { handleError, sendResp } from '../util';
import { validationResult } from 'express-validator/check';

export const validator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            next();
        } else {
            console.error('Field validation failed', error.mapped());
            return sendResp(res, ERROR.FIELD_VALIDATION_FAILED, {});
        }
    } catch (err) {
        return handleError(res, err, {});
    }
}