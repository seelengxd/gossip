import { useEffect, useState } from "react";
import { postCreate, postShow } from "../../services/postService";
import PostForm from "./PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { PostData } from "../../types/post";

type PostParams = {
  id: string;
};

function UpdatePostForm() {
  const { id } = useParams<PostParams>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const isPostByUser = user?.id == post?.user.id;

  useEffect(() => {
    postShow(+id!)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, []);

  if (!isPostByUser) {
    navigate("/");
  }

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

  return (
    <PostForm
      formTitle="Update Post"
      handleSubmit={handleSubmit}
      initialPost={post!}
    />
  );
}

export default UpdatePostForm;
