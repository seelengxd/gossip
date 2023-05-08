import { PostListData } from "../../types/post";

interface Props {
  post: PostListData;
}

function PostListCard({ post }: Props) {
  const { title, content, user } = post;
  return (
    <div className="shadow-md shadow-slate-400 border-md p-5 relative">
      <h2 className="text-xl">{title}</h2>
      <p>{content}</p>
      <p className="absolute right-2 bottom-2">by: {user.username}</p>
    </div>
  );
}

export default PostListCard;
