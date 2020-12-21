import axios from "axios";
import {authUser} from "../../../Helpers/currentUser";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};



export const userLogin = async(item) => {

        let LOGIN_ENDPOINT = "http://localhost:4500/api/authenticate/login";
        let response = await axios.post(LOGIN_ENDPOINT,JSON.stringify(item),config);
        console.log(response.data);
        return response;
   
};

export const userDeliveryAddress = async(item)=>{
    let DELIVERY_ADDRESS_ENDPOINT = "http://localhost:4500/api/authenticate/deliveryAddress";
    let response = await axios.put(DELIVERY_ADDRESS_ENDPOINT,JSON.stringify(item),config);
    console.log(response.data);
    return response;
}

export const userBankDetails =  async(item) => {
    let BANK_DETAILS_ENDPOINT = "http://localhost:4500/api/authenticate/userBankDetails";
    let response= await axios.put(BANK_DETAILS_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response;
}

export const userRegistration = async(item) => {
    
    let REGISTRATION_ENDPOINT = "http://localhost:4500/api/authenticate/register";
    let response = await axios.post(REGISTRATION_ENDPOINT,JSON.stringify(item),config);
    console.log(response.data);
    return response;

};

export const changeMobileNo =  async(item) => {
    let MOBILE_NUMBER_ENDPOINT = "http://localhost:4500/api/authenticate/changeMobileNumber";
    let response = await axios.put(MOBILE_NUMBER_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const changePassword =  async(item) => {
    let PASSWORD_ENDPOINT = "http://localhost:4500/api/authenticate/changePassword";
    let response = await axios.patch(PASSWORD_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const removeDebitCard =  async(item) => {
    let REMOVE_DEBIT_ENDPOINT = "http://localhost:4500/api/authenticate/removeDebitCard";
    let response = await axios.put(REMOVE_DEBIT_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const removeCreditCard =  async(item) => {
    let REMOVE_CREDIT_ENDPOINT = "http://localhost:4500/api/authenticate/removeCreditCard";
    let response = await axios.put(REMOVE_CREDIT_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const changeUserName = async(item) => {
    let USER_NAME_ENDPOINT = "http://localhost:4500/api/authenticate/changeUserName";
    let response = await axios.put(USER_NAME_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response;
}

export const loggedInUser = async() => {

    let LOGGEDIN_ENDPOINT = "http://localhost:4500/api/authenticate/loggedinuser";
    let response = await axios.get(LOGGEDIN_ENDPOINT,{ headers: authUser(), "Content-Type": "application/json"});
    return response;

}

export const deleteUserAccount = async(data) => {

    let DELETE_USER_ACCOUNT_ENDPOINT = "http://localhost:4500/api/authenticate/removeuser";
    let response = await axios.delete(DELETE_USER_ACCOUNT_ENDPOINT,{ headers: authUser(),data, "Content-Type": "application/json"});
    return response;

}