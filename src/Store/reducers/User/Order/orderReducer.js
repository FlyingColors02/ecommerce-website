import { LOADING, PLACE_ORDER, ORDER_ERROR, FETCH_USER_ORDER} from "../../../actions/User/Order/order.type";

export const PlaceOrderReducer = (state={},action) => {
    switch(action.type){
        case LOADING:
            return {loading :true}
        case PLACE_ORDER:
            return { data: action.payload, loading: false}
        case FETCH_USER_ORDER:
            return{ data: action.payload, loading: false}
        case ORDER_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}
