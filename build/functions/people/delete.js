"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function DeletePeople(prisma, req, res, id) {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            console.log('Buscando cadastro para deletar');
            const response = await prismaTransaction.pessoa.findUnique({ where: { id: id, situacao: 1 } });
            if (response) {
                try {
                    console.log('Deletando pessoa da base');
                    await prismaTransaction.pessoa.update({ where: { id: id }, data: { situacao: 0 } });
                    console.log('Pessoa deletada da base');
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
                return 'Cadastro deletado com sucesso';
            }
            else {
                console.log('Pessoa não encontrada na base');
                return 'Não foi possivel localizar este cadastro';
            }
        });
        return res.status(200).json({ msg: result });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
exports.default = DeletePeople;
