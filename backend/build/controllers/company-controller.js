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
const company_repository_1 = __importDefault(require("../repositories/company-repository"));
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class CompanyController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //include logged in user's ID as owner of company
                const ownerId = req.auth ? req.auth._id : null;
                if (!ownerId) {
                    return res.status(400).json({ message: 'User ID not found in token' });
                }
                req.body.owner_id = ownerId;
                const salt = yield bcrypt.genSalt();
                req.body.apikey = yield bcrypt.hash(req.body.name, salt);
                let company = yield company_repository_1.default.create(req.body);
                return {
                    message: 'Company added successfully!', company,
                };
            }
            catch (error) {
                console.log('Error registering company: ', error);
                next(new internal_server_error_1.InternalServerError('Failed to register company'));
            }
        });
    }
    /*
    
        public viewuser = async(req: Request, res: Response): Promise<AuthDoc | null> => {
    
            try {
    
                const authid = req.params.authid
                let auth = await AuthRepository.findWithID(authid)
    
                    return auth
        
            } catch(error) {
                console.log(error)
                throw new InternalServerError()
            }
        }
    
    
    
    
    */
    getCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return company_repository_1.default.getAll();
        });
    }
}
exports.default = new CompanyController();
