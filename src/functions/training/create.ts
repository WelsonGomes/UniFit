import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { TreinoDTO } from '../../model/interface';
dotenv.config();


async function CreateTraining(prisma: PrismaClient, treinoDTO: TreinoDTO, req: Request, res: Response){
    try {
        
        await prisma.$transaction(async (prismaTransaction) => {

            //return prismaTransaction.treino.create({ data: treinoDTO });

        });

        return res.status(201).json({msg: "Novo treino cadastrado com sucesso."});


    } catch (error) {
        
        console.log(error);
        return res.status(400).json({msg: `Houve um erro ao realizar o cadastro do exercício. ${error}`})

    }
}

export default CreateTraining;