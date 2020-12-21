import { LATEST_PRODUCTS, PRODUCT_PRE_LOADING, USER_PRODUCT_ERROR } from "../../../actions/User/Products/products.type";

export const latestProductsReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_PRE_LOADING:
            return {loading :true}
        case LATEST_PRODUCTS:
            return { data: action.payload, loading: false}
        case USER_PRODUCT_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}