import { useState, useEffect } from 'react';
import api from '../api/api';

const useFetchTasks = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        api.get('get-all')
        .then((response) => {
            setTasks(response.data.tasks)
        })
        .catch((error) => {
            console.error('Erro ao buscar tarefas:', error)
        })
    }, [])

    return {tasks, setTasks}
}

export default useFetchTasks