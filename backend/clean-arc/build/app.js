"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const express, { Application } = require('express')
const pg_1 = require("pg");
const dbConnection_1 = require("./dbConnection");
client: pg_1.Pool;
constructor();
{
    this.client = (0, dbConnection_1.pgClient)();
}
dbConnection_1.pgClient.connect(function (err) {
    if (err)
        throw err;
    console.log("Database Connected!");
});
