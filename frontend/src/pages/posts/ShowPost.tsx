import { useEffect, useState } from "react";
import { postShow } from "../../services/postService";
import { useParams } from "react-router-dom";
import { PostData } from "../../types/post";
import CommentListCard from "./CommentListCard";

type PostParams = {
  id: string;
};

function ShowPost() {
  let { id } = useParams<PostParams>();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    postShow(+id!)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container min-h-full mx-auto">
      {post && (
        <>
          <h1 className="text-3xl mt-5">{post.title}</h1>
          <p>by {post.user.username} </p>
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
