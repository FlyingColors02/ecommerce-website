import {ALL_SHIPPED_ORDERS,ALL_CANCELLED_ORDERS,PAYMENT_LOADING,PAYMENT_ERROR} from "../../../actions/Admin/Payment/payment.type"

export const FetchAllShippedOrdersReducer = (state = {}, action) => {
    switch(action.type){
        case PAYMENT_LOADING:
            return { loading: true}
        case ALL_SHIPPED_ORDERS:
            return { data: action.payload, loading: false}
        case PAYMENT_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

export const FetchAllCancelledOrdersReducer = (state = {}, action) => {
    switch(action.type){
        case PAYMENT_LOADING:
            return { loading: true}
        case ALL_CANCELLED_ORDERS:
            return { data: action.payload, loading: false}
        case PAYMENT_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}
