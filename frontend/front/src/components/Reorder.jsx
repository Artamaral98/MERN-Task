import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { formatDate } from '../utils/formatDate';
import CurrencyInput from 'react-currency-input-field';


const Reorder = ({tasks, setTasks, task, index, handleEdit, openDeleteModal }) => {

  const moveTask = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };


  return (
    <tr
      style={{ backgroundColor: parseInt(task.cost >= 1000) ? '#d4c818' : 'white' }}
      className="border-b"
    >
      <td className="py-3 px-4">{task.name}</td>
      <td className="py-3 px-4">{formatDate(task.deadline.split("T")[0])}</td>
      <td className="py-3 px-4">
         <CurrencyInput
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            value={task.cost}
            className="border-none appearance-none bg-transparent focus:outline-none"
          />
      </td>
      <td className="py-3 px-4 flex space-x-2">
        <button
          onClick={() => handleEdit(task._id)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-4"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => openDeleteModal(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-4"
        >
          <MdDelete />
        </button>
        <button
          onClick={() => moveTask(index, index - 1)}
          disabled={index === 0}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2 ml-4"
        >
          <FaArrowUp />
        </button>
        <button
          onClick={() => moveTask(index, index + 1)}
          disabled={index === task.length - 1}
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded"
        >
          <FaArrowDown />
        </button>
      </td>
    </tr>
  );
};

export default Reorder;
