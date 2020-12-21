import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";

const SellerPrivateRoute = ({component: Component, ...rest}) => {
    return(
            <Route
                    {...rest}
                    render={props => localStorage.getItem("seller") ?
                                (<Component {...props}/>)
                                :
                                (<Redirect to={{pathname:"/seller/login", state:{from: props.location}}}/>)
                    }
                
            />
    )
    
}

export default SellerPrivateRoute;