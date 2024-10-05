"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUser = selectUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const dotenv_1 = __importDefault(require("dotenv"));
const select_1 = __importDefault(require("../functions/user/select"));
const update_1 = __importDefault(require("../functions/user/update"));
const delete_1 = __importDefault(require("../functions/user/delete"));
dotenv_1.default.config();
async function selectUser(req, res) {
    try {
        let skip = parseInt(req.query.page, 10) || 1;
        let take = parseInt(req.query.pageSize, 10) || 1;
        let id = parseInt(req.query.id, 10);
        const select = await (0, select_1.default)(req.prisma, req, res, skip, take, id);
        return select;
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
async function updateUser(req, res) {
    try {
        const id = parseInt(req.query.id, 10);
        const usuarioDTO = req.body;
        const update = await (0, update_1.default)(req.prisma, usuarioDTO, req, res, id);
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
async function deleteUser(req, res) {
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
