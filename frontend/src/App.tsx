import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import Home from "./pages/home/Home";
import CreatePostForm from "./pages/posts/CreatePostForm";

function App() {
  return (
    <div className="App bg-slate-100 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<CreatePostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
