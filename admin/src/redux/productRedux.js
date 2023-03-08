import { createSlice } from "@reduxjs/toolkit";

const productSLice = createSlice({
    name: "product",
    initialState:{
        products: [],
        isFetching: false,
        error: false
    },
    reducers:{
        productStart:(state)=>{
            state.isFetching = true;
            state.error = false;
        },

        //GET
        getProductSuccess:(state, action)=>{
            state.isFetching = false;
            state.products = action.payload;
        },

        //DELETE
        deleteProductSuccess:(state, action)=>{
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
            );
        },


        //UPDATE
        updateProductSuccess:(state, action)=>{
            state.isFetching = false;
            state.products[
                state.products.findIndex((item) => item._id === action.payload.id)
                ] = action.payload.product;
        },

        //ADD
        addProductSuccess:(state, action)=>{
            state.isFetching = false;
            state.products.push(action.payload);
        },

        productFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        },

    },
});

export const { productStart,  getProductSuccess, deleteProductSuccess, updateProductSuccess, addProductSuccess, productFailure } = productSLice.actions;
export default productSLice.reducer;