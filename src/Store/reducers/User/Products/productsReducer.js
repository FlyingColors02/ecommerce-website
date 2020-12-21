import { ALL_PRODUCTS, PRODUCT_PRE_LOADING, USER_PRODUCT_ERROR, PRODUCTS_BY_CATEGORY, PRODUCTS_BY_SUBCATEGORY } from "../../../actions/User/Products/products.type";

export const allProductsReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_PRE_LOADING:
            return {loading :true}
        case ALL_PRODUCTS:
            return { data: action.payload, loading: false}
        case USER_PRODUCT_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}

export const ProductsByCategoryReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_PRE_LOADING:
            return {loading :true}
        case PRODUCTS_BY_CATEGORY:
            return { data: action.payload, loading: false}
        case USER_PRODUCT_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}

export const ProductsBySubCategoryReducer = (state={},action) => {
    switch(action.type){
        case PRODUCT_PRE_LOADING:
            return {loading :true}
        case PRODUCTS_BY_SUBCATEGORY:
            return { data: action.payload, loading: false}
        case USER_PRODUCT_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}
