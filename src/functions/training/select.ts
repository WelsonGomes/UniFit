import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

async function SelectTraining(prisma: PrismaClient, req: Request, res: Response, skip: number, take: number, id: number){

}

export default SelectTraining;