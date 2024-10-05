import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { UsuarioDTO } from '../../model/interface';
import bcrypt from 'bcrypt';
dotenv.config();


async function UpdateExercise(prisma: PrismaClient, usuarioDTO: UsuarioDTO, req: Request, res: Response, id: number) {

    try {

        console.log('Iniciando processo de atualização do cadastro de usuário');

        console.log('Usuário a ser atualizado ' + id);

        const updateUser: any = {};

        console.log('Verificando os campos a serem alterados no cadastro de usuário');

        if(usuarioDTO.permissao){updateUser.permissao = usuarioDTO.permissao};

        if(usuarioDTO.usuario){updateUser.usuario = usuarioDTO.usuario};

        if(usuarioDTO.password){

            let hashPassword = await bcrypt.hash(usuarioDTO.password,10);

            updateUser.password = hashPassword
        };

        if(usuarioDTO.dtacadastro){updateUser.dtacadastro = usuarioDTO.dtacadastro};

        console.log('Iniciando processo de atualização na base');

        await prisma.$transaction(async (prismaTransaction) => {

            let exerc: any = {};

            if(updateUser.permissao || updateUser.usuario || updateUser.password || updateUser.dtacadastro){

                console.log('atualizando usuário');

                exerc = await prismaTransaction.usuario.update({

                    where: { id: id },

                    data: updateUser

                });

            };

            return {exerc};

        });

        return res.status(200).json({msg: 'Atualização de cadastro realizado com sucesso.'});

    } catch (error) {

        console.log(error);

        return res.status(400).json({msg: error});

    }
}

export default UpdateExercise;