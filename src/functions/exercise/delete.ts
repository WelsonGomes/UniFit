import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

async function deleteExercise(prisma: PrismaClient, req: Request, res: Response, id: number){

    try {

        await prisma.$transaction(async (prismaTransaction) => {

            console.log('Buscando cadastro para deletar');

            const response = await prismaTransaction.exercicio.findUnique({ where: { id: id }});

            if(response) {

                try {

                    console.log('Deletando exercício da base');

                    await prismaTransaction.exercicio.delete({ where: { id: id }});

                    console.log('Exercício deletada da base');

                    return res.status(200).json({msg: "Exercício deletado da base de dados"});

                } catch (error) {

                    console.log(error);

                    return res.status(400).json({msg: error});

                }

            } else {

                console.log('Exercício não encontrada na base');

                return res.status(400).json({msg: 'Não foi possivel localizar este cadastro'});

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({msg: error});

    }

}

export default deleteExercise;