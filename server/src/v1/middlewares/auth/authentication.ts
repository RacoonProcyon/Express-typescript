import { mongo } from 'mongoose';
const { ObjectID } = mongo;
import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../../constant';
import { handleError, sendResp } from '../../util'

export const userCheckSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        const userType = req.headers['type']; //tells us about the type of user
        if (!token) return sendResp(res, ERROR.FIELD_VALIDATION_FAILED, {});
        const headerType = token.split(' ')[0];
        const tokenValue = token.split(' ')[1] && token.split(' ')[1].trim();
        if (headerType.trim() === "Bearer" && tokenValue && ObjectID.isValid(tokenValue)) {
            // const isUser = await AdminSession.findOneAndUpdate(
            //     { _id: tokenValue, isDeleted: false },
            //     { lastActiveTime: new Date() }).populate("adminId").lean().exec();
            // if (!isUser) return sendResp(res, ERROR_MESSAGES.SESSION_INVALID, {});
            // res.locals.userId = isUser['adminId']["_id"];
            // res.locals.userData = isUser["adminId"];
            // res.locals.sessionId = isUser['_id'];
            // res.locals.sessionData = isUser;
            next();
        } else return sendResp(res, ERROR.FIELD_VALIDATION_FAILED, {});
    } catch (err) {
        return handleError(res, err, {});
    }
}