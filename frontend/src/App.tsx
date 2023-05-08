import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import axios from "axios";
import { setUser } from "./reducers/authSlice";

function App() {
  return (
    <div className="App bg-slate-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
