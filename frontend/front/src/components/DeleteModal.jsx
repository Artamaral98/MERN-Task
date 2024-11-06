const DeleteModal = ({isDeleteModalOpen, setIsDeleteModalOpen, handleDelete}) => {

    return(
        <div>
          {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Confirmação de Exclusão</h2>
              <p>Tem certeza que deseja excluir esta tarefa?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Não
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Sim
                </button>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default DeleteModal