//this is the admin router file
import { BaseRoute } from '../../routes';
import { UserController } from '../../../v1/controllers';
import { validator, checkBody, checkEmail, checkBodyOptional, checkParamMongoId, numberCheck, numberCheckOptional, checkArrayOptional, checkMongoIdOptional, mongoIdChecker } from '../../../v1/middlewares';

export class UserRoute extends BaseRoute {
    public static path = '/users';
    private static instance: UserRoute;
    private userController = new UserController();

    private constructor() {
        super();
        //initiating the routers
        this.init();
    }

    static get router() {
        if (!UserRoute.instance) {
            UserRoute.instance = new UserRoute();
        }
        return UserRoute.instance.router;
    }

    private async init() {
        // userSignup
        this.router.post(
            '/signup',
            [
                checkEmail('email'),
                checkBody('fullName'),
                validator,
            ],
            (req, res) => { this.userController.userSignup(req, res) }
        );

        // user login
        this.router.post(
            '/login',
            [
                checkEmail('email'),
                validator,
            ],
            (req, res) => { this.userController.userLogin(req, res) }
        );
        
        // verify email
        this.router.get(
            '/emailVerify',
            [
                checkBody('token'),
                validator,
            ],
            (req, res) => { this.userController.emailVerification(req, res) }
        );

    }
}