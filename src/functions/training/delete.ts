import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

async function deleteTraining(prisma: PrismaClient, req: Request, res: Response, id: number) {

}

export default deleteTraining;