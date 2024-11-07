import CurrencyInput from 'react-currency-input-field';
import { firstLetterToUpperCase } from '../utils/firstLetterToUpperCase';

const EditModal = ({isEditModalOpen, editTaskName, setEditTaskName, setIsEditModalOpen, editTaskDeadline,
     setEditTaskDeadline, editTaskCost, setEditTaskCost, handleSaveEdit}) => {

        return (
            <div>
                {isEditModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Editar Tarefa</h2>
                   
                <input
                  type="text"
                  placeholder="Nome da Tarefa"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(firstLetterToUpperCase(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                     
                <input
                  type="date"
                  value={editTaskDeadline}
                  onChange={(e) => setEditTaskDeadline(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <CurrencyInput
                  placeholder="Digite o valor"
                  className="w-full input-class p-2 border border-gray-300 rounded mb-4"
                  decimalsLimit={2}
                  groupSeparator="."
                  prefix="R$ "
                  value={editTaskCost}
                  onValueChange={(value) => setEditTaskCost(value)}
           />
                   
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  > 
                    Cancelar
                  </button>
                     
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
            </div>
        )
     }

export default EditModal
