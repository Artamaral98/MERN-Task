import useTaskActions from './hooks/useTaskActions'
import useFetchTasks from './hooks/useFetchTasks'
import usePagination from './hooks/usePagination'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Pagination from './components/Pagination'
import Reorder from './components/Reorder'
import EditModal from './components/EditModal'
import Addtask from './components/AddTask'
import DeleteModal from './components/DeleteModal'
import Header from './components/Header'


const App = () => {

  const { tasks, setTasks } = useFetchTasks() //Tasks que vem da api através do useEffect

  const { 
    isEditModalOpen, setIsEditModalOpen, 
    isDeleteModalOpen, setIsDeleteModalOpen, 
    newTask, setNewTask, 
    editTask, setEditTask, 
    handleAddTask, handleEdit, handleSaveEdit, 
    openDeleteModal, handleDelete 
  } = useTaskActions(tasks, setTasks) //Utiliza tasks e setTasks para utilizar as operações de Crud.

  const { currentPage, totalPages, displayedTasks, setCurrentPage } = usePagination(tasks);



  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Tarefas</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <Header />
            </thead>
            <tbody>
              {displayedTasks.map((task, index) => (
                <Reorder
                  key={task._id}
                  task={task}
                  index={(currentPage - 1) * 12 + index}
                  tasks={tasks}
                  setTasks={setTasks}
                  handleEdit={handleEdit}
                  openDeleteModal={openDeleteModal}
                  handleReorderTasks={handleReorderTasks}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <Addtask 
          newTaskName={newTask.name}
          setNewTaskName={(name) => setNewTask({ ...newTask, name })}
          newTaskDeadline={newTask.deadline}
          setNewTaskDeadline={(deadline) => setNewTask({ ...newTask, deadline })}
          newTaskCost={newTask.cost}
          setNewTaskCost={(cost) => setNewTask({ ...newTask, cost })}
          handleAddTask={handleAddTask} 
        />

        <EditModal
          isEditModalOpen={isEditModalOpen} 
          editTaskName={editTask.name}
          setEditTaskName={(name) => setEditTask({ ...editTask, name })}
          setIsEditModalOpen={setIsEditModalOpen}
          editTaskDeadline={editTask.deadline}
          setEditTaskDeadline={(deadline) => setEditTask({ ...editTask, deadline })}
          editTaskCost={editTask.cost}
          setEditTaskCost={(cost) => setEditTask({ ...editTask, cost })}
          handleSaveEdit={handleSaveEdit}
         />

        <DeleteModal 
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
        />

    </div>
    </DndProvider>
  )
}

export default App
