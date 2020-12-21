import { PRODUCT_PAGINATION,PAGINATION, LOADING, PAGINATION_ERROR} from "../../../actions/User/Pagination/pagination.type";

export const ProductPaginationReducer = (state={},action) => {
    switch(action.type){
        case LOADING:
            return {loading :true}
        case PRODUCT_PAGINATION:
            return { data: action.payload, loading: false}
        case PAGINATION_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}

export const PaginationReducer = (state={},action) => {
    switch(action.type){
        case LOADING:
            return {loading :true}
        case PAGINATION:
            return { data: action.payload, loading: false}
        case PAGINATION_ERROR:
            return { error: action.payload}
        default :
            return state;     
    }
}