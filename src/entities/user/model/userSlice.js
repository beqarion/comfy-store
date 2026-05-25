import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === themes.winter || saved === themes.dracula) {
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const chosenTheme = prefersDark ? themes.dracula : themes.winter;
  document.documentElement.setAttribute("data-theme", chosenTheme);
  return chosenTheme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getInitialTheme(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      const nextTheme = state.theme === dracula ? winter : dracula;
      state.theme = nextTheme;
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
