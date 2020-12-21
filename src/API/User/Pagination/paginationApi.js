import axios from "axios";
import { config } from "../Authentication/authenticationApi";

export const productpagination = async(pageNo) =>{

    let PRODUCTS_PAGINATION_ENDPOINT = `http://localhost:4500/api/products/productpage/${pageNo}`;
    let response = await axios.get( PRODUCTS_PAGINATION_ENDPOINT,config);
    console.log(response);
    return response;

}

export const Pagination = async(pageNo,data) => {
    console.log(JSON.stringify(data));
    let PRODUCTS_PAGINATION_ENDPOINT = `http://localhost:4500/api/products/searchproductpage/${pageNo}`;
    let response = await axios.post( PRODUCTS_PAGINATION_ENDPOINT,JSON.stringify(data),config);
    console.log(response);
    return response;
}