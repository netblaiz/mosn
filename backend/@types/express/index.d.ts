// @types/express/index.d.ts
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        _id: any
        userId: any
        role: any
      };
    }
  }
}
