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