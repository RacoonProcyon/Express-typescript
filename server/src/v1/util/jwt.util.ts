import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { CONSTANT } from '../constant';

export const jwtTokenGenerator = async (data) => {
    let tokenData = data.tokenData || {};
    let token = await jwt.sign(tokenData, CONSTANT.SERVER.JWT_SECRET, { algorithm: 'HS256', expiresIn: data.expiresIn || 5 * 24 * 60 });
    return { token }
}

export const jwtTokenVerifier = async (data) => {
    try {
        let token = data.token || "";
        let tokenData = jwt.verify(token, CONSTANT.SERVER.JWT_SECRET, { algorithm: 'HS256' });
        if(!tokenData) return { failed: true };
        return { failed: false, tokenData };
    } catch(err) {
        global.log("err: ", err);
        return { failed: true };
    }
}