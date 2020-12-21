import { LOADING, FETCH_MAIN_CATEGORY,ADD_CATEGORY,ADD_MAIN_CATEGORY,ADD_SUB_CATEGORY, CATEGORY_ERROR, FETCH_CATEGORY, FETCH_SUB_CATEGORY } from "./category.type";
import { FetchMainCategory, addCategory, addMainCategory, addSubCategory, FetchCategory, FetchSubCategory} from "../../../../API/Admin/Category/categoryApi";
import history from "../../../../Shared/History/index";


export const FetchMainCategoryAction = () => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await FetchMainCategory();
            console.log(response);
            dispatch({ type: FETCH_MAIN_CATEGORY, payload: response.data});

        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}

export const AddMainCategoryAction = (data) => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await addMainCategory(data);
            console.log(response);
            dispatch({ type: ADD_MAIN_CATEGORY, payload: response.data});

        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}

export const FetchCategoryAction = () => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await FetchCategory();
            console.log(response);
            dispatch({ type: FETCH_CATEGORY, payload: response.data});

        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}

export const FetchSubCategoryAction = () => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await FetchSubCategory();
            console.log(response);
            dispatch({ type: FETCH_SUB_CATEGORY, payload: response.data});

        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}

export const AddCategoryAction = (data) => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await addCategory(data);
            console.log(response);
            dispatch({ type: ADD_CATEGORY, payload: response.data});
            // window.location.reload(); 
        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}


export const AddSubCategoryAction = (data) => {
    return async (dispatch) => {
        dispatch({type: LOADING});
        try{
            let response = await addSubCategory(data);
            console.log(response);
            dispatch({ type: ADD_SUB_CATEGORY, payload: response.data});
            // window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: CATEGORY_ERROR, payload: error.response.data});
        }
    }
}

