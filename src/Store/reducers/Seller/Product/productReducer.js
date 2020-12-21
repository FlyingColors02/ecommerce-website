import { LOADING, FETCH_SELLER_ALL_PRODUCTS, SELLER_PRODUCT_ERROR, ADD_PRODUCT, FETCH_MAIN_CATEGORY, UPDATE_PRODUCT } from "../../../actions/Seller/Product/product.type";

export const FetchSellerProductsReducer = (state = {}, action) =>{
    switch(action.type){
        case LOADING: 
            return{loading: true}
        case FETCH_SELLER_ALL_PRODUCTS:
            return { data: action.payload, loading: false}
        case SELLER_PRODUCT_ERROR:
            return { error: action.payload}
        default:
            return state;
    }
}

export const AddProductReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: true}
        case ADD_PRODUCT:
            return { data: action.payload, loading: false}
        case SELLER_PRODUCT_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}


export const UpdateProductReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: state.loading}
        case UPDATE_PRODUCT:
            return { data: action.payload, loading: false}
        case SELLER_PRODUCT_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

