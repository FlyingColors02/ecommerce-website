import { LOADING, PLACE_ORDER, ORDER_ERROR, FETCH_USER_ORDER, REMOVE_USER_ORDER_ITEM} from "./order.type";
import { placeOrder, removeOrderItem, viewUserOrder} from "../../../../API/User/Order/orderApi";
import history from "../../../../Shared/History";


export const PlaceOrderAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await placeOrder(data);
            console.log(response);
            dispatch({type: PLACE_ORDER, payload: response.data});
            history.push("/order/u");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: ORDER_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
        
    }
}

export const ViewUserOrderAction = () => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await viewUserOrder();
            console.log(response);
            dispatch({type: FETCH_USER_ORDER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: ORDER_ERROR, payload: error.response.data});
            // history.push("/error");
            // window.location.reload();
        }
        
    }
}

export const RemoveUserOrderAction = (id) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await removeOrderItem(id);
            console.log(response);
            dispatch({type: REMOVE_USER_ORDER_ITEM, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: ORDER_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
        
    }
}
