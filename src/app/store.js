import { cartReducer } from "@/entities/cart";
import { userReducer } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
