"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth = __importStar(require("./auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const interface_1 = require("./model/interface");
dotenv_1.default.config();
class Login {
    static async validacao(req, res) {
        try {
            console.log("Fazendo login");
            const { user, password } = req.body;
            const usuario = await req.prisma.usuario.findFirst({
                where: {
                    usuario: user,
                },
                include: {
                    pessoa: true
                }
            });
            if (usuario) {
                console.log("Autenticação para o usuário " + (usuario === null || usuario === void 0 ? void 0 : usuario.pessoa.nome) + " " + (usuario === null || usuario === void 0 ? void 0 : usuario.pessoa.sobrenome));
                if (await auth.compararSenha(password, usuario.password)) {
                    const result = (0, interface_1.converteUsuario)(usuario);
                    const token = auth.gerarToken(result);
                    const logado = {
                        id: usuario.id,
                        nome: result.nome,
                        tipo: result.permissao,
                        token: token
                    };
                    return res.status(200).json(logado);
                }
                else {
                    return res.status(401).json({ msg: "Usuário ou senha invalido." });
                }
            }
            else {
                return res.status(401).json({ msg: "Usuário ou senha invalido." });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Houve uma falha crítica no servidor, tente novamente em alguns instantes' });
        }
        finally {
            await req.prisma.$disconnect();
        }
    }
}
exports.default = Login;
;
