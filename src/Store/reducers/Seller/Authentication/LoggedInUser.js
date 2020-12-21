import { LOADING, SELLER_ERROR,  LOGGEDIN_SELLER } from "../../../actions/Seller/Authentication/sellerAuthentication.type";

export const LoggedInSellerReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case LOGGEDIN_SELLER:
            return { data: action.payload, loading: false};
        case SELLER_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}