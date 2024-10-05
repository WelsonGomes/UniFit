import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ExercicioDTO } from '../../model/interface';
dotenv.config();


async function UpdateExercise(prisma: PrismaClient, exercicioDTO: ExercicioDTO, req: Request, res: Response, id: number) {

    try {

        console.log('Iniciando processo de atualização do cadastro de exercício');

        console.log('Exercício a ser atualizado ' + id);

        const updateExercise: any = {};

        const updateData: any = {};

        console.log(exercicioDTO);

        console.log('Verificando os campos a serem alterados no cadastro de exercício');

        if(exercicioDTO.nome){updateExercise.nome = exercicioDTO.nome};

        if(exercicioDTO.descricao){updateExercise.descricao = exercicioDTO.descricao};

        if(exercicioDTO.execucao){updateExercise.execucao = exercicioDTO.execucao};

        if(exercicioDTO.equipamento){updateExercise.equipamento = exercicioDTO.equipamento};

        if(exercicioDTO.grupomuscular){updateExercise.grupomuscular = exercicioDTO.grupomuscular};

        if(exercicioDTO.imagemurl){updateExercise.imagemurl = exercicioDTO.imagemurl};

        console.log(updateExercise);

        console.log('Iniciando processo de atualização na base');

        await prisma.$transaction(async (prismaTransaction) => {

            let exerc: any = {};

            if(updateExercise.nome || updateExercise.descricao || updateExercise.execucao || updateExercise.equipamento || updateExercise.grupomuscular || updateExercise.imagemurl){

                console.log('atualizando exercício');

                exerc = await prismaTransaction.exercicio.update({

                    where: { id: id },

                    data: updateExercise

                });

            };

            return {exerc};

        });

        return res.status(200).json({msg: 'Atualização de cadastro realizado com sucesso.'});

    } catch (error) {

        console.log(error);

        return res.status(400).json(error);

    }
}

export default UpdateExercise;