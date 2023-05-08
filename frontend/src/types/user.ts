export interface UserListData {
  id: string | null;
  username: string;
}

export interface UserData extends UserListData {
  password: string;
}
