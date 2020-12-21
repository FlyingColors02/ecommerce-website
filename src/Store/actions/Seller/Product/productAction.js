import { LOADING, SELLER_PRODUCT_ERROR, FETCH_SELLER_ALL_PRODUCTS, ADD_PRODUCT, FETCH_MAIN_CATEGORY, UPDATE_PRODUCT, UPDATE_IMAGE, REMOVE_PRODUCT } from "./product.type"
import { SellerAllProducts, AddProduct, FetchMainCategory, UpdateProduct, RemoveProduct } from "../../../../API/Seller/Product/productApi";
import history from "../../../../Shared/History";

export const FetchSellerProductsAction = (pageNo)  => {
    return async (dispatch)=>{
        dispatch({type:LOADING });
        try{
            let response = await SellerAllProducts(pageNo);
            console.log(response);
            dispatch({type: FETCH_SELLER_ALL_PRODUCTS, payload: response.data});
        }
        catch(error){
            console.log(error);
            // localStorage.removeItem("seller");
            dispatch({type: SELLER_PRODUCT_ERROR, payload: error.response.data})
        }
    }
}

export const AddProductAction = (dataImage) => {
    return async (dispatch) => {
        dispatch({type:LOADING});
        try{
            let response = await AddProduct(dataImage);
            console.log(response);
            dispatch({ type: ADD_PRODUCT, payload: response.data});
            history.push("/seller/ProductContribution/pageNo=1");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({ type: SELLER_PRODUCT_ERROR, payload: error.response.data});
        }
    }
}

export const UpdateProductAction = (id,data) => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await UpdateProduct(id,data);
            console.log(response);
            dispatch({ type: UPDATE_PRODUCT, payload: response.data});
            history.push("/seller/ProductContribution/pageNo=1");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_PRODUCT_ERROR, payload: error.response.data});
        }
    }
}

export const RemoveProductAction = (id) => {
    return async (dispatch) => {
        dispatch({ type: LOADING});
        try{
            let response = await RemoveProduct(id);
            console.log(response);
            dispatch({ type: REMOVE_PRODUCT, payload : response.data});
            history.push("/seller/ProductContribution/pageNo=1");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({ type: SELLER_PRODUCT_ERROR, payload: error.response.data});
        }
    }
}