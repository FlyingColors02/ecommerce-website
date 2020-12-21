import { allCancelledOrder,allShippedOrder, paySeller,refundUser } from "../../../../API/Admin/Payment/payApi";
import { PAYMENT_LOADING, ALL_CANCELLED_ORDERS,ALL_SHIPPED_ORDERS, PAYMENT_ERROR, PAY_SELLER, REFUND_USER} from "./payment.type";
import history from "../../../../Shared/History/index";

export const AllShippedOrdersAction = () => {
    return async dispatch => {
        dispatch({type : PAYMENT_LOADING});
        try{
            let response = await allShippedOrder();
            console.log(response);
            dispatch({type: ALL_SHIPPED_ORDERS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: PAYMENT_ERROR, payload: error.response.data})
        }
        
    }
}

export const AllCancelledOrdersAction = () => {
    return async dispatch => {
        dispatch({type : PAYMENT_LOADING});
        try{
            let response = await allCancelledOrder();
            console.log(response);
            dispatch({type: ALL_CANCELLED_ORDERS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: PAYMENT_ERROR, payload: error.response.data})
        }
        
    }
}

export const PaySellerAction = (id) => {
    return async dispatch => {
        dispatch({type : PAYMENT_LOADING});
        try{
            let response = await paySeller(id);
            console.log(response);
            dispatch({type: PAY_SELLER, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: PAYMENT_ERROR, payload: error.response.data})
        }
        
    }
}

export const RefundUserAction = (id) => {
    return async dispatch => {
        dispatch({type : PAYMENT_LOADING});
        try{
            let response = await refundUser(id);
            console.log(response);
            dispatch({type: REFUND_USER, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: PAYMENT_ERROR, payload: error.response.data})
        }
        
    }
}