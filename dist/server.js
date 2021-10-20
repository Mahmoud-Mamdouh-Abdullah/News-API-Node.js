"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsRouter_1 = require("./Routes/NewsRouter");
var CustomServer_1 = require("./Core/CustomServer");
var BodyParserMiddleware_1 = require("./Middleware/BodyParserMiddleware");
var UsersRouter_1 = require("./Routes/UsersRouter");
var AuthRouter_1 = require("./Routes/AuthRouter");
var CorsMiddleware_1 = require("./Middleware/CorsMiddleware");
/**
 * intialize server
 */
var app = new CustomServer_1.CustomServer();
/**
 * add middleware
 */
app.middleware(new BodyParserMiddleware_1.BodyParserMiddleware());
app.middleware(new CorsMiddleware_1.CorsMiddleware());
/**
 * add router
 */
app.route(new NewsRouter_1.NewsRouter());
app.route(new UsersRouter_1.UsersRouter());
app.route(new AuthRouter_1.AuthRouter());
/**
 * add UI
 */
app.addUI('public');
/**
 * open server
 */
app.listen(5000);
