import React, { Component } from "react";
import Navigation from "./components/Navbar/navbar";
import { Route, BrowserRouter, Redirect, Switch,Router } from "react-router-dom";
import Login from "./components/Authentication/login";
import { createBrowserHistory } from "history";
import Alert from 'react-bootstrap/Alert'
class App extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <React.Fragment>
            <Navigation/>
                    <Switch>
                        <Route path="/login" component={Login} />
                        {/* <Route path="/signup" component={signup} />
                        <Route path="/home" component={Home} /> */}
                    </Switch>
            
            </React.Fragment>
            
        )
    }
}

export default App;