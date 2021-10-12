import { NewsRouter } from './Routes/NewsRouter';
import { Server } from './Core/Server';
import { BodyParserMiddleware } from './Middleware/BodyParserMiddleware';

/**
 * intialize server
 */
const app = new Server();

/**
 * add middleware
 */
app.middleware(new BodyParserMiddleware());

/**
 * add router
 */
app.route(new NewsRouter());

/**
 * add UI
 */
app.addUI('../website');

/**
 * open server
 */
app.listen(5000);