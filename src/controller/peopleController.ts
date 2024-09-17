import { Request, Response } from 'express';
import dotenv from 'dotenv';
import CreatePeople from '../functions/people/create';
import SelectPeople from '../functions/people/select';
import UpdatePeople from '../functions/people/update';
import DeletePeople from '../functions/people/delete';

dotenv.config();

async function createPeople(req: Request, res: Response) {
    try {
        const pessoaDTO = req.body;
        const create = await CreatePeople(req.prisma, pessoaDTO, req, res);
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

async function selectPeople(req: Request, res: Response) {
    try {
        let skip = parseInt(req.query.page as string,10) || 1;
        let take = parseInt(req.query.pageSize as string,10) || 1;
        let id = parseInt(req.query.id as string,10);
        let type = parseInt(req.query.type as string,10);
        if(type > 0){
            const select = await SelectPeople(req.prisma, req, res, skip, take, id, type);
            return select;
        } else {
            return res.status(400).json({msg: 'É necessário passar na requisição o tipo de pessoa'});
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
    } finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}

async function updatePeople(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const pessoaDTO = req.body;
        const update = await UpdatePeople(req.prisma, pessoaDTO, req, res, id);
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

async function deletePeople(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const apagar = await DeletePeople(req.prisma, req, res, id);
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

export { createPeople, selectPeople, updatePeople, deletePeople }