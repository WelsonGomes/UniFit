import { NextFunction, Request, Response, Router } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { middleware } from './middleware';
import { PrismaClient } from '@prisma/client';
const route = require('./router');
import Login from './login';
import { validaToken } from './auth';

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

app.post('/login', Login.validacao);

app.use(validaToken);

console.log('Token Valido, seguindo para rotas');

app.use(route);

app.use(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Finalizando a conexão do prisma')
    res.on('finish', async () => {
        await req.prisma.$disconnect();
        console.log('Conexão finalizada');
    });
    next();
});

app.listen(port, ()=>{
    console.log(`App Running on port ${port}`);
});
