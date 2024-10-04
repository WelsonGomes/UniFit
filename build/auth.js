"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaToken = exports.compararSenha = exports.gerarToken = void 0;
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
const validaToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            let dec;
            try {
                dec = jsonwebtoken_1.default.verify(token, secretkey);
                if (typeof dec === 'string') {
                    return res.status(401).json({ msg: "Informa um token valido." });
                }
                ;
                req.usuario = dec.usuario;
                next();
            }
            catch (error) {
                return res.status(401).json({ msg: "Este token é invalido ou expirado." });
            }
        }
        else {
            return res.status(401).json({ msg: "Token é obrigatório." });
        }
    }
    catch (error) {
        return res.status(401).json({ msg: "Token é obrigatório ou é invalido." });
    }
};
exports.validaToken = validaToken;
