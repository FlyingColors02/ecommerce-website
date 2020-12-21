import {USER_LOGIN, LOADING, USER_REGISTRATION, USER_ERROR, LOG_OUT, LOGGEDIN_USER, BANK_DETAILS, DELIVERY_ADDRESS, PASSWORD, MOBILE_NUMBER, USER_NAME, REMOVE_DEBIT_CARD, REMOVE_CREDIT_CARD, DELETE_USER_ACCOUNT} from "./authentication.type";
import {userLogin, userRegistration, loggedInUser, userBankDetails, userDeliveryAddress, changePassword, changeMobileNo, changeUserName, removeDebitCard, removeCreditCard, deleteUserAccount} from "../../../../API/User/Authentication/authenticationApi";
import history from "../../../../Shared/History/index";

export const LoggedInAction = () => {
    return async dispatch => {
        dispatch({type: LOADING});
        try{
            let response = await loggedInUser();
            dispatch({ type: LOGGEDIN_USER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: USER_ERROR, payload: error.response.data});
        }
        
        
    }
}

export const LoginAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userLogin(data);
            console.log(response);
            localStorage.setItem("user",JSON.stringify(response.data.jwt));
            dispatch({type: USER_LOGIN, payload: response.data});
            history.push("/home");
            window.location.reload();

        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const userBankDetailsAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userBankDetails(data);
            console.log(response);
            dispatch({type: BANK_DETAILS, payload: response.data});
            if(window.location.pathname==="/u/account/details"){
                window.location.reload();
            }
      
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const changeUserNameAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changeUserName(data);
            console.log(response);
            dispatch({type: USER_NAME, payload: response.data});
           window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error})
        }
        
    }
}

export const userDeliveryAddressAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userDeliveryAddress(data);
            console.log(response);
            dispatch({type: DELIVERY_ADDRESS, payload: response.data});
            if(window.location.pathname==="/u/account/details"){
                window.location.reload();
            }

        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const userPasswordAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changePassword(data);
            console.log(response);
            dispatch({type: PASSWORD, payload: response.data});
            localStorage.removeItem("user");
        history.push("/login");
        window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const userMobileNumberAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changeMobileNo(data);
            console.log(response);
            dispatch({type: MOBILE_NUMBER, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const removeDebitCardAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await removeDebitCard(data);
            console.log(response);
            dispatch({type: REMOVE_DEBIT_CARD, payload: response.data});
            window.location.reload();

        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const removeCreditCardAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await removeCreditCard(data);
            console.log(response);
            dispatch({type: REMOVE_CREDIT_CARD, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const RegistrationAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userRegistration(data);
            console.log(response);
            dispatch({type: USER_REGISTRATION, payload: response.data});
           
            history.push("/login");

            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const LogoutAction = () => {
    return async dispatch => {
        localStorage.removeItem("user");
        dispatch({type: LOG_OUT});
        history.push("/login");
        window.location.reload();
    }
}

export const deleteUserAccountAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await deleteUserAccount(data);
            console.log(response);
            dispatch({type: DELETE_USER_ACCOUNT, payload: response.data});
            // window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}
