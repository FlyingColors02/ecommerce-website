const { SELLER_ORDER_ERROR, VIEW_SELLER_ORDER, ORDER_LOADING, VIEW_SHIPPED_ORDERS } = require("../../../actions/Seller/Order/order.type");

export const ViewSellerOrderReducer = ( state = {}, action ) =>{
    switch(action.type)
    {
        case ORDER_LOADING:
            return{ loading: true };
        case  VIEW_SELLER_ORDER:
            return { data: action.payload, loading: false};
        case SELLER_ORDER_ERROR:
            return { error: action.payload,loading:false };
        default:
            return state;
    }
}

export const ViewShippedOrderReducer = (state = {}, action) =>{
    switch(action.type){
        case ORDER_LOADING:
            return{loading:true};
        case VIEW_SHIPPED_ORDERS:
            return {data: action.payload, loading:false};
        case SELLER_ORDER_ERROR:
            return { error: action.payload, loading: false};
        default:
            return state;
    }
}