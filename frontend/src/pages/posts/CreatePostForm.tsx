import { postCreate } from "../../services/postService";
import PostForm from "./PostForm";
import { useNavigate } from "react-router-dom";

function CreatePostForm() {
  const navigate = useNavigate();
  const handleSubmit =
    (e: React.FormEvent<HTMLFormElement>) =>
    (title: string, content: string) => {
      e.preventDefault();
      postCreate(title, content)
        .then((response) => {
          // Todo: this should go to post show page once its up
          navigate("/");
        })
        .catch((err) => console.log(err));
    };
  return <PostForm formTitle="New Post" handleSubmit={handleSubmit} />;
}

export default CreatePostForm;
