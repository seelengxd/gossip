import { useEffect, useState } from "react";
import { postDestroy, postShow } from "../../services/postService";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../../types/post";
import CommentListCard from "./CommentListCard";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";
import Snackbar from "../../components/Snackbar";
import CommentForm from "./CommentForm";
import {
  commentCreate,
  commentDelete,
  commentUpdate,
} from "../../services/commentService";
import { Add, Delete, Edit } from "@mui/icons-material";

type PostParams = {
  id: string;
};

function ShowPost() {
  const { id: idParam } = useParams<PostParams>();
  const [post, setPost] = useState<PostData | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const isPostByUser = user && post && user.id === post.user.id;
  console.log(user, post, isPostByUser);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showCreateComment, setShowCreateComment] = useState(false);
  const reversedComments = post?.comments?.slice().reverse();

  const id = +idParam!;
  const loadPost = () =>
    postShow(id)
      .then((post) => setPost(post))
      .catch((err) => handleError(err));

  useEffect(() => {
    loadPost();
  }, []);

  const handleError = (err: Error) => {
    setError(err.message);
    setTimeout(() => setError(""), 3000);
  };

  const handlePostDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      postDestroy(+id!)
        .then(() => navigate("/"))
        .catch((err) => {
          handleError(err);
        });
    }
  };

  const handleCreateComment =
    (e: React.FormEvent<HTMLFormElement>) => (content: string) => {
      e.preventDefault();
      commentCreate(id, content)
        .then(() => {
          loadPost();
          setShowCreateComment(false);
        })
        .catch((err) => handleError(err));
    };

  const handleDeleteComment =
    (commentId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        commentDelete(id, commentId)
          .then(() => {
            loadPost();
          })
          .catch((err) => handleError(err));
      }
    };

  const handleUpdateComment =
    (commentId: number) =>
    (e: React.FormEvent<HTMLFormElement>) =>
    (content: string) => {
      e.preventDefault();
      return commentUpdate(id, commentId, content)
        .then(() => {
          loadPost();
        })
        .catch((err) => handleError(err));
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
                label={
                  <span>
                    <Edit className="mr-1" />
                    Edit Post
                  </span>
                }
              ></LinkButton>
              <Button
                label={
                  <span>
                    <Delete className="mr-1" />
                    Delete Post
                  </span>
                }
                onClick={handlePostDelete}
                danger={true}
              />
            </div>
          )}
          <br />
          <p>{post.content}</p>
          <hr className="h-px my-8 bg-gray-500 border-0" />
          <h2 className="text-xl mb-2">Comments</h2>
          {user &&
            (showCreateComment ? (
              <CommentForm
                formTitle="New Comment"
                handleSubmit={handleCreateComment}
                handleCancel={() => setShowCreateComment(false)}
              />
            ) : (
              <Button
                label={
                  <span>
                    <Add className="mr-1" />
                    New Comment
                  </span>
                }
                onClick={() => {
                  setShowCreateComment(true);
                }}
                danger={false}
              />
            ))}

          {reversedComments?.map((comment) => (
            <CommentListCard
              key={comment.id}
              comment={comment}
              handleDelete={handleDeleteComment(comment.id)}
              handleUpdate={handleUpdateComment(comment.id)}
            />
          ))}
        </>
      )}
      <div>
        <Snackbar error={error} onClose={() => setError("")} />
      </div>
    </div>
  );
}

export default ShowPost;
