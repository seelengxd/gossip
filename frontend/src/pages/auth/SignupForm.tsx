import { useState } from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setUser } from "../../reducers/authSlice";
import Snackbar from "../../components/Snackbar";
import { signUp } from "../../services/authService";
import Form from "../../components/Form";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  if (user != null) {
    navigate("/");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(username, password)
      .then((user) => {
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data);
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <Form error={error} onClose={() => setError} handleSubmit={handleSubmit}>
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
          Sign up
        </button>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-600 hover:text-cyan-500">
          Login here!
        </Link>
      </p>
    </Form>
  );
}

export default SignupForm;
