import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { TreinoDTO } from '../../model/interface';
dotenv.config();

async function UpdateTraining(prisma: PrismaClient, treinoDTO: TreinoDTO, req: Request, res: Response, id: number) {

}

export default UpdateTraining;