
import { CONSTANT } from './global';
export const SUCCESS = {
    DEFAULT: {
        statusCode: CONSTANT.HTTP_CODE.OK,
        headerCode: CONSTANT.HTTP_CODE.OK,
        message: 'Success',
        success: true
    },
    SIGNUP: {
        statusCode: CONSTANT.HTTP_CODE.OK,
        headerCode: CONSTANT.HTTP_CODE.OK,
        message: 'we have sent the number verification link on your number ID please verify it',
        success: true
    },
    FORGOT_PASSWORD: {
        statusCode: CONSTANT.HTTP_CODE.OK,
        headerCode: CONSTANT.HTTP_CODE.OK,
        message: 'Forgot password mail sent successfully',
        success: true
    },
    PASSWORD_UPDATED: {
        statusCode: CONSTANT.HTTP_CODE.OK,
        headerCode: CONSTANT.HTTP_CODE.OK,
        message: 'Password updated successfully',
        success: true
    },
    EMAIL_VERIFIED: {
        statusCode: CONSTANT.HTTP_CODE.OK,
        headerCode: CONSTANT.HTTP_CODE.OK,
        message: 'Email verified',
        success: true
    }
}
export const ERROR = {
    REQUEST_ALREADY_SENT: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: "This request is sent, try another one",
        success: false,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST
    },
    FIELD_VALIDATION_FAILED: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: 'Field validation failed',
        success: false
    },
    INTERNAL_SERVER: {
        statusCode: CONSTANT.HTTP_CODE.INTERNAL_SERVER_ERROR,
        headerCode: CONSTANT.HTTP_CODE.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        success: false
    },
    EMAIL_ALREADY_EXIST: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: "This email is taken, try another one",
        success: false,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST
    },
    EMAIL_NOT_REGISTERED: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: "This email is not registered",
        success: false,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST
    },
    PASSWORD_INVALID: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: 'Password is invalid',
        success: false
    },
    TOKEN_EXPIRED: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: 'Token expired',
        success: false
    },
    EMAIL_NOT_VERIFIED: {
        statusCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        headerCode: CONSTANT.HTTP_CODE.BAD_REQUEST,
        message: 'Email not verified, Please verify your email',
        success: false
    }
}