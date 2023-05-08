import { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setUser } from "../../reducers/authSlice";
import Snackbar from "../../components/Snackbar";
import { logIn } from "../../services/authService";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  if (user != null) {
    navigate("/");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(username, password)
      .then((user) => {
        dispatch(setUser(user));
        navigate("/");
      })
      .catch(() => {
        setError("Incorrect username or password!");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="container min-h-full mx-auto">
      <form
        className="bg-slate-300 mx-auto my-5 rounded-xl shadow-sm p-3 space-y-2"
        onSubmit={handleSubmit}
      >
        <Input
          label={"username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button className="bg-cyan-500 px-3 border hover:bg-cyan-300">
            Login
          </button>
        </div>
        <p className="text-center">
          No account yet?{" "}
          <Link to="/signup" className="text-cyan-600 hover:text-cyan-500">
            Sign up here!
          </Link>
        </p>
      </form>
      <Snackbar error={error} onClose={() => setError("")} />
    </div>
  );
}

export default LoginForm;