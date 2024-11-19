import { Task } from "../models/taskModel.js"
import { responseReturn } from "../utils/response.js"

class CrudControllers {

    getAllTasks = async (req, res) => {
        try {
           const allTasks = await Task.find()
           return responseReturn(res, 200, {tasks: allTasks })

        } catch (error) {
            responseReturn(res, 500, {message: error.message}) 
        }
    }


    addTask = async (req, res) => {
        try{
            const {name, cost, deadline} = req.body

            if (!name || !cost || !deadline) {
                return responseReturn(res, 500, {message: "Preencha todos os campos"})
            }

            const isRegistred = await Task.findOne({name})

            if (isRegistred) {
                return responseReturn(res, 500, {message: "Já existe uma tarefa com este nome"})
            }

            const newTask = await Task.create({
                name,
                cost,
                deadline
            })

            return responseReturn(res, 200, {message: "Tarefa adicionada com sucesso", newTask })


        } catch (error) {
            responseReturn(res, 500, {message: error.message})
        }

    }

    updateTask = async (req, res) => {

        try {
            const {id} = req.params
            const {name, cost, deadline} = req.body

            if (!name || !cost || !deadline) {
                return responseReturn(res, 500, {message: "Preencha todos os campos"})
            }

            const updatedData = {name, cost, deadline}

            let task = await Task.findById(id)

            if (!task){
                return responseReturn(res, 404, {message: "Tarefa não encontrada"})
            }

            const nameCheck = task.name === updatedData.name
            const costCheck = task.cost === updatedData.cost
            const deadlineCheck = task.deadline === updatedData.deadline

            if (nameCheck) {
                await Task.findByIdAndUpdate(id, updatedData.name)
            }

            if (!nameCheck) {
                const isRegistred = await Task.findOne({name})
                if (isRegistred) {
                    return responseReturn(res, 500, {message: "Já existe uma tarefa com este nome"})
                }
            }

            if (!deadlineCheck  || !costCheck) {
                await Task.findByIdAndUpdate(id, updatedData)
            }

            task = await Task.findById(id)

            return responseReturn(res, 200, {message: "Tarefa editada com sucesso", task })


        } catch (error) {
            responseReturn(res, 500, {message: error.message})
        }
    }

    deleteTask = async (req, res) => {
        try {
            const {id} = req.params
            const task = await Task.findById(id)
            console.log(task)
    
            if (!task) {
                return responseReturn(res, 404, {message: "Tarefa não encontrada"})
            }
    
            await Task.findByIdAndDelete(id)
            return responseReturn(res, 200, {message: "Tarefa editada com sucesso", task })
    
    
        } catch (error) {
            responseReturn(res, 500, {message: error.message})
        }
    }
    
    teste = (req, res) => {
        res.json('ok')
    }

    updateTaskOrder = async (req, res) => {
        try {
            const { tasks } = req.body;
    
            if (!tasks || !Array.isArray(tasks)) {
                return responseReturn(res, 400, { message: "Lista de tarefas não encontrada" });
            }
    
            //verificar se há valores duplicados para order
            const orderSet = new Set(tasks.map(task => task.order));
            if (orderSet.size !== tasks.length) {
                return responseReturn(res, 400, { message: "Valores duplicados encontrados no campo 'order'" });
            }
    
            // valor temporário que será atribuído inicialmente para order
            const TEMPORARY_ORDER_BASE = 10000000;
    
            const session = await Task.startSession();
            session.startTransaction();
    
            try {
                //atualizar todos os orders para um valor temporário, resolvendo o problema de duplicação de orders no processo de atualização
                for (const task of tasks) {
                    const temporaryOrder = TEMPORARY_ORDER_BASE + task._id; 
                    await Task.findByIdAndUpdate(task._id, { order: temporaryOrder }, { session });
                }
    
                //atualizar para o order correto
                for (const task of tasks) {
                    await Task.findByIdAndUpdate(task._id, { order: task.order }, { session });
                }
    
                // commit da transação
                await session.commitTransaction();
                session.endSession();
    
                return responseReturn(res, 200, {
                    message: "Ordem das tarefas atualizada com sucesso",
                    tasks
                });
    
            } catch (innerError) {
                // rollback caso ocorra erro
                await session.abortTransaction();
                session.endSession();
                console.error('Erro durante a atualização das tarefas:', innerError.message);
                return responseReturn(res, 500, { message: "Erro ao atualizar a ordem das tarefas" }, innerError.message);
            }
    
        } catch (error) {
            console.error('Erro externo:', error.message);
            return responseReturn(res, 500, { message: "Erro ao atualizar a ordem das tarefas" }, error.message);
        }
    };




}



export default new CrudControllers()
