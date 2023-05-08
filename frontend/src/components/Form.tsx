import { MouseEvent } from "react";
import Snackbar from "./Snackbar";

interface Props extends React.PropsWithChildren {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  onClose: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
}

function Form(props: Props) {
  const { handleSubmit, error, onClose } = props;
  return (
    <div className="container min-h-full mx-auto">
      <form
        className="bg-slate-300 mx-auto my-5 rounded-xl shadow-sm p-3 space-y-2"
        onSubmit={handleSubmit}
      >
        {props.children}
      </form>
      <Snackbar error={error} onClose={onClose} />
    </div>
  );
}

export default Form;
