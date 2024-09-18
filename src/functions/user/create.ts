import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { UsuarioDTO } from '../../model/interface';
import bcrypt from 'bcrypt';
dotenv.config();

async function CreateUser(prisma: PrismaClient, usuarioDTO: UsuarioDTO, req: Request, res: Response) {
    try {
        console.log('Criando um novo usuário.');
        let hashPassword = await bcrypt.hash('UniFit@1234567',10);
        const result = await prisma.$transaction(async (prismaTransaction) => {
            return await prismaTransaction.usuario.create({
                data: {
                    pessoaid: usuarioDTO.pessoaid,
                    permissao: usuarioDTO.permissao,
                    usuario: usuarioDTO.usuario,
                    password: hashPassword,
                    dtacadastro: new Date(Date.now())
                }
            });
        });
        if(result){
            return true;
        } else {
            return false;
        };
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default CreateUser;