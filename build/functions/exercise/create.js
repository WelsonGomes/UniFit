"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function CreateExercise(prisma, exercicioDTO, req, res) {
    try {
        await prisma.$transaction(async (prismaTransaction) => {
            return prismaTransaction.exercicio.create({ data: exercicioDTO });
        });
        return res.status(201).json({ msg: "Novo exercício cadastrado com sucesso." });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: `Houve um erro ao realizar o cadastro do exercício. ${error}` });
    }
}
exports.default = CreateExercise;
