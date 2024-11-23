// app.ts or server.ts
//import '../@types/express';
// other imports

import UserService from './app'

import AppCredentials from './helpers/app-credentials'

UserService.connectDb(AppCredentials.dbUrl)

UserService.start(AppCredentials.port)