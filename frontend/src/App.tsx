import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import Home from "./pages/home/Home";
import CreatePostForm from "./pages/posts/CreatePostForm";
import ShowPost from "./pages/posts/ShowPost";
import UpdatePostForm from "./pages/posts/UpdatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { destroySession, restoreSession } from "./services/authService";
import { logOut, setUser } from "./reducers/authSlice";
import { useEffect } from "react";
import { RootState } from "./app/store";
import TagIndex from "./pages/tags/TagIndex";
import CreateTagForm from "./pages/tags/CreateTagForm";

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      restoreSession()
        .then((user) => dispatch(setUser(user)))
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, []);

  const handleLogout = () => {
    destroySession()
      .then(() => dispatch(logOut()))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<CreatePostForm />} />
          <Route path="/posts/:id" element={<ShowPost />} />
          <Route path="/posts/:id/edit" element={<UpdatePostForm />} />
          <Route path="/tags" element={<TagIndex />} />
          <Route path="/tags/new" element={<CreateTagForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
