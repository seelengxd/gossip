import { useEffect, useState } from "react";
import { postDestroy, postShow } from "../../services/postService";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../../types/post";
import CommentListCard from "./CommentListCard";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";

type PostParams = {
  id: string;
};

function ShowPost() {
  const { id } = useParams<PostParams>();
  const [post, setPost] = useState<PostData | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const isPostByUser = user!.id == post?.user.id;
  const navigate = useNavigate();

  useEffect(() => {
    postShow(+id!)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      postDestroy(+id!)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container min-h-full mx-auto">
      {post && (
        <>
          <h1 className="text-3xl mt-5">{post.title}</h1>
          <p>by {post.user.username} </p>
          {isPostByUser && (
            <div className="space-x-5">
              <LinkButton
                to={`/posts/${post.id}/edit`}
                label="Update Post"
              ></LinkButton>
              <Button
                label="Delete Post"
                onClick={handleDelete}
                danger={true}
              />
            </div>
          )}
          <br />
          <p>{post.content}</p>
          <hr className="h-px my-8 bg-gray-500 border-0" />
          <h2 className="text-xl mb-2">Comments</h2>
          {post.comments.map((comment) => (
            <CommentListCard comment={comment} />
          ))}
        </>
      )}
    </div>
  );
}

export default ShowPost;
