import Axios from "axios";
import { config } from "./authenticationApi";

export const sendMail = async(data) => {
    let SEND_MAIL_ENDPOINT = "http://localhost:4500/api/resetpassword/sendmail";
    let response =  await Axios.post( SEND_MAIL_ENDPOINT, JSON.stringify(data), config);
    return response;
}

export const resetPassword = async( data, token) => {
    let RESETPASSWORD_ENDPOINT = `http://localhost:4500/api/resetpassword/reset-password/${token}`;
    let response = await Axios.post( RESETPASSWORD_ENDPOINT, JSON.stringify(data), config);
    return response;
}