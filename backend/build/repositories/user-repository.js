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
const user_model_1 = require("../models/user-model");
class UserRepository {
    constructor() {
        this.create = (UserData) => __awaiter(this, void 0, void 0, function* () {
            return new user_model_1.User(UserData).save();
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.find({});
        });
        this.findWithID = (userid) => __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findById(userid);
        });
        this.login = (query) => __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne(query);
        });
        /*
            find = async(query: {}): Promise<UserDoc[] | null> => {
        
                return User.find(query)
            }
        
            login = async(query: {}): Promise<UserDoc | null> => {
        
                return User.find(query)
            }
        
        
        
            activateaccount = async (id: string, activated: boolean): Promise<AuthDoc | null> => {
        
                _id = mongoose.Types.ObjectId(Authentication)
        
                return Auth.findOneAndUpdate({_id: _id}, {$set: {activated: true}}, {new: true})
            }
        */
    }
}
exports.default = new UserRepository();
