import { PRE_LOADING, CART_ERROR, UPDATE_CART_DATA, ADD_QUANTITY, REMOVE_QUANTITY, FETCH_CART_DATA, REMOVE_CART_DATA} from "../../../actions/User/Cart/cart.type";
import { addQuantityUtility, removeQuantityUtility} from "../Cart.Utility/cart.utility";


const INITIAL_VALUE ={
    data: [],
    loading:true
} 


const CartReducer = (state = INITIAL_VALUE, action) => {
    switch(action.type)
    {
        case PRE_LOADING:
            return {...state, loading: state.loading};
        case FETCH_CART_DATA:
            return {...state, data : action.payload, loading: false};
        case REMOVE_CART_DATA:
            return { ...state, data: state.data.filter(item=>item._id !== action.payload._id), loading: false};
        case ADD_QUANTITY:
                return { ...state, data: addQuantityUtility(state.data,action.payload), loading: false};
        case REMOVE_QUANTITY:
                return { ...state, data: removeQuantityUtility(state.data,action.payload), loading: false};
        case UPDATE_CART_DATA:
            return {data: action.payload, loading: false};
        case CART_ERROR:
            return { error: action.payload};
        default:
            return state;
    }
}
export default CartReducer;

