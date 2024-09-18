"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compararSenha = exports.gerarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const secretkey = '?xQn1pCMCv';
const gerarToken = (usuario) => {
    const token = jsonwebtoken_1.default.sign({ usuario }, secretkey, { expiresIn: '2h' });
    return token;
};
exports.gerarToken = gerarToken;
const compararSenha = async (senha, hash) => {
    return await bcrypt_1.default.compare(senha, hash);
};
exports.compararSenha = compararSenha;
