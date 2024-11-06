import CurrencyInput from 'react-currency-input-field';

const Addtask = ({newTaskName, setNewTaskName, newTaskDeadline, setNewTaskDeadline, newTaskCost, setNewTaskCost, handleAddTask}) => {
    
    return (
        <div className="fixed bottom-8 right-8 flex space-x-2 items-center">
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
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
        decimalSeparator=","
        groupSeparator="."
        prefix="R$ "
        value={newTaskCost}
        onValueChange={(value) => setNewTaskCost(value)}
      />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          + Adicionar Tarefa
        </button>
      </div>
    )
}

export default Addtask