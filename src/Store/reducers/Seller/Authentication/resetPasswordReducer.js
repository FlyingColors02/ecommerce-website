import { LOADING, SELLER_ERROR, SEND_MAIL, RESET_PASSWORD } from "../../../actions/Seller/Authentication/sellerRestPassword.type";

export const SellSendMailReducer = ( state = {}, action ) =>{
    switch(action.type)
    {
        case LOADING:
            return{ loading: true };
        case  SEND_MAIL:
            return { data: action.payload, loading: false};
        case SELLER_ERROR:
            return { error: action.payload,loading:false };
        default:
            return state;
    }
}


export const SellResetPasswordReducer =( state={}, action) => {
    switch(action.type)
    {
        case LOADING:
            return { loading: true };
        case RESET_PASSWORD:
            return { data: action.payload, loading: false};
        case SELLER_ERROR:
            return { error: action.payload, loading:false };
        default:
            return state;
    }
}