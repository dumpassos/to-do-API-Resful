import { Request, Response } from "express";
import {Todo} from "../models/Todos"; // importando o model
import { Sequelize } from "sequelize"; //importando sequelize

export const all = async (req: Request, res: Response)=>{
        const tarefas = await Todo.findAll();
        res.json({tarefas})
};

export const add = async (req: Request, res: Response)=>{
       if(req.body.title){ //se tiver o titulo da tarefa

        let create = await Todo.create({
                title: req.body.title,
                done: req.body.done ? true : false //se tiver 'done' é true, se não é false
        });
                res.status(201).json({item: create});

       } else{ // se não tiver titulo da tarefa
        res.json({error: "Dados não foram enviados"})
       }
};

export const update = async (req: Request, res: Response)=>{

     let id: string = req.params.id;

     let todo = await Todo.findByPk(id); //PrimaryKey

     if(todo) {
        
        if(req.body.title) { //verificação independente
                todo.title = req.body.title; 
        }

        if(req.body.done){ //verificação independente
            switch(req.body.done.toLowerCase()){
                case 'true':
                case '1':
                     todo.done = true;
                     break
                case 'false':
                case '0':
                     todo.done = false;
                     break
                }
        }

        await todo.save();

        res.json({item: todo});

     } else {
        res.json({error: "Tarefa não encontrada"})
     }

     
};

export const remove = async (req: Request, res: Response)=>{

        let id: string = req.params.id;

        let todo = await Todo.findByPk(id);

        if(todo){
                await todo.destroy()
        } else{
                res.json({error: 'id não encontrado'})
        }

        res.json({remove: "tarefa removida!"})

};