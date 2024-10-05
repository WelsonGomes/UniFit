import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ExercicioDTO } from '../../model/interface';
dotenv.config();

async function SelectExercise(prisma: PrismaClient, req: Request, res: Response, skip: number, take: number, id: number){

    try {

        skip = (skip - 1) * take;

        console.log("Buscando o total de registro na base");

        const total = await prisma.exercicio.count();

        console.log('Buscando os dados do(s) exercício(s)');

        const exerc = await prisma.exercicio.findMany({ 

            where: { ...(id && { id }) },
            skip: skip,
            take: take,
            orderBy: {nome: 'asc'}
            
        });

        if(!exerc){

            console.log("Não foi encontrado pessoas");

            return res.status(200).json({page: skip, pageSize: take, total: total, dados: []});

        };

        console.log('Processando os dados para retorno');

        const response: ExercicioDTO[] = exerc.map((dados) => {
            return { 

                id: dados.id,
                nome: dados.nome,
                descricao: dados.descricao,
                execucao: dados.execucao,
                equipamento: dados.equipamento,
                grupomuscular: dados.grupomuscular,
                imagemurl: dados.imagemurl

            }
        });

        console.log('Processo concluido');

        return res.status(200).json({page: skip, pageSize: take, total: total, dados: response});

    } catch (error) {

        console.log(error);

        return res.status(400).json({msg: `Houve um erro ao selecionar o cadastro. ${error}`});

    }

}

export default SelectExercise;