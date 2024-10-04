import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UsuarioLoginDTO } from './model/interface';

const secretkey = '?xQn1pCMCv';

export const gerarToken = (usuario: UsuarioLoginDTO): string => {
    const token = jwt.sign({ usuario }, secretkey, { expiresIn: '2h' }); 
    return token;
};

export const compararSenha = async (senha: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(senha, hash);
};

export const validaToken = (req: Request, res: Response, next: NextFunction): void | Response => {

    try {

        const token = req.headers.authorization?.split(' ')[1];

        if(token){

            let dec: JwtPayload | string;

            try {
                
                dec = jwt.verify(token, secretkey);

                if(typeof dec === 'string'){

                    return res.status(401).json({msg: "Informa um token valido."});

                };

                (req as any).usuario = (dec as { 

                    usuario: UsuarioLoginDTO

                }).usuario;

                next();

            } catch (error) {
                
                return res.status(401).json({msg: "Este token é invalido ou expirado."});

            } 

        } else {

            return res.status(401).json({msg: "Token é obrigatório."});

        }
    
    } catch (error) {

        return res.status(401).json({msg: "Token é obrigatório ou é invalido."});

    }
}