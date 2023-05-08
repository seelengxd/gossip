import { UserListData } from "./user";

export interface PostListData {
  id: number;
  title: string;
  content: string;
  user: UserListData;
}
