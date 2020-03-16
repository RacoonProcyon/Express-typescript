import { BaseRoute } from './routes';
import { V1Routes } from './v1/v1.routes';


export class ApiRoutes extends BaseRoute {

    public static path = '/api';
    private static instance: ApiRoutes;

    private constructor() {
        super();
        this.init();
    }

    static get router() {
        //applying singleton method to create only one instance of the router class
        if (!ApiRoutes.instance) {
            ApiRoutes.instance = new ApiRoutes();
        }
        return ApiRoutes.instance.router;
    }

    private init() {

        // Route handler for the Admin routes
        this.router.use(V1Routes.path, V1Routes.router);
    }
}