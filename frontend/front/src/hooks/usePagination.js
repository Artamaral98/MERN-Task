import { useState } from 'react';

const usePagination = (tasks, tasksPerPage = 12) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const displayedTasks = tasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return {
        currentPage,
        totalPages,
        displayedTasks,
        setCurrentPage,
  };
};

export default usePagination;
