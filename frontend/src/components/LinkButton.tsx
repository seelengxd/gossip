import { Link } from "react-router-dom";

interface Props {
  to: string;
  label: string | React.ReactElement;
}

function LinkButton({ to, label }: Props) {
  return (
    <Link to={to}>
      <button className="bg-slate-600 text-white p-2 my-2 hover:bg-slate-400">
        {label}
      </button>
    </Link>
  );
}

export default LinkButton;
