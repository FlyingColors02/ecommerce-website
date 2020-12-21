import Axios from "axios"
import {config} from "../Authentication/authenticationApi";
import {authUser} from "../../../Helpers/currentUser";



export const AddToCartData = async( item, id) => {
    let ADD_TO_CART_ENDPOINT = `http://localhost:4500/api/cart/add-to-cart/${id}`;
    let response = await Axios.post( ADD_TO_CART_ENDPOINT, JSON.stringify(item),config);
    return response;
}

export const RemoveCartData = async(id) => {
    let REMOVE_CART_DATA_ENDPOINT = `http://localhost:4500/api/cart/remove-from-cart/${id}`;
    let response = await Axios.delete( REMOVE_CART_DATA_ENDPOINT,{headers: authUser(), "Content-Type": "application/json"});
    return response;
}

export const FetchCartData = async() =>{

    let FETCH_CART_DATA_ENDPOINT = `http://localhost:4500/api/cart/allcartproduct`;
    let response = await Axios.get( FETCH_CART_DATA_ENDPOINT,{headers: authUser(), "Content-Type": "application/json"});
    return response;
    
}

export const UpdateCartData = async(item,id) => {
    
    let UPDATE_CART_DATA_ENDPOINT = `http://localhost:4500/api/cart/update-to-cart/${id}`;
    let response = await Axios.put(UPDATE_CART_DATA_ENDPOINT, JSON.stringify(item),config);
    return response;
}