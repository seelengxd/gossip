interface Props {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean;
}

function Button({ label, onClick, danger }: Props) {
  return (
    <button
      className={
        "bg-slate-600 text-white p-2 my-2 " +
        (danger ? "hover:bg-red-500" : "hover:bg-slate-400")
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
