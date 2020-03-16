import { BaseRoute } from '../routes';
import { UserRoute } from './user';

export class V1Routes extends BaseRoute {

    public static path = '/v1';
    private static instance: V1Routes;

    private constructor() {
        super();
        this.init();
    }

    static get router() {
        //applying singleton method to create only one instance of the router class
        if (!V1Routes.instance) {
            V1Routes.instance = new V1Routes();
        }
        return V1Routes.instance.router;
    }

    private init() {

        // Route handler for the Admin routes
        this.router.use(UserRoute.path, UserRoute.router);
    }
}