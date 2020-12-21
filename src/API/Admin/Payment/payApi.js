import Axios from "axios";
import {authAdmin} from "../../../Helpers/currentAdmin";
import { config } from "../../User/Authentication/authenticationApi";

export const allShippedOrder = async() =>{

    let All_SHIPPED_ORDER = `http://localhost:4500/api/order/allShippedOrders`;
    let response = await Axios.get(All_SHIPPED_ORDER,{headers: authAdmin(),"Content-Type": "application/json"});
    console.log(response);
    return response;
}

export const allCancelledOrder = async() => {

    let ALL_CANCELLED_ORDER = "http://localhost:4500/api/order/allCancelledOrders";
    let response = await Axios.get(ALL_CANCELLED_ORDER, {headers: authAdmin(), "Content-Type":"application/json"});
    console.log(response);
    return response;
}

export const paySeller = async(id) => {

    let PAY_SELLER_ENDPOINT = `http://localhost:4500/api/payment/paySeller/${id}`;
    let response = await Axios.put( PAY_SELLER_ENDPOINT,config);
    console.log(response);
    return response;
}

export const refundUser = async(id) => {

    let REFUND_USER_ENDPOINT = `http://localhost:4500/api/payment/refundUser/${id}`;
    let response = await Axios.put( REFUND_USER_ENDPOINT, config);
    console.log(response);
    return response;
}