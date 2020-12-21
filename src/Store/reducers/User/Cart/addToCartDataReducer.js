import { PRE_LOADING, CART_ERROR, ADD_TO_CART_DETAILS} from "../../../actions/User/Cart/cart.type";

const INITIAL_VALUE ={
    data: [],
    loading:true
} 


const addToCartReducer = (state = INITIAL_VALUE, action) => {
    switch(action.type)
    {
case PRE_LOADING:
    return {...state, loading: state.loading};
case ADD_TO_CART_DETAILS:
    return {...state, data :  action.payload, loading: false};
    case CART_ERROR:
            return { error: action.payload};
        default:
            return state;
    }
}

export default addToCartReducer;