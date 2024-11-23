"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import './@types/express';
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("./config/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const company_routes_1 = __importDefault(require("./routes/company-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_handler_1 = require("./middlewares/error-handler");
const database_connection_error_1 = require("./helpers/errors/database-connection-error");
const swaggerUi = require("swagger-ui-express");
const fs_1 = __importDefault(require("fs"));
class OnBoardingService {
    constructor() {
        this.swaggerFile = (process.cwd() + '/swagger.json');
        this.swaggerData = fs_1.default.readFileSync(this.swaggerFile, 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
        this.start = (port) => {
            return this.app.listen(port, () => {
                console.log(`OnBoarding is running on port >>> ${port}`);
            });
        };
        /*
            private initializeRedis = async () => {
        
                await connectRedis()
            }
        
        
        
            private initializeSession = () => {
                this.app.use(
                    session({
                        secret: process.env.SESSION_SECRET || 'your-session-secret',
                        resave: false,
                        saveUninitialized: false,
                        cookie: { secure: false, httpOnly: true, maxAge: 60000 },
                    })
                )
            }
        */
        this.initializePassport = () => {
            /*
                    const redisStore = new RedisStore({ client: redisClient
                    })
                    this.app.use(
                        session({
                            store: redisStore,
                            secret: process.env.SESSION_SECRET || 'your-session-secret',
                            resave: false,
                            saveUninitialized: false,
                            cookie: { secure: false, httpOnly: true, maxAge: 60000 },
                        })
                        )
            */
            this.app.use(passport_1.default.initialize());
            //this.app.use(passport.session())
        };
        this.initializeRoutes = () => {
            new auth_routes_1.default(this.app);
            new company_routes_1.default(this.app);
            // in OnBoardingService.ts
            this.app.route('/')
                .get((req, res) => __awaiter(this, void 0, void 0, function* () {
                return res.status(200).send(`Mosn Onboarding Service Running`);
            }));
            this.app.use(error_handler_1.errorHandler);
        };
        this.getAppInstance = () => {
            return this.app;
        };
        this.runJobs = () => {
        };
        this.connectDb = (dbUrl) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(dbUrl);
                console.log(`Successfully connected to Database!`);
            }
            catch (error) {
                console.log(`Error connecting to Database`, error);
                throw new database_connection_error_1.DatabaseConnectionError('Error connecting DB');
            }
        });
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        //this.initializeRedis()
        //this.initializeSession()
        this.initializePassport();
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
        this.initializeRoutes();
    }
}
exports.default = new OnBoardingService();
