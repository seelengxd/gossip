import { Link } from "react-router-dom";
import { PostListData } from "../../types/post";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

interface Props {
  post: PostListData;
}

function PostListCard({ post }: Props) {
  const { title, content, user, tags } = post;
  return (
    <Card>
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl hover:text-cyan-400 hover:underline">{title}</h2>
      </Link>

      {tags.map((tag) => (
        <Badge key={tag.id} colour={tag.colour} text={tag.name} />
      ))}

      <p className="mb-1">{content}</p>
      <p className="absolute right-2 bottom-2">by: {user.username}</p>
    </Card>
  );
}

export default PostListCard;
