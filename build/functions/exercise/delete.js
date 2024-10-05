"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function deleteExercise(prisma, req, res, id) {
    try {
        await prisma.$transaction(async (prismaTransaction) => {
            console.log('Buscando cadastro para deletar');
            const response = await prismaTransaction.exercicio.findUnique({ where: { id: id } });
            if (response) {
                try {
                    console.log('Deletando exercício da base');
                    await prismaTransaction.exercicio.delete({ where: { id: id } });
                    console.log('Exercício deletada da base');
                    return res.status(200).json({ msg: "Exercício deletado da base de dados" });
                }
                catch (error) {
                    console.log(error);
                    return res.status(400).json({ msg: error });
                }
            }
            else {
                console.log('Exercício não encontrada na base');
                return res.status(400).json({ msg: 'Não foi possivel localizar este cadastro' });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error });
    }
}
exports.default = deleteExercise;
