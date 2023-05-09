import { Link } from "react-router-dom";
import { PostListData } from "../../types/post";
import Card from "../../components/Card";

interface Props {
  post: PostListData;
}

function PostListCard({ post }: Props) {
  const { title, content, user } = post;
  return (
    <Card>
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl hover:text-cyan-400 hover:underline">{title}</h2>
      </Link>
      <p className="mb-1">{content}</p>
      <p className="absolute right-2 bottom-2">by: {user.username}</p>
    </Card>
  );
}

export default PostListCard;
