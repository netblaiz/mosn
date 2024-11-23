"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
class BaseRoute {
    constructor(app) {
        this.app = app;
        this.setUpRoutes();
    }
}
exports.BaseRoute = BaseRoute;
