import { createSlice } from "@reduxjs/toolkit";

import { storage } from "./localStorage";

const initialState = {
  userDetail: storage.getUser(),
  cartDetail: storage.getCart(),

};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userDetail = action.payload;
      storage.addUser(state.userDetail);
    },

    updateUsers: (state, action) => {
      state.userDetail.address = action.payload;
      storage.upUser(state.userDetail);
    },

    addToCart: (state, action) => {
      if (state.cartDetail.length == 0) {
        state.cartDetail.push(action.payload);
        storage.addToCart(state.cartDetail);
      }
      else {
        let index = state.cartDetail.findIndex((e) => e.productID === action.payload.productID
        );
        console.log(index);
        if (index >= 0) {
          // Logic !!!

          // let finalQuantity = Number(action.payload.quantity) + Number(state.cartDetail[index].quantity)
          // let finalPrice = Number(action.payload.totalPrice) + Number(state.cartDetail[index].totalPrice)
          // action.payload.quantity = finalQuantity;
          // action.payload.totalPrice = finalPrice;

          state.cartDetail[index] = action.payload;
          storage.addToCart(state.cartDetail);
        } else {
          state.cartDetail.push(action.payload);
          storage.addToCart(state.cartDetail);
        }
      }

    },

    updateCart: (state, action) => {
      let index = state.cartDetail.findIndex((e) => e.productID === action.payload.productID
      );
      if (index >= 0) {
        state.cartDetail[index] = action.payload;
        storage.addToCart(state.cartDetail);
      } else {
        state.cartDetail.push(action.payload);
        storage.addToCart(state.cartDetail);
      }

    },

    deleteCartItem: (state, action) => {
      console.log(action.payload);
      let index = state.cartDetail.findIndex((e) => e.productID === action.payload
      );
      if (index >= 0) {
        state.cartDetail.splice(index, 1);
        storage.addToCart(state.cartDetail);
      } else {
        console.log("Something went wrong");
      }

    },

    clearCart: (state, action) => {
      state.cartDetail = [];
      storage.clearCart();
    },
    removeCart: (state) => {
      state.userDetail = null;
      state.cartDetail = [];
      storage.clearALL();
    }
  }

});


export const { addUser, addToCart, clearCart, updateCart, removeCart, deleteCartItem, updateUsers } = userSlice.actions
export default userSlice.reducer