import { PRE_LOADING, ADD_TO_CART_DETAILS, REMOVE_CART_DATA, FETCH_CART_DATA, ADD_QUANTITY, REMOVE_QUANTITY, CART_ERROR, UPDATE_CART_DATA } from "./cart.type";
import { AddToCartData, RemoveCartData, FetchCartData, UpdateCartData } from "../../../../API/User/Cart/cartApi";
import history from "../../../../Shared/History";

export const AddToCartAction = (data, id) => {
    return async (dispatch) => {
        dispatch({ type: PRE_LOADING});
        try{
            let response = await AddToCartData(data, id);
            console.log(response);
            dispatch({ type: ADD_TO_CART_DETAILS, payload: response.data});
            history.push("/cart");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({ type: CART_ERROR,  payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}

export const RemoveCartDataAction = (id) => {
    return async(dispatch) => {
        dispatch({type:PRE_LOADING});
        try{
            let response = await RemoveCartData(id);
            console.log(response);
            dispatch({type: REMOVE_CART_DATA, payload:response.data});
           
        }
        catch(error){
            console.log(error);
            dispatch({ type: CART_ERROR, payload:error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}
export const UpdateCartDataAction = (item,id) => {
    console.log(item);
    return async(dispatch) => {
        dispatch({type:PRE_LOADING});
        try{
            let response = await UpdateCartData(item,id);
            console.log(response);
            dispatch({type: UPDATE_CART_DATA, payload:response.data});
            window.location.reload();
    
        }
        catch(error){
            console.log(error);
            dispatch({ type: CART_ERROR, payload:error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}
export const FetchCartDataAction = () => {
    return async(dispatch) => {
        
        dispatch({type:PRE_LOADING});
        try{
            let response = await FetchCartData();
            console.log(response);
            dispatch({type: FETCH_CART_DATA, payload:response.data});
            
        }
        catch(error){
            console.log(error);
          
            //   localStorage.removeItem("user");
              dispatch({ type: CART_ERROR, payload: error.response.data});
              
        
                
            
        }
    }
}

export const AddQuantityAction = (item) => {
    return async(dispatch) => {
        dispatch({type:PRE_LOADING});
        try{
           
            dispatch({type: ADD_QUANTITY, payload: item});
        }
        catch(error){
            console.log(error);
            dispatch({ type: CART_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}

export const RemoveQuantityAction = (item) => {
    return async(dispatch) => {
        dispatch({type:PRE_LOADING});
        try{
           
            dispatch({type: REMOVE_QUANTITY, payload: item});
            
        }
        catch(error){
            console.log(error);
            dispatch({ type: CART_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}