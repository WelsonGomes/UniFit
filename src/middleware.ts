import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { getPrismaClient } from './prisma';
dotenv.config();

function middleware(req: Request, res: Response, next: NextFunction) {
    console.log('verificando cliente na requisição');
    const schema = req.query.schema as string;
    console.log('Cliente request: ' + schema);
    if (!schema) {
      return res.status(400).json({ error: 'Cliente não definido...' });
    };
    req.prisma = getPrismaClient(schema);
    next();
}

export { middleware };