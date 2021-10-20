import { AppMiddlewareInterface } from "../Core/Interfaces/AppMiddleware.interface";
import cors from 'cors';


export class CorsMiddleware implements AppMiddlewareInterface {
    getMiddleware() {
        return cors();
    }

}