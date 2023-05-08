import { useEffect, useState } from "react";
import { postIndex } from "../../services/postService";
import { Link } from "react-router-dom";
import { PostListData } from "../../types/post";
import PostListCard from "./PostListCard";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

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
        <Link to="/posts/new">
          <button className="bg-slate-600 text-white p-2 my-2 hover:bg-slate-400">
            Create Post
          </button>
        </Link>
      )}
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
