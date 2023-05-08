interface SnackbarProps {
  error: string;
  onClose: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
}

function Snackbar({ error, onClose }: SnackbarProps) {
  return (
    (error && (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute left-2 bottom-2"
        role="alert"
      >
        <div className="flex fadeInLeft">
          <span className="block sm:inline">{error}</span>
          <span className="px-1">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={onClose}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    )) || <></>
  );
}

export default Snackbar;
