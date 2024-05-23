import { Router } from "express";
import * as TodosController from "../controllers/todoController"; //importando funções

const router = Router();

router.get('/todos', TodosController.all); //pegando as tarefas
router.post('/todos', TodosController.add); //adicionando uma tarefa
router.put('/todos/:id', TodosController.update); //atualizando uma tarefa
router.delete('/todos/:id', TodosController.remove); //removendo uma tarefa


export default router;