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
          const id = response.ID;
          navigate(`/posts/${id}`);
        })
        .catch((err) => console.log(err));
    };
  return <PostForm formTitle="New Post" handleSubmit={handleSubmit} />;
}

export default CreatePostForm;
