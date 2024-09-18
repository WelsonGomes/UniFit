"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPeople = createPeople;
exports.selectPeople = selectPeople;
exports.updatePeople = updatePeople;
exports.deletePeople = deletePeople;
const dotenv_1 = __importDefault(require("dotenv"));
const create_1 = __importDefault(require("../functions/people/create"));
const select_1 = __importDefault(require("../functions/people/select"));
const update_1 = __importDefault(require("../functions/people/update"));
const delete_1 = __importDefault(require("../functions/people/delete"));
dotenv_1.default.config();
async function createPeople(req, res) {
    try {
        const pessoaDTO = req.body;
        const create = await (0, create_1.default)(req.prisma, pessoaDTO, req, res);
        return create;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes' });
    }
    finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}
async function selectPeople(req, res) {
    try {
        let skip = parseInt(req.query.page, 10) || 1;
        let take = parseInt(req.query.pageSize, 10) || 1;
        let id = parseInt(req.query.id, 10);
        let type = parseInt(req.query.type, 10);
        if (type > 0) {
            const select = await (0, select_1.default)(req.prisma, req, res, skip, take, id, type);
            return select;
        }
        else {
            return res.status(400).json({ msg: 'É necessário passar na requisição o tipo de pessoa' });
        }
        ;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes' });
    }
    finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}
async function updatePeople(req, res) {
    try {
        const id = parseInt(req.query.id, 10);
        const pessoaDTO = req.body;
        const update = await (0, update_1.default)(req.prisma, pessoaDTO, req, res, id);
        return update;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes' });
    }
    finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}
async function deletePeople(req, res) {
    try {
        const id = parseInt(req.query.id, 10);
        const apagar = await (0, delete_1.default)(req.prisma, req, res, id);
        return apagar;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes' });
    }
    finally {
        console.log('Desconectando conexão do prisma');
        req.prisma.$disconnect();
        console.log('Prisma desconectado com sucesso');
    }
}
