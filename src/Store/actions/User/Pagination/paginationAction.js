import { LOADING, PRODUCT_PAGINATION,PAGINATION, PAGINATION_ERROR } from "./pagination.type";
import { productpagination,Pagination } from "../../../../API/User/Pagination/paginationApi";

export const productPaginationAction = (id) => {

    return async (dispatch) => {
        dispatch({ type: LOADING});

        try{
            let response = await productpagination(id);
            console.log(response);
            dispatch({ type: PRODUCT_PAGINATION, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: PAGINATION_ERROR, payload: error.response.data});
        }
    }
}

export const paginationAction = (id, data) => {

    return async (dispatch) => {
        dispatch({ type: LOADING});

        try{
            let response = await Pagination(id, data);
            console.log(response);
            dispatch({ type: PAGINATION, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: PAGINATION_ERROR, payload: error.response.data});
        }
    }
}