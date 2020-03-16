import { Response } from 'express';

export const sendResp = (res: Response, msg: IResponseMessage, result?: any) => {
    return res.status(msg.headerCode).json({
        success: msg.success,
        message: msg.message,
        statusCode: msg.statusCode,
        result
    });
}

export const handleError = (res: Response, err: Error, result: any) => {
    global.logger.error(err.message)
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
        result
    })
}

export interface IResponseMessage {
    success: boolean;
    statusCode: number;
    message: string;
    headerCode: number;
}