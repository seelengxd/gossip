import { isDarkColour } from "../util/colour";

interface Props extends React.PropsWithChildren {
  colour?: string;
}

function Card({ colour, children }: Props) {
  let white = colour && isDarkColour(colour);

  return (
    <div
      className={
        "shadow-md shadow-slate-400 border-md p-5 m-2 relative" +
        (white ? " text-white" : "")
      }
      style={{ backgroundColor: colour }}
    >
      {children}
    </div>
  );
}

export default Card;
