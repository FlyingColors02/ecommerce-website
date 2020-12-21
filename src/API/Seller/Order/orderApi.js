import Axios from "axios";
import {authSeller} from "../../../Helpers/currentSeller";
import { config } from "../../User/Authentication/authenticationApi";

export const viewSellerOrder = async() =>{

    let SELLER_ORDER = `http://localhost:4500/api/order/sellerorders`;
    let response = await Axios.get(SELLER_ORDER,{headers: authSeller(),"Content-Type": "application/json"});
    console.log(response);
    return response;
}

export const removeSellerOrder = async(id) => {

    let REMOVE_SELLER_ORDER = `http://localhost:4500/api/order/cancel-order-by-seller/${id}`;
    let response = await Axios.put(REMOVE_SELLER_ORDER, config);
    console.log(response);
    return response;

}

export const shippedTheOrder = async(id) => {
    let SHIPPED_THE_ORDER = `http://localhost:4500/api/order/shipped/${id}`;
    let response = await Axios.put(SHIPPED_THE_ORDER,config);
    console.log(response);
    return response;
}

export const viewShippedOrders = async(id) => {
    let VIEW_SHIPPED_ORDERS = `http://localhost:4500/api/order/sellershippedorders`;
    let response = await Axios.get(VIEW_SHIPPED_ORDERS,{headers:authSeller(), "Content-Type":"application/json"});
    console.log(response);
    return response;
}