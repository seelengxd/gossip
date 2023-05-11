interface Props extends React.PropsWithChildren {
  colour?: string;
}

function Card({ colour, children }: Props) {
  let white = false;
  let luma = 0;

  // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
  if (colour) {
    let c = colour.substring(1); // strip #
    let rgb = parseInt(c, 16); // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff; // extract red
    let g = (rgb >> 8) & 0xff; // extract green
    let b = (rgb >> 0) & 0xff; // extract blue

    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 80) {
      // pick a different colour
      white = true;
    }
  }

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
