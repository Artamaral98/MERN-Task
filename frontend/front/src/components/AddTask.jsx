import CurrencyInput from 'react-currency-input-field';
import { firstLetterToUpperCase } from '../utils/firstLetterToUpperCase';
import { useRef, useEffect } from 'react';

const Addtask = ({newTaskName, setNewTaskName, newTaskDeadline, setNewTaskDeadline, newTaskCost, setNewTaskCost, handleAddTask}) => {

    const nameInputRef = useRef(null)

    useEffect(() => {
        if (nameInputRef) {
            nameInputRef.current.focus()
        }
    }, [])

    const handleAddNameInputFocus = () => {
        handleAddTask()
        if (nameInputRef) {
            nameInputRef.current.focus()
        }
    }
    
    return (
        <div className="fixed bottom-8 right-8 flex space-x-2 items-center">
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={newTaskName}
          ref={nameInputRef}  
          onChange={(e) => setNewTaskName(firstLetterToUpperCase(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={newTaskDeadline}
          onChange={(e) => setNewTaskDeadline(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <CurrencyInput
        placeholder="Digite o valor"
        className="input-class p-2 border border-gray-300 rounded"
        decimalsLimit={2}
        groupSeparator="."
        allowNegativeValue={false}
        prefix="R$ "
        value={newTaskCost}
        onValueChange={(value) => setNewTaskCost(value)}
        maxLength={12}
      />
        <button
          onClick={handleAddNameInputFocus}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          + Adicionar Tarefa
        </button>
      </div>
    )
}

export default Addtask
