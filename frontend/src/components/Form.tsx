import { MouseEvent } from "react";
import Snackbar from "./Snackbar";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  onClose: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
}

function Form(props: React.PropsWithChildren<Props>) {
  const { handleSubmit, error, onClose } = props;
  return (
    <div className="container min-h-full mx-auto">
      <form
        // className="bg-slate-300 mx-auto my-5 rounded-xl shadow-sm p-3 space-y-2"
        className="shadow-lg shadow-slate-400 border-md p-5 relative space-y-2 my-10 border"
        onSubmit={handleSubmit}
      >
        {props.children}
      </form>
      <Snackbar error={error} onClose={onClose} />
    </div>
  );
}

export default Form;
