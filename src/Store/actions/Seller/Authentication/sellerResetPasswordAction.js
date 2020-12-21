import { LOADING, SELLER_ERROR, SEND_MAIL, RESET_PASSWORD } from "./sellerRestPassword.type";
import { sendMailSell, resetPasswordSell } from "../../../../API/Seller/Authentication/resetPasswordSellApi";
import history from "../../../../Shared/History/index";
 
export const SellSendMailAction = (data) => {
    return async(dispatch) =>{
        dispatch({type: LOADING});
        try{
            let response = await sendMailSell(data);
            console.log(response);
            dispatch({ type: SEND_MAIL, payload: response.data});
            history.push("/mailsend");
            window.location.reload()
        }
        catch(error){
            dispatch({ type: SELLER_ERROR, payload: error.response.data});
        }
    }
}

export const SellResetPasswordAction = ( data, token) => {
    return async(dispatch) => {
        dispatch({ type: LOADING});
        try{
            let response = await resetPasswordSell( data, token);
            console.log(response);
            dispatch({ type: RESET_PASSWORD, payload: response.data});
            history.push("/login");
            window.location.reload();
        }
        catch(error){
            dispatch({ type: SELLER_ERROR, payload: error.response.data});
        }
    }
}