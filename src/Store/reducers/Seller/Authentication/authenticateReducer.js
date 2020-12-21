import { LOADING, SELLER_LOGIN, SELLER_ERROR,  SELLER_REGISTRATION, LOG_OUT, DELETE_SELLER_ACCOUNT } from "../../../actions/Seller/Authentication/sellerAuthentication.type";

export const SellLoginReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case SELLER_LOGIN:
            return {data: action.payload, loading: false};
        case SELLER_ERROR:
            return {error: action.payload};
        case LOG_OUT:
            return {removeuser: true};
        default:
            return state;
    }
}

export const SellRegistrationReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case SELLER_REGISTRATION:
            return {data: action.payload, loading: false};
        case SELLER_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

export const DeleteSellerAccountReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case DELETE_SELLER_ACCOUNT:
            return {data: action.payload, loading: false};
        case SELLER_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}