import axios from "axios";
import {authSeller} from "../../../Helpers/currentSeller";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};

export const sellUserLogin = async(item) => {

        let LOGIN_ENDPOINT = "http://localhost:4500/api/seller/authenticate/sellerlogin";
        let response = await axios.post(LOGIN_ENDPOINT,JSON.stringify(item),config);
        console.log(response.data);
        return response;
   
};


export const sellUserRegistration = async(item) => {
    
    let REGISTRATION_ENDPOINT = "http://localhost:4500/api/seller/authenticate/sellerregister";
    let response = await axios.post(REGISTRATION_ENDPOINT,JSON.stringify(item), config);
    return response;

};

export const pickUpAddress = async(item) => {

    let PICKUP_ADDRESS_ENDPOINT = "http://localhost:4500/api/seller/authenticate/pickupaddress";
    let response = await axios.put(PICKUP_ADDRESS_ENDPOINT, JSON.stringify(item), config);
    return response;
}

export const bankDetails = async(item) =>{
    
    let BANK_DETAILS_ENDPOINT = "http://localhost:4500/api/seller/authenticate/sellerBankDetails";
    let response = await axios.put(BANK_DETAILS_ENDPOINT, JSON.stringify(item), config);
    return response;
    
}

export const changeUserName = async(item) =>{
    
    let USER_NAME_ENDPOINT = "http://localhost:4500/api/seller/authenticate/changeUserName";
    let response = await axios.put(USER_NAME_ENDPOINT, JSON.stringify(item), config);
    return response;
    
}

export const changeMobileNo =  async(item) => {
    let MOBILE_NUMBER_ENDPOINT = "https://localhost:4500/api/seller/authenticate/changeMobileNumber";
    let response = await axios.put(MOBILE_NUMBER_ENDPOINT, JSON.stringify(item),config);
    return response; 
}

export const changePassword =  async(item) => {
    let PASSWORD_ENDPOINT = "https://localhost:4500/api/seller/authenticate/changePassword";
    let response = await axios.put(PASSWORD_ENDPOINT, JSON.stringify(item),config);
    return response; 
}

export const loggedInSeller = async() => {

    let LOGGED_IN_ENDPOINT = "http://localhost:4500/api/seller/authenticate/loggedinseller";
    let response = await axios.get(LOGGED_IN_ENDPOINT,{ headers: authSeller(), "Content-Type": "application/json"});
    return response;

}

export const deleteSellerAccount = async(data) => {

    let DELETE_SELLER_ACCOUNT_ENDPOINT = "http://localhost:4500/api/seller/authenticate/removeSeller";
    let response = await axios.get(DELETE_SELLER_ACCOUNT_ENDPOINT,{ headers: authSeller(),data, "Content-Type": "application/json"});
    return response;

}