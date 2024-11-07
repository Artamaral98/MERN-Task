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




}



export default new CrudControllers()
