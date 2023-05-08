import { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container min-h-screen mx-auto">
      <div className="bg-slate-300 mx-auto my-5 rounded-xl shadow-sm p-3 space-y-2">
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
        <div>
          <button className="bg-cyan-500 px-3 border hover:bg-cyan-300">
            Login
          </button>
        </div>
        <p>
          No account yet?{" "}
          <Link to="/signup" className="text-cyan-600 hover:text-cyan-500">
            Sign up here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
