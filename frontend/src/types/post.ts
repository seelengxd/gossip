import { CommentListData } from "./comment";
import { UserListData } from "./user";

export interface PostListData {
  id: number;
  title: string;
  content: string;
  user: UserListData;
}

export interface PostData extends PostListData {
  comments: CommentListData[];
}
