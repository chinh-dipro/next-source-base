import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "stores";

const REDUCER_NAME = "users";

export type User = {
  id: string;
  name: string;
};

export type UserState = {
  users: User[];
  loading: boolean;
  error?: Error;
};

const initialState: UserState = { users: [], loading: false, error: null };

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: Error }>(
  `${REDUCER_NAME}/fetchUsers}`,
  async (data, { rejectWithValue }) => {
    try {
      // TODO: call async request here
      const users: User[] = await new Promise((resolve) => {
        const user: User = {
          id: "1",
          name: "Peter"
        };
        setTimeout(() => resolve([user]), 200);
      });
      return users;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const hydrateAction = createAction<User[] | undefined>(HYDRATE);

export const usersReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default usersReducer.reducer;

export const selectUsers = () => (state: AppState) => state.users;

