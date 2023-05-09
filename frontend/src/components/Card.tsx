function Card(props: React.PropsWithChildren) {
  return (
    <div className="shadow-md shadow-slate-400 border-md p-5 relative">
      {props.children}
    </div>
  );
}

export default Card;
