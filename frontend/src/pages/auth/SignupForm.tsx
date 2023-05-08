import { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

function SignupForm() {
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
            Sign up
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-600 hover:text-cyan-500">
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
