import { useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { firstLetterToUpperCase } from '../utils/firstLetterToUpperCase';

const useTaskActions = (tasks, setTasks) => {
    const [newTask, setNewTask] = useState({ name: '', deadline: '', cost: '' });
    const [editTask, setEditTask] = useState({ id: null, name: '', deadline: '', cost: '' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    
    //Adiciona novas tarefas
    const handleAddTask = async () => {
      try { 
          
          const capitalizeFirstLetter = firstLetterToUpperCase(newTask.name)
          
          const response = await api.post('add', {
            name: capitalizeFirstLetter,
            deadline: newTask.deadline,
            cost: newTask.cost,
          });
  
          setTasks([...tasks, response.data.newTask]) // Atualiza o estado com a nova tarefa
          setNewTask({ name: '', deadline: '', cost: '' })// Limpa os campos do estado
          toast.success(response.data.message)
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    //Verifica qual tarefa está sendo selecionada, coloca suas informações no state e abre o respectivo modal
    const handleEdit = taskId => {
        const taskToEdit = tasks.find(task => task._id === taskId)

        if (taskToEdit) {
            setEditTask({
                id: taskToEdit._id,
                name: taskToEdit.name,
                deadline: taskToEdit.deadline.split("T")[0],
                cost: taskToEdit.cost
            })
            setIsEditModalOpen(true)
        } 
    }

    //Salva as edições enviadas no modal
    const handleSaveEdit = () => {

        api.put(`update/${editTask.id}`, {
          name: editTask.name,
          deadline: editTask.deadline,
          cost: editTask.cost,
        })
        .then((response) => {
          setTasks(tasks.map((task) =>
            task._id === editTask.id ? response.data.task : task
          ));
          setIsEditModalOpen(false);
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error('Erro ao editar tarefa:', error);
          toast.error(error.response.data.message);
        });
      };


    const openDeleteModal = taskId => {
        setTaskToDelete(taskId)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        api.delete(`delete/${taskToDelete}`)
        .then(() => {
            setTasks(tasks.filter((task) => task._id !== taskToDelete))
            setIsDeleteModalOpen(false);
            setTaskToDelete(null);
            toast.success("Tarefa Deletada");
        })
        .catch((error) => {
            console.error('Erro ao excluir tarefa:', error);
            toast.error(error.response.data.message);
          });
    }

    const updateTaskOrder = async (tasksToUpdate) => {
        try {
          await api.post('/update-order', {
            tasks: tasksToUpdate  //tasks é o req.body
          });
        } catch (error) {
          console.log(error)
        }
    }

    const handleReorderTasks = async (reorderedTasks) => {
      //insere as tasks reordenadas na lista de tasks
      setTasks(reorderedTasks)
      //envia a nova lista ao backend para que seja realizada a atualização da ordem
      const tasksToUpdate = reorderedTasks.map((task, index) => ({
        _id: task._id,
        order: index + 1 
      }))

      await updateTaskOrder(tasksToUpdate)
    }

    return {
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        newTask,
        setNewTask,
        editTask,
        setEditTask,
        handleAddTask,
        handleEdit,
        handleSaveEdit,
        openDeleteModal,
        handleDelete,
        handleReorderTasks
      }
}

export default useTaskActions
