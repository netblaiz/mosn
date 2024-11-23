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
const base_route_1 = require("../helpers/base-route");
const passport_1 = __importDefault(require("../config/passport"));
const company_controller_1 = __importDefault(require("../controllers/company-controller"));
const company_validation_handler_1 = __importDefault(require("../middlewares/company-validation-handler"));
class CompanyRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        /*
        
        
                this.app.route("/companies")
                .post(CompanyValidation.create, passport.authenticate('jwt', { session: false }), checkAbility('create', 'Company'), async (req: Request, res: Response, next: NextFunction) => {
                    CompanyController.register(req, res)
                    .then(auth=>{
                        return res.status(201).send(auth)
                    }).catch(error =>{
                        next(error)
                    })
                })
        */
        // 
        this.app.route("/companies")
            .post(passport_1.default.authenticate('jwt', { session: false }), company_validation_handler_1.default.create, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield company_controller_1.default.register(req, res, next);
                return res.status(201).json(company);
            }
            catch (error) {
                next(error);
            }
        }));
        return this.app;
    }
}
exports.default = CompanyRoutes;
