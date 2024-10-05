import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ExercicioDTO } from '../../model/interface';
dotenv.config();

async function CreateExercise(prisma: PrismaClient, exercicioDTO: ExercicioDTO, req: Request, res: Response){
    try {
        
        await prisma.$transaction(async (prismaTransaction) => {

            return prismaTransaction.exercicio.create({ data: exercicioDTO });

        });

        return res.status(201).json({msg: "Novo exercício cadastrado com sucesso."});

    } catch (error) {
        
        console.log(error);
        return res.status(400).json({msg: `Houve um erro ao realizar o cadastro do exercício. ${error}`})

    }
}

export default CreateExercise;