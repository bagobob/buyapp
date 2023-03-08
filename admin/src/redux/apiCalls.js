import {loginFailure, loginStart, loginSuccess} from "./userRedux";
import {publicRequest, userRequest} from "../requestMethods";
import {
    deleteProductSuccess,
    productFailure,
    getProductSuccess,
    productStart, updateProductSuccess, addProductSuccess
} from "./productRedux";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
    }catch (error){
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(productStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data))
    }catch (error){
        dispatch(productFailure());
    }
}

export const deleteProducts = async (id,dispatch) => {
    dispatch(productStart());
    try {
       // const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id))
    }catch (error){
        dispatch(productFailure());
    }
}

export const updateProducts = async (id,product,dispatch) => {
    dispatch(productStart());
    try {
        // update
        dispatch(updateProductSuccess({id, product}))
    }catch (error){
        dispatch(productFailure());
    }
}
export const addProducts = async (product,dispatch) => {
    dispatch(productStart());
    try {
        const res = await userRequest.post("/products",  product );
        dispatch(addProductSuccess(res.data));
    }catch (error){
        dispatch(productFailure());
    }
}