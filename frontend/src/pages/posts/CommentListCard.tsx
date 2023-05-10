import { Delete, Edit } from "@mui/icons-material";
import Card from "../../components/Card";
import { CommentListData } from "../../types/comment";
import Button from "../../components/Button";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface Props {
  comment: CommentListData;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (
    e: React.FormEvent<HTMLFormElement>
  ) => (content: string) => Promise<void>;
}

function CommentListCard({ comment, handleDelete, handleUpdate }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isCommentByUser = user && comment && user.id === comment.user.id;
  const [isEditing, setIsEditing] = useState(false);
  return isCommentByUser && isEditing ? (
    <CommentForm
      formTitle="Edit Comment"
      handleSubmit={(e) => (content: string) => {
        handleUpdate(e)(content).then(() => setIsEditing(false));
      }}
      handleCancel={() => setIsEditing(false)}
      initialComment={comment}
    />
  ) : (
    <Card>
      <p>{comment.content}</p>
      {isCommentByUser && (
        <div className="space-x-5">
          <Button label={<Edit />} onClick={() => setIsEditing(true)} />
          <Button label={<Delete />} onClick={handleDelete} danger={true} />
        </div>
      )}
      <p className="absolute right-2 bottom-2">by: {comment.user.username}</p>
    </Card>
  );
}

export default CommentListCard;
