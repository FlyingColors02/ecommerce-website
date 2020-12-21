import { LOADING, FETCH_MAIN_CATEGORY, FETCH_CATEGORY, FETCH_SUB_CATEGORY,CATEGORY_ERROR, ADD_CATEGORY, ADD_MAIN_CATEGORY,ADD_SUB_CATEGORY} from "../../../actions/Admin/Category/category.type";

export const FetchMainCategoryReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: true}
        case FETCH_MAIN_CATEGORY:
            return { data: action.payload, loading: false}
        case CATEGORY_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

export const FetchCategoryReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: true}
        case FETCH_CATEGORY:
            return { data: action.payload, loading: false}
        case CATEGORY_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

export const FetchSubCategoryReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: true}
        case FETCH_SUB_CATEGORY:
            return { data: action.payload, loading: false}
        case CATEGORY_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

export const AddCategoryReducer = (state = {}, action) => {
    switch(action.type){
        case LOADING:
            return { loading: true}
        case ADD_SUB_CATEGORY:
            return { data: action.payload, loading: false}
        case ADD_CATEGORY:
            return { data: action.payload, loading: false}
        case ADD_MAIN_CATEGORY:
            return { data: action.payload, loading: false}
        case CATEGORY_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

