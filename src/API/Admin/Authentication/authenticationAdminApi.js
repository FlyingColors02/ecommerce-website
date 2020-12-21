import axios from "axios";
import {authAdmin} from "../../../Helpers/currentAdmin";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};

export const AdminLogin = async(item) => {

        let LOGIN_ENDPOINT = "http://localhost:4500/api/admin/login";
        let response = await axios.post(LOGIN_ENDPOINT,JSON.stringify(item),config);
        console.log(response.data);
        return response;
   
};


export const AdminRegistration = async(item) => {
    
    let REGISTRATION_ENDPOINT = "http://localhost:4500/api/admin/adminRegister";
    let response = await axios.post(REGISTRATION_ENDPOINT,JSON.stringify(item), config);
    return response;

};

export const Address = async(item) => {

    let ADDRESS_ENDPOINT = "http://localhost:4500/api/admin/address";
    let response = await axios.put(ADDRESS_ENDPOINT, JSON.stringify(item), config);
    return response;
}

export const bankDetails = async(item) =>{
    
    let BANK_DETAILS_ENDPOINT = "http://localhost:4500/api/admin/adminBankDetails";
    let response = await axios.put(BANK_DETAILS_ENDPOINT, JSON.stringify(item), config);
    return response;
    
}

export const changeUserName = async(item) =>{
    
    let USER_NAME_ENDPOINT = "http://localhost:4500/api/admin/changeUserName";
    let response = await axios.put(USER_NAME_ENDPOINT, JSON.stringify(item), config);
    return response;
    
}

export const changeMobileNo =  async(item) => {
    let MOBILE_NUMBER_ENDPOINT = "https://localhost:4500/api/admin/changeMobileNumber";
    let response = await axios.put(MOBILE_NUMBER_ENDPOINT, JSON.stringify(item),config);
    return response; 
}

export const changePassword =  async(item) => {
    let PASSWORD_ENDPOINT = "https://localhost:4500/api/admin/changePassword";
    let response = await axios.put(PASSWORD_ENDPOINT, JSON.stringify(item),config);
    return response; 
}

export const loggedInAdmin = async() => {

    let LOGGED_IN_ENDPOINT = "http://localhost:4500/api/admin/loggedinadmin";
    let response = await axios.get(LOGGED_IN_ENDPOINT,{ headers: authAdmin(), "Content-Type": "application/json"});
    return response;

}