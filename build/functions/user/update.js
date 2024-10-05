"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
async function UpdateExercise(prisma, usuarioDTO, req, res, id) {
    try {
        console.log('Iniciando processo de atualização do cadastro de usuário');
        console.log('Usuário a ser atualizado ' + id);
        const updateUser = {};
        console.log('Verificando os campos a serem alterados no cadastro de usuário');
        if (usuarioDTO.permissao) {
            updateUser.permissao = usuarioDTO.permissao;
        }
        ;
        if (usuarioDTO.usuario) {
            updateUser.usuario = usuarioDTO.usuario;
        }
        ;
        if (usuarioDTO.password) {
            let hashPassword = await bcrypt_1.default.hash(usuarioDTO.password, 10);
            updateUser.password = hashPassword;
        }
        ;
        if (usuarioDTO.dtacadastro) {
            updateUser.dtacadastro = usuarioDTO.dtacadastro;
        }
        ;
        console.log('Iniciando processo de atualização na base');
        await prisma.$transaction(async (prismaTransaction) => {
            let exerc = {};
            if (updateUser.permissao || updateUser.usuario || updateUser.password || updateUser.dtacadastro) {
                console.log('atualizando usuário');
                exerc = await prismaTransaction.usuario.update({
                    where: { id: id },
                    data: updateUser
                });
            }
            ;
            return { exerc };
        });
        return res.status(200).json({ msg: 'Atualização de cadastro realizado com sucesso.' });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
    }
}
exports.default = UpdateExercise;
