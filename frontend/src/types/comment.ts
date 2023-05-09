import { UserListData } from "./user";

export interface CommentListData {
  id: number;
  content: number;
  post_id: number;
  user: UserListData;
}
