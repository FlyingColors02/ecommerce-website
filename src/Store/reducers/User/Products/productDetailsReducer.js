import { PRODUCT_PRE_LOADING, USER_PRODUCT_ERROR, PRODUCT_DETAILS} from "../../../actions/User/Products/products.type";

const productDetailsReducer = (state = {}, action) => {
    switch(action.type)
    {
        case PRODUCT_PRE_LOADING:
            return { loading: true};
        case PRODUCT_DETAILS:
            return { data: action.payload, loading: false};
        case USER_PRODUCT_ERROR:
            return { error: action.payload};
        default:
            return state;
    }
}
export default productDetailsReducer;