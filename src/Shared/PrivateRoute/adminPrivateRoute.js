import React, { Component } from "react";
import {Route, Redirect} from "react-router-dom";

const AdminPrivateRoute = ({component: Component, ...rest}) => {
    return(
            <Route
                    {...rest}
                    render={props => localStorage.getItem("admin") ?
                                (<Component {...props}/>)
                                :
                                (<Redirect to={{pathname:"/admin/login", state:{from: props.location}}}/>)
                    }
                
            />
    )
    
}

export default AdminPrivateRoute;