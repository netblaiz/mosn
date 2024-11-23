"use strict";
// app.ts or server.ts
//import '../@types/express';
// other imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_credentials_1 = __importDefault(require("./helpers/app-credentials"));
app_1.default.connectDb(app_credentials_1.default.dbUrl);
app_1.default.start(app_credentials_1.default.port);
