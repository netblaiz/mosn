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
exports.authenticateToken = void 0;
const passport_1 = __importDefault(require("../config/passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_repository_1 = __importDefault(require("../repositories/auth-repository"));
const user_repository_1 = __importDefault(require("../repositories/user-repository"));
const resource_not_found_error_1 = require("../helpers/errors/resource-not-found-error");
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
class AuthController {
    constructor() {
        //creates a new user
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt();
                req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
                req.body.lastlogin = '2024-12-12';
                req.body.lastip = '192.168.100.1';
                req.body.qrcode = yield bcryptjs_1.default.hash(req.body.username, salt);
                req.body.userhash = yield bcryptjs_1.default.hash(req.body.username + req.body.password, salt);
                req.body.activationemailkey = yield bcryptjs_1.default.hash(req.body.username + req.body.password, salt);
                let auth = yield auth_repository_1.default.create(req.body);
                req.body.authid = auth._id;
                let user = yield user_repository_1.default.create(req.body);
                res.status(201).json({
                    message: "User successfully created!",
                    auth,
                    user,
                });
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //login an existing with passport 
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', { session: false }, (err, auth, info) => {
                if (err)
                    return next(err);
                if (!auth)
                    return res.status(401).json({ message: 'Invalid credentials!' });
                const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
                const jwtPayLoad = { authId: auth._id, role: auth.role };
                console.log(jwtPayLoad);
                const token = jsonwebtoken_1.default.sign(jwtPayLoad, SECRET_KEY, { expiresIn: '1h' });
                return res.json({ token, message: 'Login successfully' });
            })(req, res, next);
        });
        //view a single user info *must be authorized
        this.viewuser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authid = req.params.authid;
                let auth = yield auth_repository_1.default.findWithID(req.params.authid);
                if (!auth)
                    throw new resource_not_found_error_1.ResourceNotFoundError('User not found');
                res.json(auth);
                next();
            }
            catch (error) {
                next(error);
            }
        });
        //passport jwt method to for authorization
        this.authenticateToken = passport_1.default.authenticate('jwt', { session: false });
    }
    //generate new token using passport js
    generateToken(auth) {
        const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
        return jsonwebtoken_1.default.sign({ authId: auth._id, role: auth.role }, SECRET_KEY, { expiresIn: '1h' });
    }
    /*
    
        public activateAccount = async(req: Request, res: Response): Promise<AuthDoc | null> => {
    
            try {
    
                let  id = req.body.id
                let activated = req.body.activated
                let auth = await AuthRepository.activateaccount(id, activated)
    
                    return auth
        
            } catch(error) {
                console.log(error)
                throw new InternalServerError()
            }
        }
    
    */
    getAuths() {
        return __awaiter(this, void 0, void 0, function* () {
            return auth_repository_1.default.getAll();
        });
    }
}
exports.authenticateToken = passport_1.default.authenticate('jwt', { session: false });
exports.default = new AuthController();
