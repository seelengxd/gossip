import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";

interface Props {
  handleLogout: (e: React.MouseEvent<HTMLParagraphElement>) => void;
}

function Navbar({ handleLogout }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="flex bg-slate-800 text-white justify-between">
      <div>
        <Link to="/">
          {" "}
          <h1 className="p-3 text-xl">Gossip</h1>
        </Link>
      </div>
      <div className="flex space-x-4 p-3">
        {user ? (
          <>
            <p className="align-middle">{user.username}</p>
            <p
              className="hover:text-teal-300 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </p>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-300">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-teal-300">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
