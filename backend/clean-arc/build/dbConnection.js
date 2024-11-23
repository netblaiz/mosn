"use strict";
/*
const { Pool } = require('pg')
require('dotenv').config()

let client: Pool

export const pgClient = (): Pool => {

if(!client) {

  client = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(`${process.env.DB_PORT}`),

})
}

return client

}

  

/*client.connect(function(err) {

  if(err) throw err
  console.log("Database Connected!")

})*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgClient = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client;
const pgClient = () => {
    if (!client) {
        client = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: parseInt(`${process.env.DB_PORT}`),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }
    return client;
};
exports.pgClient = pgClient;
