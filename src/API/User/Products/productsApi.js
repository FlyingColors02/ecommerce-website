import axios from "axios";
import { config } from "../Authentication/authenticationApi";

export const productsData = async() =>{

    let PRODUCTS_ENDPOINT = "http://localhost:4500/api/products/allproducts";
    let response = await axios.get( PRODUCTS_ENDPOINT,config);
    console.log(response);
    return response;

}

//using the following api for add to cart aswell
export const productDetailsById = async(id) => {

    let PRODUCT_DETAILS_BY_ID_ENDPOINT = `http://localhost:4500/api/products/productbyid/${id}`;
    let response = await axios.get(PRODUCT_DETAILS_BY_ID_ENDPOINT,config);
    console.log(response);
    return response;
}

export const latestproducts = async() => {

    let LATEST_PRODUCTS_ENDPOINT = "http://localhost:4500/api/products/latestProduct";
    let response = await axios.get(LATEST_PRODUCTS_ENDPOINT,config);
    console.log(response);
    return response;
}

export const productByCategory = async (category,pageNo) => {

    let PRODUCT_BY_CATEGORY = `http://localhost:4500/api/products/category/${category}/page/${pageNo}`;
    let response = await axios.get(PRODUCT_BY_CATEGORY,JSON.stringify(category), config);
    console.log(response);
    return response;
}

export const productByCategoryAndSubCategory = async(subCategory,pageNo) => {

    let PRODUCT_BY_CATEGORY_AND_SUBCATEGORY = `http://localhost:4500/api/products/subcategory/${subCategory}/page/${pageNo}`;
    let response = await axios.get(PRODUCT_BY_CATEGORY_AND_SUBCATEGORY, config);
    console.log(response);
    return response;
}