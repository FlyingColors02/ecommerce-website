import React, { Component } from "react";
import "../../User/Authentication/login.css";
import simpleReactValidator from "simple-react-validator";
import {AdminLoginAction,AdminLoggedInAction} from "../../../Store/actions/Admin/Authentication/adminAuthenticationAction";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            emailId:"",
            password:""
        }
        console.log(props);
        this.validator = new simpleReactValidator({autoForceUpdate: this});
    }

    handleSubmitForm = (event) =>{
        event.preventDefault();
        if(this.validator.allValid()){
            let data = {
                emailId: this.state.emailId,
                password: this.state.password
            }
            console.log(data);
            this.props.AdminLoginAction(data);
           
        }
        else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleInputData = (event) => {
       
        this.setState({[event.target.name]: event.target.value});
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="login">
                    <div className="container">
                        <div className="login-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Login</h2>
                                    {this.props.error ? <p className="error-message-login">{this.props.error.message}</p> : null}
                                </div>
                                <form id="Login" onSubmit={this.handleSubmitForm}>
                                    <div className="form-group">
                                        <input type="email" className="login-input" id="inputEmail" name="emailId"
                                        placeholder="&#xf2bd;  Email Id" value={this.state.emailId} onChange={this.handleInputData} />
                                        { this.validator.message("emailId", this.state.emailId, "email|required")}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="login-input" id="inputPassword" name="password" 
                                        placeholder="&#xf023;  Password" value={this.state.password} onChange={this.handleInputData} />
                                        { this.validator.message("password", this.state.password, ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                    </div>

                                    <div className="forgot">
                                        <Link to="/forgot password">Forgot password?</Link>
                                    </div>

                                    <button type="submit" className="login-button">Login</button>

                                    <div className="condition">
                                        <p> By continuing, you agree to  amYflip's<span><Link to="amYflip conditions"> Conditions  of  Use </Link></span>and <span><Link to="use and privacy">Privacy Notice</Link></span>.</p>
                                    </div>
                                    <hr className="horizontalLine" />

                                </form>
                                <div className="bottom-registration">
                                    <p className="bottom-text"> New To amYflip</p>
                                    <button type="button" className="registration-button "><Link to="/admin/registration" className="registration-button-text">Create Your amYflip Account</Link></button>
                                </div>
                            </div>
                           
                            <p className="copyrightmark">© 2020-2020 Copyright: amYflip.com, Inc. or its affiliates</p>
                        </div></div></div>

            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return{
        login: state.adminLogin,
        error: state.adminLogin.error
    };
}
export default connect(mapStateToProps,{AdminLoginAction,AdminLoggedInAction})(AdminLogin);