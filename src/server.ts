import { NewsRouter } from './Routes/NewsRouter';
import { CustomServer } from './Core/CustomServer';
import { BodyParserMiddleware } from './Middleware/BodyParserMiddleware';
import { UsersRouter } from './Routes/UsersRouter';
import { AuthRouter } from './Routes/AuthRouter';
import { CorsMiddleware } from './Middleware/CorsMiddleware';

/**
 * intialize server
 */
const app = new CustomServer();

/**
 * add middleware
 */
app.middleware(new BodyParserMiddleware());
app.middleware(new CorsMiddleware());
/**
 * add router
 */
app.route(new NewsRouter());
app.route(new UsersRouter());
app.route(new AuthRouter());

/**
 * add UI
 */
app.addUI('public');

/**
 * open server
 */
app.listen(5000);