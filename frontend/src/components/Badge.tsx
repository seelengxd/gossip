import { Delete } from "@mui/icons-material";
import { isDarkColour } from "../util/colour";

interface Props {
  colour: string;
  text: string;
  handleDelete?: (e: React.MouseEvent) => void;
}

function Badge({ colour, text, handleDelete }: Props) {
  const style = {
    color: colour,
    borderColor: colour,
  };
  return (
    <span
      className={
        "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full border" +
        (isDarkColour(colour) ? "" : " bg-slate-800")
      }
      style={style}
    >
      {text}
      {handleDelete && (
        <Delete onClick={handleDelete} className="cursor-pointer" />
      )}
    </span>
  );
}

export default Badge;
