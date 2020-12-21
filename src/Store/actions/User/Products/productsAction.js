import { productsData, productDetailsById, latestproducts, productByCategory,productByCategoryAndSubCategory } from "../../../../API/User/Products/productsApi";
import internalServerError from "../../../../components/ErrorPage/internalServalError";
import history from "../../../../Shared/History";
import { ALL_PRODUCTS, PRODUCT_PRE_LOADING, USER_PRODUCT_ERROR, PRODUCT_DETAILS, LATEST_PRODUCTS, PRODUCTS_BY_CATEGORY, PRODUCTS_BY_SUBCATEGORY } from "./products.type";


export const FetchAllProductsAction = () => {
    return async (dispatch) => {
        dispatch({ type: PRODUCT_PRE_LOADING });
        try{
            let response = await productsData();
            console.log(response.data);
            dispatch({ type: ALL_PRODUCTS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: USER_PRODUCT_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}


export const productDetailsAction = (id) => {

    return async (dispatch) => {
        dispatch({ type: PRODUCT_PRE_LOADING});

        try{
            let response = await productDetailsById(id);
            console.log(response);
            dispatch({ type: PRODUCT_DETAILS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: USER_PRODUCT_ERROR, payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}

export const latestProductsAction = () => {

    return async (dispatch) => {
        dispatch({ type: PRODUCT_PRE_LOADING });
        
        try{
            let response = await latestproducts();
            console.log(response);
            dispatch({ type: LATEST_PRODUCTS,payload: response.data});
        }
        catch(error)
        {
            console.log(error);
            dispatch({ type: USER_PRODUCT_ERROR , payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}

export const ProductsByCategoryAction = (category,pageNo) => {

    return async (dispatch) => {
        dispatch({ type: PRODUCT_PRE_LOADING });
        
        try{
            let response = await productByCategory(category,pageNo);
            console.log(response);
            dispatch({ type: PRODUCTS_BY_CATEGORY,payload: response.data});
        }
        catch(error)
        {
            console.log(error);
            dispatch({ type: USER_PRODUCT_ERROR , payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}

export const ProductsBySubCategoryAction = (subCategory, pageNo) => {

    return async (dispatch) => {
        dispatch({ type: PRODUCT_PRE_LOADING });
        
        try{
            let response = await productByCategoryAndSubCategory(subCategory,pageNo);
            console.log(response);
            dispatch({ type: PRODUCTS_BY_SUBCATEGORY,payload: response.data});
        }
        catch(error)
        {
            console.log(error);
            dispatch({ type: USER_PRODUCT_ERROR , payload: error.response.data});
            history.push("/error");
            window.location.reload();
        }
    }
}
