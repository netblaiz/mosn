// @types/express/index.d.ts
import express from 'express';

declare module global {
  namespace Express {
    interface Request {
      auth: {
        _id
        userId
        role
      };
    }
  }
}
