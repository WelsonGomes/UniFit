"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const route = require('./router');
const login_1 = __importDefault(require("./login"));
const auth_1 = require("./auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVICE_PORT;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(middleware_1.middleware);
app.get('/', (req, res) => {
    return res.status(200).json({ msg: `App Running on port ${port}` });
});
app.post('/login', login_1.default.validacao);
app.use(auth_1.validaToken);
console.log('Token Valido, seguindo para rotas');
app.use(route);
app.use(async (req, res, next) => {
    console.log('Finalizando a conexão do prisma');
    res.on('finish', async () => {
        await req.prisma.$disconnect();
        console.log('Conexão finalizada');
    });
    next();
});
app.listen(port, () => {
    console.log(`App Running on port ${port}`);
});
