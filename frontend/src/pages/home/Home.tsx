import { useEffect, useState } from "react";
import { postIndex } from "../../services/postService";
import { PostListData } from "../../types/post";
import PostListCard from "./PostListCard";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LinkButton from "../../components/LinkButton";
import { Add } from "@mui/icons-material";

function Home() {
  const [posts, setPosts] = useState<PostListData[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    postIndex()
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container min-h-full mx-auto space-y-4">
      <h1 className="text-3xl mt-5">Posts</h1>
      {user && (
        <LinkButton
          to="/posts/new"
          label={
            <span>
              <Add className="mr-1" />
              New Post
            </span>
          }
        />
      )}
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
