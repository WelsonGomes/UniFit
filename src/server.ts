import { NextFunction, Request, Response, Router } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { middleware } from './middleware';
import { PrismaClient } from '@prisma/client';
const route = require('./router');

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            prisma: PrismaClient;
        }
    }
}

const app = express();
const port = process.env.SERVICE_PORT;

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(middleware);
app.get('/',(req: Request, res: Response) => {
    return res.status(200).json({msg: `App Running on port ${port}`});
});
app.post('/login');
app.use(route);
app.use(async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', async () => {
        await req.prisma.$disconnect();
    });
    next();
});

app.listen(port, ()=>{
    console.log(`App Running on port ${port}`);
});
