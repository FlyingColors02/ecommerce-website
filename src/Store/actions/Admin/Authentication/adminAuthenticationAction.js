import {ADMIN_LOGIN,ADMIN_REGISTRATION,ADDRESS,ADMIN_ERROR,LOGGEDIN_ADMIN, LOADING, LOG_OUT, BANK_DETAILS, PASSWORD, MOBILE_NUMBER,USER_NAME} from "./adminAuthentication.type";
import { AdminLogin, AdminRegistration, loggedInAdmin, Address, bankDetails, changePassword, changeMobileNo, changeUserName} from "../../../../API/Admin/Authentication/authenticationAdminApi";
import history from "../../../../Shared/History/index";

export const AdminLoginAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await AdminLogin(data);
            console.log(response);
            localStorage.setItem("admin",JSON.stringify(response.data.jwt));
            dispatch({type: ADMIN_LOGIN, payload: response.data});
            history.push("/add/category/_a");
            window.location.reload();

        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
        
    }
}

export const AdminRegistrationAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await AdminRegistration(data);
            console.log(response);
            dispatch({type: ADMIN_REGISTRATION, payload: response.data});
           
            history.push("/admin/login");

            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
        
    }
}

export const PickUpAddressAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await Address(data);
            console.log(response);
            dispatch({ type: ADDRESS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
    }
}

export const BankDetailsAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await bankDetails(data);
            console.log(response);
            dispatch({ type: BANK_DETAILS, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
    }
}

export const ChangeUserNameAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await changeUserName(data);
            console.log(response);
            dispatch({ type: USER_NAME, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
    }
}


export const ChangePasswordAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await changePassword(data);
            console.log(response);
            dispatch({ type: PASSWORD, payload: response.data});
            localStorage.removeItem("admin");
            history.push("/admin/login");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
    }
}

export const ChangeMobileNumberAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await changeMobileNo(data);
            console.log(response);
            dispatch({ type: MOBILE_NUMBER, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: ADMIN_ERROR, payload: error.response.data})
        }
    }
}

export const AdminLoggedInAction = () => {
    return async dispatch => {
        dispatch({type: LOADING});
        try{
            let response = await loggedInAdmin();
            dispatch({ type: LOGGEDIN_ADMIN, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: ADMIN_ERROR, payload: error.response.data});
        }
        
        
    }
}

export const AdminLogoutAction = () => {
    return async dispatch => {
        dispatch({type: LOG_OUT});
        localStorage.removeItem("admin");
        history.push("/admin/login");
        window.location.reload();
    }
}