import Axios from "axios";
import { authUser } from "../../../Helpers/currentUser";
import { config } from "../Authentication/authenticationApi";

export const placeOrder = async( item) =>{

    let PLACE_ORDER_ENDPOINT = `http://localhost:4500/api/order/place-order`;
    let response = await Axios.post( PLACE_ORDER_ENDPOINT,JSON.stringify(item),config);
    console.log(response);
    return response;

}

export const viewUserOrder = async() =>{

    let USER_ORDER = `http://localhost:4500/api/order/userorders`;
    let response = await Axios.get(USER_ORDER,{headers: authUser(),"Content-Type": "application/json"});
    console.log(response);
    return response;
}

export const removeOrderItem =  async(id) => {
    
    let REMOVE_ORDER_ITEM = `http://localhost:4500/api/order/cancel-order-by-user/${id}`;
    let response =  await Axios.put(REMOVE_ORDER_ITEM, config);
    console.log(response);
    return response;
}