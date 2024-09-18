"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
async function CreateUser(prisma, usuarioDTO, req, res) {
    try {
        console.log('Criando um novo usuário.');
        let hashPassword = await bcrypt_1.default.hash('UniFit@1234567', 10);
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
        if (result) {
            return true;
        }
        else {
            return false;
        }
        ;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.default = CreateUser;
