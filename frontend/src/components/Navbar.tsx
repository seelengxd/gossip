import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import axios from "axios";
import { logOut, setUser } from "../reducers/authSlice";
import { useEffect } from "react";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (user == null) {
      axios
        .get(`${baseUrl}/session`, { withCredentials: true })
        .then((response) => dispatch(setUser(response.data)))
        .catch((err) => {});
    }
  }, []);

  const handleLogout = () => {
    axios
      .get(`${baseUrl}/logout`, { withCredentials: true })
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
