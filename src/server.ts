import express, {Request, Response} from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors"; // importando o cors
import { error } from "console";
import apiRoutes from "./routes/api" // importando nosso arquivo de rotas

dotenv.config(); //colocando o dotenv pra rodar

const server = express(); //criando a variável do servidor.

server.use(cors()); //usando o cors

server.use(express.static(path.join(__dirname, '../public'))); //configurando a pasta pública
server.use(express.urlencoded({extended: true}));

server.use( apiRoutes); //colocando as rotas para 'rodarem'

server.use((req: Request, res: Response)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'}) //agora é json e não mais 'send'
});

server.listen(process.env.PORT);