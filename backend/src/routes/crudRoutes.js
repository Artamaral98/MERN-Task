import {Router} from 'express'
import crudControllers from '../Controllers/crudControllers.js'

const router = new Router()

router.post('/add/', crudControllers.addTask)
router.put('/update/:id', crudControllers.updateTask)
router.get('/get-all/', crudControllers.getAllTasks)
router.delete('/delete/:id', crudControllers.deleteTask)


export default router