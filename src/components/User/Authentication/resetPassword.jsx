import React, { Component } from "react";
import "./resetPassword.css";
import simpleReactValidator from "simple-react-validator";
import {ResetPasswordAction} from "../../../Store/actions/User/Authentication/resetPasswordAction";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:"",
            confirmPassword:""
        }
        console.log(props);
        this.validator = new simpleReactValidator({autoForceUpdate: this});
    }

    handleSubmitForm = (event) =>{
        event.preventDefault();
        if(this.validator.allValid()){
            let data = {
                confirmPassword: this.state.confirmPassword,
                password: this.state.password
            }
            console.log(data);
            this.props.ResetPasswordAction(data,this.props.match.params.token);
           
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
                <div className="resetPassword">
                    <div className="container">
                        <div className="resetPassword-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Reset Password</h2>
                                    {this.props.error ? <p className="error-message-resetPassword">{this.props.error.message}</p> : null}
                                    {this.props.resetPassword ?<p className="resetPasswordData">{this.props.resetPassword.message}</p>  : null }
                                </div>
                                <form id="resetPassword" onSubmit={this.handleSubmitForm}>
                                    
                                    <div className="form-group">
                                        <input type="password" className="resetPassword-input" id="inputPassword" name="password" 
                                        placeholder="&#xf023;  Password" value={this.state.password} onChange={this.handleInputData} />
                                        { this.validator.message("password", this.state.password, ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="resetPassword-input" id="inputConfirmPassword" name="confirmPassword"
                                            placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                        {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "must match Password." } })}
                                    </div>

                                    <button type="submit" className="resetPassword-button">Submit</button>

                                    <div className="condition">
                                        <p> By continuing, you agree to  amYflip's<span><Link to="amYflip conditions"> Conditions  of  Use </Link></span>and <span><Link to="use and privacy">Privacy Notice</Link></span>.</p>
                                    </div>

                                </form>
                            </div>
                            <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                        </div></div></div>

            </React.Fragment>
        )
    }
}
const mapStateToProps = state =>{
    console.log(state);
    return{
        resetPassword: state.resetpassword.data,
        error: state.resetpassword.error
    };
}
export default connect(mapStateToProps,{ResetPasswordAction})(ResetPassword);