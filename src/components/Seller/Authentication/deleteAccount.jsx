import React, { Component } from "react";
import "./sellLogin.css";
import simpleReactValidator from "simple-react-validator";
import {DeleteSellerAccountAction, SellLoggedInAction} from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
class DeleteSellerAccount extends Component {
    constructor(props) {
        super(props);
        this.state={
            
            password:"",
            confirmPassword:this.state.confirmPassword
        }
        console.log(props);
        this.validator = new simpleReactValidator({autoForceUpdate: this});
    }

    handleSubmitForm = (event) =>{
        event.preventDefault();
        if(this.validator.allValid()){
            let data = {
                
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }
            console.log(data);
            this.props.DeleteSellerAccountAction(data);
           
        }
        else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    componentDidMount=()=>{
        this.props.SellLoggedInAction();
    }
    handleInputData = (event) => {
       
        this.setState({[event.target.name]: event.target.value});
        
    }

    render() {
    if(this.props.deleteSellerAccount){return <h2 style={{color:"green", marginLeft:"50%", marginTop:"20%"}}>{this.props.deleteSellerAccount.message}</h2>}
        return (
            <React.Fragment>
                
                    <div className="container">
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Verify Password</h2>
                                    {this.props.error ? <p className="error-message-login">{this.props.error.message}</p> : null}
                                </div>
                                <form id="Login" onSubmit={this.handleSubmitForm}>

                                    <div className="form-group">
                                        <input type="password" className="login-sell-input" id="inputPassword" name="password" 
                                        placeholder="&#xf023;  Password" value={this.state.password} onChange={this.handleInputData} />
                                        { this.validator.message("password", this.state.password, ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="login-sell-input" id="inputConfirmPassword" name="confirmPassword"
                                            placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                        {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "must match Password." } })}
                                    </div>
                                    
                                  
                                        <button type="submit" className="login-sell-button">Submit</button>

                                   
                                   
                                </form>
                               
                            </div>
                           
                            <p className="copyrightmark">© 2020-2020 Copyright: amYflip.com, Inc. or its affiliates</p>
                        </div></div>

            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return{
        loggedInSeller:state.loggedInSeller.data,
        error: state.deleteSellerAccount.error,
        loading: state.deleteSellerAccount.loading,
        deleteSellerAccount:state.deleteSellerAccount.data
    };
}
export default connect(mapStateToProps,{deleteUserAccountAction, LoggedInAction})(DeleteSellerAccount);