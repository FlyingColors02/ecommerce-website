import { viewSellerOrder, removeSellerOrder, shippedTheOrder, viewShippedOrders } from "../../../../API/Seller/Order/orderApi";
import { ORDER_LOADING, SELLER_ORDER_ERROR, VIEW_SELLER_ORDER, REMOVE_SELLER_ORDER, SHIPPED_THE_ORDER, VIEW_SHIPPED_ORDERS} from "./order.type";
import history from "../../../../Shared/History/index";
export const ViewSellerOrderAction = () => {
    return async dispatch => {
        dispatch({type : ORDER_LOADING});
        try{
            let response = await viewSellerOrder();
            console.log(response);
            dispatch({type: VIEW_SELLER_ORDER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ORDER_ERROR, payload: error.response.data})
        }
        
    }
}

export const RemoveSellerOrderAction = (id) => {
    return async dispatch => {
        dispatch({type : ORDER_LOADING});
        try{
            let response = await removeSellerOrder(id);
            console.log(response);
            dispatch({type: REMOVE_SELLER_ORDER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ORDER_ERROR, payload: error.response.data});
        }
        
    }
}

export const ShippedTheOrderAction = (id)=>{
    return async dispatch=>{
        dispatch({type: ORDER_LOADING});
        try{
            let response = await shippedTheOrder(id);
            console.log(response);
            dispatch({type: SHIPPED_THE_ORDER, payload: response.data});
            history.push("/orders/s");
            window.location.reload();
        }

        catch(error)
        {
            console.log(error);
            dispatch({type:SELLER_ORDER_ERROR, payload:error.response.data});
        }
    }
}

export const ViewShippedOrderAction = ()=>{
    return async dispatch=>{
        dispatch({type: ORDER_LOADING});
        try{
            let response = await viewShippedOrders();
            console.log(response);
            dispatch({type: VIEW_SHIPPED_ORDERS, payload: response.data});
        }

        catch(error)
        {
            console.log(error);
            dispatch({type: SELLER_ORDER_ERROR, payload:error.response.data});
        }
    }
}