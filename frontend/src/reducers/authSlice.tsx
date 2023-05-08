import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserListData } from "../types/user";

export interface authState {
  user: UserListData | null;
}

const initialState: authState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserListData>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
