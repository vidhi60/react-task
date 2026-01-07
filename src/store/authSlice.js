import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return thunkAPI.rejectWithValue("Invalid email or password");
    }

    localStorage.setItem("auth", "true");
    localStorage.setItem("loggedInEmail", user.email); // ✅ store email

    return user;
  }
);

/* ================= REGISTER ================= */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (form) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    return form;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: localStorage.getItem("auth") === "true",
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("loggedInEmail"); // ✅ clear on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // ✅ logged in user
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER (NO AUTO LOGIN)
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
