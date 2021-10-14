"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsRouter_1 = require("./Routes/NewsRouter");
var Server_1 = require("./Core/Server");
var BodyParserMiddleware_1 = require("./Middleware/BodyParserMiddleware");
/**
 * intialize server
 */
var app = new Server_1.Server();
/**
 * add middleware
 */
app.middleware(new BodyParserMiddleware_1.BodyParserMiddleware());
/**
 * add router
 */
app.route(new NewsRouter_1.NewsRouter());
/**
 * add UI
 */
app.addUI('public');
/**
 * open server
 */
app.listen(5000);
