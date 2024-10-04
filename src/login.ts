import { Request, Response} from 'express';
import * as auth from './auth';
import dotenv from 'dotenv';
import { converteUsuario, LoginDTO, UsuarioLogadoDTO, UsuarioLoginDTO } from './model/interface';
dotenv.config();

export default class Login{
    static async validacao(req: Request, res: Response){
        try{
            console.log("Fazendo login");
            const { user, password } = req.body as LoginDTO;
            const usuario = await req.prisma.usuario.findFirst({ 
                where: { 
                    usuario: user, 
                }, 
                include: { 
                    pessoa: true
                }
            });
            if(usuario) {
                console.log("Autenticação para o usuário "+ usuario?.pessoa.nome +" "+usuario?.pessoa.sobrenome);
                if(await auth.compararSenha(password, usuario.password)) {
                    const result = converteUsuario(usuario);
                    const token = auth.gerarToken(result);
                    const logado: UsuarioLogadoDTO = {
                        id: usuario.id,
                        nome: result.nome,
                        token: token
                    }
                    return res.status(200).json(logado);
                } else {
                    return res.status(401).json({msg: "Usuário ou senha invalido."});
                }
            } else {
                return res.status(401).json({msg: "Usuário ou senha invalido."});
            }
        } catch (error){
            console.log(error)
            return res.status(500).json({msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes'});
        } finally {
            await req.prisma.$disconnect();
        }
    }
};