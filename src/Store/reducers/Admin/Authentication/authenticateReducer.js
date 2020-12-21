import { LOADING, LOG_OUT, ADMIN_LOGIN, ADMIN_ERROR, ADMIN_REGISTRATION } from "../../../actions/Admin/Authentication/adminAuthentication.type";

export const AdminLoginReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case ADMIN_LOGIN:
            return {data: action.payload, loading: false};
        case ADMIN_ERROR:
            return {error: action.payload};
        case LOG_OUT:
            return {removeuser: true};
        default:
            return state;
    }
}

export const AdminRegistrationReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case ADMIN_REGISTRATION:
            return {data: action.payload, loading: false};
        case ADMIN_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}

