import Card from "../../components/Card";
import { CommentListData } from "../../types/comment";

interface Props {
  comment: CommentListData;
}

function CommentListCard({ comment }: Props) {
  return (
    <Card>
      <p>{comment.content}</p>
      <p className="absolute right-2 bottom-2">by: {comment.user.username}</p>
    </Card>
  );
}

export default CommentListCard;
