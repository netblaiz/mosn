//const express, { Application } = require('express')
import { Pool } from 'pg'
import { pgClient } from './dbConnection'

private client: Pool

 constructor() {
    this.client = pgClient()
  }

pgClient.connect(function(err) {

  if(err) throw err
  console.log("Database Connected!")

})


