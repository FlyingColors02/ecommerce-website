import { LOADING,USER_ERROR, SEND_MAIL, RESET_PASSWORD } from "./restPassword.type";
import { sendMail, resetPassword } from "../../../../API/User/Authentication/resetPasswordApi";
import history from "../../../../Shared/History/index";
 
export const SendMailAction = (data) => {
    return async(dispatch) =>{
        dispatch({type: LOADING});
        try{
            let response = await sendMail(data);
            console.log(response);
            dispatch({ type: SEND_MAIL, payload: response.data});
            history.push("/mailsend");
            window.location.reload()
        }
        catch(error){
            dispatch({ type: USER_ERROR, payload: error.response.data});
        }
    }
}

export const ResetPasswordAction = ( data, token) => {
    return async(dispatch) => {
        dispatch({ type: LOADING});
        try{
            let response = await resetPassword( data, token);
            console.log(response);
            dispatch({ type: RESET_PASSWORD, payload: response.data});
            history.push("/login");
            window.location.reload();
        }
        catch(error){
            dispatch({ type: USER_ERROR, payload: error.response.data});
        }
    }
}