import Axios from "axios";
import {authAdmin} from "../../../Helpers/currentAdmin";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};

export const FetchMainCategory = async()=>{
    
    let FETCH_MAIN_CATEGORY_ENDPOINT = "http://localhost:4500/api/products/allmaincategory";
    let response = await Axios.get(FETCH_MAIN_CATEGORY_ENDPOINT,config);
    console.log(response);
    return response;
}

export const FetchSubCategory = async()=>{
    let FETCH_SUB_CATEGORIES_ENDPOINT = "http://localhost:4500/api/products/allsubcategory";
    let response = await Axios.get(FETCH_SUB_CATEGORIES_ENDPOINT, config);
    console.log(response);
    return response;
}

export const FetchCategory = async() => {
    let FETCH_CATEGORIES_ENDPOINT = "http://localhost:4500/api/products/allcategory";
    let response = await Axios.get(FETCH_CATEGORIES_ENDPOINT, config);
    console.log(response);
    return response;
}
export const addSubCategory = async(item)=>{

    let ADD_SUB_CATEGORY_ENDPOINT = "http://localhost:4500/api/products/addsubcategory";
    let response = await Axios.post(ADD_SUB_CATEGORY_ENDPOINT,JSON.stringify(item),config);
    console.log(response);
    return response;
}

export const addCategory = async(item) =>{
     
    let ADD_CATEGORY_ENDPOINT = "http://localhost:4500/api/products/addcategory";
    let response = await Axios.post(ADD_CATEGORY_ENDPOINT,JSON.stringify(item),config);
    console.log(response);
    return response;
}

export const addMainCategory = async(item) => {

    let ADD_MAIN_CATEGORY_ENDPOINT = "http://localhost:4500/api/products/addmaincategory";
    let response = await Axios.post(ADD_MAIN_CATEGORY_ENDPOINT, JSON.stringify(item), config);
    console.log(response);
    return response;
}