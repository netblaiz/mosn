import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import { Auth, AuthDoc } from '../models/auth-model'
import AuthRepository from '../repositories/auth-repository'
import { AuthenticationError } from '../helpers/errors/authentication-error'

import { Request } from 'express'

import dotenv from 'dotenv'
dotenv.config()


const JWT_SECRET = process.env.SECRET_KEY || 'default_secret_key'

//passport local strategy to authenticate user...user can use either username or email to login
passport.use(
  new LocalStrategy(
    { usernameField: 'identifier', passwordField: 'password' },
    async (identifier: string, password: string, done) => {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const auth = emailRegex.test(identifier)
          ? await AuthRepository.findOne({ email: identifier })
          : await AuthRepository.findOne({ username: identifier });

        if (!auth) 
        	return done(new AuthenticationError('User not found'), false);

        const isMatch = await bcrypt.compare(password, auth.password);
        
        if (!isMatch) return done(new AuthenticationError('Invalid credentials'), false);

        return done(null, auth);
      } catch (error) {
        return done(error);
      }
    }
  )
)

const opts: StrategyOptions = {

	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET,
	passReqToCallback: true,
}



//passport jwt strategy (payload includes { userid | role )
passport.use(

		new JwtStrategy(opts, async (req: Request, jwt_payload, done) => {
			try {

//cross-ref jwt with user info in database				
			const auth = await AuthRepository.findWithID(jwt_payload.authId)
				//console.log(auth) for debugging purpose


				if(!auth) {
					return done(new AuthenticationError('User not found'), false)
				}

				req.auth = auth
				return done(null, auth)

			} catch (error) {
				return done(error, false)
			}
		}
	)
	)



export default passport