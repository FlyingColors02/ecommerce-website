import {SELLER_LOGIN, LOADING, SELLER_REGISTRATION, SELLER_ERROR, LOG_OUT,USER_NAME, LOGGEDIN_SELLER, PICKUP_ADDRESS, BANK_DETAILS, PASSWORD, MOBILE_NUMBER, DELETE_SELLER_ACCOUNT} from "./sellerAuthentication.type";
import { sellUserLogin, sellUserRegistration, loggedInSeller, pickUpAddress, bankDetails, changePassword, changeMobileNo, changeUserName, deleteSellerAccount} from "../../../../API/Seller/Authentication/authenticationSellApi";
import history from "../../../../Shared/History/index";


export const SellLoginAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await sellUserLogin(data);
            console.log(response);
            localStorage.setItem("seller",JSON.stringify(response.data.jwt));
            dispatch({type: SELLER_LOGIN, payload: response.data});
            history.push("/seller/ProductContribution/pageNo=1");
            window.location.reload();

        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
        }
        
    }
}

export const SellRegistrationAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await sellUserRegistration(data);
            console.log(response);
            localStorage.setItem("sellerRegistration",JSON.stringify(response.data.data));
            dispatch({type: SELLER_REGISTRATION, payload: response.data});
           
            history.push("/seller/PickUpAddress");

            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
        }
        
    }
}

export const PickUpAddressAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await pickUpAddress(data);
            console.log(response);
            dispatch({ type: PICKUP_ADDRESS, payload: response.data});
            history.push("/seller/BankDetails");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
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
            localStorage.clear("sellerRegistration");
            if(window.location.pathname==="/seller/BankDetails"){
                history.push("/seller/login");
                window.location.reload();
            }
            else{
                window.location.reload();
            }
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
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
            dispatch({type: SELLER_ERROR, payload: error.response.data})
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
            localStorage.removeItem("seller");
            history.push("/seller/login");
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
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
            dispatch({type: SELLER_ERROR, payload: error.response.data})
        }
    }
}

export const SellLoggedInAction = () => {
    return async dispatch => {
        dispatch({type: LOADING});
        try{
            let response = await loggedInSeller();
            dispatch({ type: LOGGEDIN_SELLER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: SELLER_ERROR, payload: error.response.data});
        }
        
        
    }
}

export const SellLogoutAction = () => {
    return async dispatch => {
        dispatch({type: LOG_OUT});
        localStorage.removeItem("seller");
        history.push("/seller/login");
        window.location.reload();
    }
}

export const DeleteSellerAccountAction = (data) => {
    return async dispatch => {
        dispatch({ type: LOADING});
        try{
            let response = await deleteSellerAccount(data);
            console.log(response);
            dispatch({ type: DELETE_SELLER_ACCOUNT, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: SELLER_ERROR, payload: error.response.data})
        }
    }
}
