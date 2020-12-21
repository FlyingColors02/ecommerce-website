import { LOADING, USER_ERROR,  LOGGEDIN_USER } from "../../../actions/User/Authentication/authentication.type";

export const LoggedInUserReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case LOGGEDIN_USER:
            return { data: action.payload, loading: false};
        case USER_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}