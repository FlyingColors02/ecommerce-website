import Axios from "axios";
import { config } from "../Authentication/authenticationSellApi";
import { authSeller } from "../../../Helpers/currentSeller";

export const SellerAllProducts = async(pageNo) =>{

    let SELLER_ALL_PRODUCTS_ENDPOINT = `http://localhost:4500/api/products/seller/products/${pageNo}`;
    let response = await Axios.get(SELLER_ALL_PRODUCTS_ENDPOINT,{headers: authSeller(), "Content-Type": "application/json"});
    return response;
}

export const AddProduct = async(dataImage) =>{

    let ADD_PRODUCT_ENDPOINT = "http://localhost:4500/api/products/addproduct";
    let response = await Axios.post(ADD_PRODUCT_ENDPOINT,dataImage,{headers: authSeller(), "Content-Type": "application/json"});
    return response;
}


export const UpdateProduct = async(id,data)=> {
    let UPDATE_PRODUCT_ENDPOINT = `http://localhost:4500/api/products/updateproduct/${id}`;
    let response = await Axios.put(UPDATE_PRODUCT_ENDPOINT,data, {headers: authSeller(), "Content-Type": "application/json"});
    console.log(response);
    return response;
}

export const RemoveProduct = async(id) => {
    let REMOVE_PRODUCT_ENDPOINT = `http://localhost:4500/api/products/removeproduct/${id}`;
    let response = await Axios.delete(REMOVE_PRODUCT_ENDPOINT,{headers: authSeller(), "Content-Type": "application/json"});
    console.log(response);
    return response;
}