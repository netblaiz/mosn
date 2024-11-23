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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = require("../models/auth-model");
class AuthRepository {
    constructor() {
        this.create = (AuthData) => __awaiter(this, void 0, void 0, function* () {
            return new auth_model_1.Auth(AuthData).save();
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return auth_model_1.Auth.find({});
        });
        this.findWithID = (authid) => __awaiter(this, void 0, void 0, function* () {
            return auth_model_1.Auth.findById(authid);
        });
        this.findOne = (credential) => __awaiter(this, void 0, void 0, function* () {
            return auth_model_1.Auth.findOne(credential);
        });
        /*
        
            find = async(query: {}): Promise<AuthDoc[] | null> => {
        
                try {
        
                    const authEntry = await Auth.findOne({ username })
        
                    if(!authEntry) {
        
                        return res.status(401).json( {message: 'Invalid Credentials!'} )
                    }
        
                    const isMatch = await bcrypt.compare(password, authEntry.password)
        
                    if(!isMatch) {
                        return res.status(401).json( {message: 'Invalid Credentials!'} )
                    }
        
                } catch(err) {
        
                    res.status(500).json({ error: err.message })
                }
        
                return Auth.find(query)
            }
        
        
        
            login = async(username: string, password: string): Promise<AuthDoc | null> => {
        
                return Auth.findOne({ username: username }, {password: password })
            }
        
        
        
            activateaccount = async (id: string, activated: boolean): Promise<AuthDoc | null> => {
        
                _id = mongoose.Types.ObjectId(Authentication)
        
                return Auth.findOneAndUpdate({_id: _id}, {$set: {activated: true}}, {new: true})
            }
        */
    }
}
exports.default = new AuthRepository();