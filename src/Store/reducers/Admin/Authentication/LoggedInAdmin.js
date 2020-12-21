import { LOADING, ADMIN_ERROR, LOGGEDIN_ADMIN } from "../../../actions/Admin/Authentication/adminAuthentication.type";

export const LoggedInAdminReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case LOGGEDIN_ADMIN:
            return { data: action.payload, loading: false};
        case ADMIN_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}