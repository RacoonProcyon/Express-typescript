import { Request, Response, NextFunction } from 'express';
import { userEntity } from '../../entity';
import { sendResp, handleError, randomStringGenerator, jwtTokenGenerator, jwtTokenVerifier, hashPassword, sendMail, checkOtpExpiry } from '../../util';
import { SUCCESS, ERROR, CONSTANT } from '../../constant';

/**
 * @author 
 * @description this controller cointains actions for users account related activities
 */
export class UserController {
    constructor() { }

    /**
     * @description User sign up
     * @param req 
     * @param res 
     */
    public async userSignup(req: Request, res: Response) {
        try {
            let { fullName, email } = req.body;
            let user = await userEntity.findUser({ email: email });
            if (user) {
                return sendResp(res, ERROR.EMAIL_ALREADY_EXIST);
            }
            let userData = {
                fullName: fullName,
                email: email,
            }

            // Save user data
            user = await userEntity.saveUser(userData);
            const token = await jwtTokenGenerator({ tokenData: { email: email } });
            console.log(token)
            let mailData = {
                to: email, // list of receivers
                subject: 'email verification', // Subject line
                html: `<html><h3>Please click on below link to verify the email</h3></br><a href="http://localhost:5000/users/emailVerify?token=${token}">${token}</a></html> ` // html body
            }
            // send mail
            sendMail(mailData);
            return sendResp(res, SUCCESS.SIGNUP, user);
        } catch (err) {
            return handleError(res, err, {});
        }
    }

    /**
     * @description User login
     * @param req 
     * @param res 
     */
    public async userLogin(req: Request, res: Response) {
        try {
            let { email } = req.body;
            console.log(email)
            let user = await userEntity.findUser({ email: email });
            console.log(user,'user');
            if (!user) {
                return sendResp(res, ERROR.EMAIL_NOT_REGISTERED);
            }
            if (!user.isEmailVerified) {
                return sendResp(res, ERROR.EMAIL_NOT_VERIFIED);
            }
            const token = await jwtTokenGenerator({ tokenData: { email: email, fullName: user.fullName } });
            user['token'] = token;
            return sendResp(res, SUCCESS.DEFAULT, user);
        } catch (err) {
            return handleError(res, err, {});
        }
    }

    /**
     * @description Email verification
     * @param req 
     * @param res 
     */
    public async emailVerification(req: Request, res: Response) {
        try {
            const { token } = req.query;
            const data = await jwtTokenVerifier({ token });
            if (data.failed) {
                return sendResp(res, ERROR.TOKEN_EXPIRED);
            }
            const user = await userEntity.findOneAndUpdate({ email: data.tokenData.email }, { isEmailVerified: true }, {});
            return sendResp(res, SUCCESS.EMAIL_VERIFIED, user);
        } catch (err) {
            return handleError(res, err, {});
        }
    }

}