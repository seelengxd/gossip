import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex bg-slate-800 text-white justify-between">
      <div>
        <h1 className="p-3 text-xl">Gossip</h1>
      </div>
      <div className="flex space-x-4 p-3">
        <Link to="/login" className="hover:text-teal-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-teal-300">
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
