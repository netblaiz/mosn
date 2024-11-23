"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_route_1 = require("../helpers/base-route");
const passport_1 = __importDefault(require("../config/passport"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const auth_validation_handler_1 = __importDefault(require("../middlewares/auth-validation-handler"));
class AuthRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/user/register")
            .post(auth_validation_handler_1.default.create, (req, res, next) => {
            auth_controller_1.default.register(req, res)
                .then(auth => {
                return res.status(201).send(auth);
            }).catch(error => {
                next(error);
            });
        });
        this.app.route("/user/login")
            .post((req, res, next) => {
            passport_1.default.authenticate('local', { session: false }, (err, auth, info) => {
                if (err)
                    return next(err);
                if (!auth)
                    return res.status(401).json({ message: 'Invalid credentials!' });
                const token = auth_controller_1.default.generateToken(auth);
                return res.json({ token, message: 'Login successfully' });
            })(req, res, next);
        });
        this.app.route("/user/profile")
            .get(passport_1.default.authenticate('jwt', {
            session: false
        }), (req, res, next) => {
            auth_controller_1.default.viewuser(req, res, next)
                .then(auth => {
                return res.status(201).send(auth);
            }).catch(error => {
                next(error);
            });
        });
        /*
        
        
                this.app.route("/user/profile")
                .get(passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: NextFunction) => {
                    AuthController.viewuser(req, res, next)
                    .then(auth=>{
                        return res.status(201).send(auth)
                    }).catch(error =>{
                        next(error)
                    })
                })
        
                /*
                .put(AuthValidation.create, async(req: Request, res: Response, next: NextFunction) => {
        
                    AuthController.create(req, res)
                    .then(auth=>{
                        return res.status(201).send(auth)
                    }).catch(error =>{
                        next(error)
                    })
                }) */
        return this.app;
    }
}
exports.default = AuthRoutes;
