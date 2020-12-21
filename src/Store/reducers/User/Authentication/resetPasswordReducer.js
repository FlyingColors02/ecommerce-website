import { LOADING, USER_ERROR, SEND_MAIL, RESET_PASSWORD } from "../../../actions/User/Authentication/restPassword.type";

export const SendMailReducer = ( state = {}, action ) =>{
    switch(action.type)
    {
        case LOADING:
            return{ loading: true };
        case  SEND_MAIL:
            return { data: action.payload, loading: false};
        case USER_ERROR:
            return { error: action.payload,loading:false };
        default:
            return state;
    }
}


export const ResetPasswordReducer =( state={}, action) => {
    switch(action.type)
    {
        case LOADING:
            return { loading: true };
        case RESET_PASSWORD:
            return { data: action.payload, loading: false};
        case USER_ERROR:
            return { error: action.payload, loading:false };
        default:
            return state;
    }
}