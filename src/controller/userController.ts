import { Request, Response } from 'express';
import dotenv from 'dotenv';
import SelectUser from '../functions/user/select';
import UpdateUser from '../functions/user/update';
import DeleteUser from '../functions/user/delete';

dotenv.config();

async function selectUser(req: Request, res: Response){
    try {
        let skip = parseInt(req.query.page as string,10) || 1;
        let take = parseInt(req.query.pageSize as string,10) || 1;
        let id = parseInt(req.query.id as string,10);
        const select = await SelectUser(req.prisma, req, res, skip, take, id);
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

async function updateUser(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const usuarioDTO = req.body;
        const update = await UpdateUser(req.prisma, usuarioDTO, req, res, id);
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

async function deleteUser(req: Request, res: Response) {
    try {
        const id = parseInt(req.query.id as string,10);
        const apagar = await DeleteUser(req.prisma, req, res, id);
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

export { selectUser, updateUser, deleteUser };