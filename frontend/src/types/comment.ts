import { UserListData } from "./user";

export interface CommentListData {
  id: number;
  content: string;
  post_id: number;
  user: UserListData;
}
