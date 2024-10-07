import { Request, Response } from 'express';
import dotenv from 'dotenv';
import CreateExercise from '../functions/exercise/create';
import SelectExercise from '../functions/exercise/select';
import UpdateExercise from '../functions/exercise/update';
import DeleteExercise from '../functions/exercise/delete';

dotenv.config();

async function createExercise(req: Request, res: Response){
    try {
        const pessoaDTO = req.body;
        console.log(req.prisma);
        const create = await CreateExercise(req.prisma, pessoaDTO, req, res);
        return create;
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
    } finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}

async function selectExercise(req: Request, res: Response) {
    try {
        let skip = parseInt(req.query.page as string,10) || 1;
        let take = parseInt(req.query.pageSize as string,10) || 1;
        let id = parseInt(req.query.id as string,10);
        const select = await SelectExercise(req.prisma, req, res, skip, take, id);
        return select;
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
    } finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}

async function updateExercise(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const pessoaDTO = req.body;
        const update = await UpdateExercise(req.prisma, pessoaDTO, req, res, id);
        return update;
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
    } finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}

async function deleteExercise(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const apagar = await DeleteExercise(req.prisma, req, res, id);
        return apagar;
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
    } finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}

export { createExercise, selectExercise, updateExercise, deleteExercise };