import { CommentListData } from "./comment";
import { TagListData } from "./tag";
import { UserListData } from "./user";

export interface PostListData {
  id: number;
  title: string;
  content: string;
  user: UserListData;
  tags: TagListData[];
}

export interface PostData extends PostListData {
  comments: CommentListData[];
}
