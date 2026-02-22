export const OkCancel = (props) => {
  const { onOkClick, onCancelClick } = props;
  return (
    <div className="flex  gap-2 ">
      <button
        onClick={onOkClick}
        className="text-green-400 hover:text-green-200 transition-colors cursor-pointer"
        aria-label="Save date"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="w-6 h-6"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>
      <button
        onClick={onCancelClick}
        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        aria-label="Cancel edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className=""
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};
