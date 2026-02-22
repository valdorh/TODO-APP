export const TodoFilter = (props) => {
  const { watchedFilter, setWatchedFilter } = props;
  const filters = [
    { id: "all", label: "Все" },
    { id: "comleted", label: "Выполненные" },
    { id: "actived", label: "В процессе" },
  ];

  return (
    <div className=" flex flex-wrap items-center  gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-400 mr-2">Статус:</span>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setWatchedFilter(filter.id)}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer focus:ring-cyan-500 ${
              watchedFilter === filter.id
                ? "bg-cyan-600 text-white"
                : "bg-gray-300 hover:bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
