import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      console.log(product);

      const foundItem = state.cartItems.find(
        (item) => item.cartID === product.cartID,
      );

      if (foundItem) {
        foundItem.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.recalculateTotals(state);
      toast.success("Item added to cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const found = state.cartItems.find((item) => item.cartID === cartID);
      if (!found) {
        return;
      }

      const diff = amount - found.amount;
      found.amount = amount;
      state.numItemsInCart += diff;
      state.cartTotal += found.price * diff;
      cartSlice.caseReducers.recalculateTotals(state);
      toast.success("Cart updated");
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const found = state.cartItems.find((item) => item.cartID === cartID);

      if (!found) {
        return;
      }

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.cartID !== cartID,
      );
      state.numItemsInCart -= found.amount;
      state.cartTotal -= found.price * found.amount;

      cartSlice.caseReducers.recalculateTotals(state);

      toast.error("Item removed from cart");
    },

    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    recalculateTotals: (state) => {
      const TAX_PERCENTAGE = 0.1;
      state.tax = TAX_PERCENTAGE * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
