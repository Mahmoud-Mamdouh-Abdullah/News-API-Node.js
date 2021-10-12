import express from 'express';

import { AppMiddlewareInterface } from "../Core/Interfaces/AppMiddleware.interface";

export class BodyParserMiddleware implements AppMiddlewareInterface {
    getMiddleware(): any {
        return express.json();
    }

}