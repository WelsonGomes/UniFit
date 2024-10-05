import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { UsuarioDTO } from '../../model/interface';
dotenv.config();

async function SelectUser(prisma: PrismaClient, req: Request, res: Response, skip: number, take: number, id: number){

    try {

        skip = (skip - 1) * take;

        console.log("Buscando o total de registro na base");

        const total = await prisma.usuario.count({ where: { situacao: 1 }});

        console.log('Buscando os dados do(s) usuário(s)');

        const user = await prisma.usuario.findMany({ 

            where: { situacao: 1, ...(id && { id }) },
            skip: skip,
            take: take,
            orderBy: {usuario: 'asc'}
            
        });

        if(!user){

            console.log("Não foi encontrado usuário(s)");

            return res.status(200).json({page: skip, pageSize: take, total: total, dados: []});

        };

        console.log('Processando os dados para retorno');

        const response: UsuarioDTO[] = user.map((dados) => {
            return { 

                id: dados.id,
                pessoaid: dados.pessoaid,
                permissao: dados.permissao,
                usuario: dados.usuario,
                password: "",
                dtacadastro: dados.dtacadastro,
                situacao: dados.situacao

            }
        });

        console.log('Processo concluido');

        return res.status(200).json({page: skip, pageSize: take, total: total, dados: response});

    } catch (error) {

        console.log(error);

        return res.status(400).json({msg: `Houve um erro ao selecionar o cadastro. ${error}`});

    }

}

export default SelectUser;