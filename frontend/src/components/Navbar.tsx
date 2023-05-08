import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { logOut, setUser } from "../reducers/authSlice";
import { useEffect } from "react";
import { destroySession, restoreSession } from "../services/authService";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user == null) {
      restoreSession()
        .then((user) => dispatch(setUser(user)))
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    destroySession()
      .then(() => dispatch(logOut()))
      .catch((err) => console.log(err));
  };

  return (
    <header className="flex bg-slate-800 text-white justify-between">
      <div>
        <h1 className="p-3 text-xl">Gossip</h1>
      </div>
      <div className="flex space-x-4 p-3">
        {user ? (
          <>
            <p className="align-middle">{user.username}</p>
            <a className="hover:text-teal-300" onClick={handleLogout}>
              Log out
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-300">
              Login
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
