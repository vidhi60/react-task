import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadUsers = createAsyncThunk("users/load", async () => {
  return JSON.parse(localStorage.getItem("users")) || [];
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updated = users.filter((u) => u.id !== id);
  localStorage.setItem("users", JSON.stringify(updated));
  return updated;
});

const userSlice = createSlice({
  name: "users",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default userSlice.reducer;
