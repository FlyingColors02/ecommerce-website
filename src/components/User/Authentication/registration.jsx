import React, { Component } from "react";
import "./registration.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { RegistrationAction } from "../../../Store/actions/User/Authentication/authenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';



class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            newsLetterCheck: true,
            mobileNo: "",
            isSeller: false,
            userLogin: {
                emailId: "",
                password: "",
                confirmPassword: ""
            }
        }
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            let data = {
                userName: this.state.userName,
                newsLetterCheck: this.state.newsLetterCheck,
                mobileNo: this.state.mobileNo,
                isSeller: false,
                userLogin: {
                    emailId: this.state.emailId,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }
            }
            console.log(data);
            this.props.RegistrationAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });


    }

    handleOnChange = value => {
        this.setState({ mobileNo: value });
      };

    handleCheckBox = () => {
        this.setState({ newsLetterCheck: !this.state.newsLetterCheck })
    }

    render() {
        return (
            <React.Fragment>
                <div className="registration">
                    <div className="container">
                        <div className="registration-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                            <div className="main-div">
                                <div className="panel">
                                    <h2>New Account</h2>
                                        {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} 
                                </div>
                                <form id="registration" onSubmit={this.handleSubmitForm}>
                                    <div className="form-group">
                                        <input type="text" className="registration-input" id="inputfirstname" name="userName"
                                            placeholder="&#xf007;  UserName" value={this.state.userName} onChange={this.handleInputData} />
                                        {this.validator.message("userName", this.state.userName, "alpha_num_dash_space|min:4|required")}
                                    </div>

                                    <div className="form-group">
                                    <PhoneInput
                                    className="registration-input"
                                       placeholder="phone number"
                                       defaultCountry="IN"
                                       value={ this.state.mobileNo }
                                       onChange={ this.handleOnChange }
                                        />

                                     {this.validator.message("mobileNo", this.state.mobileNo, "required|phone")}
                                    

                                    </div>
                                      

                                    <div className="form-group">
                                        <input type="email" className="registration-input" id="inputEmail" name="emailId"
                                            placeholder="&#xf2bd;  Email Id" value={this.state.emailId || ""} onChange={this.handleInputData} />
                                        {this.validator.message("emailId", this.state.emailId, "email|required")}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="registration-input" id="inputPassword" name="password"
                                            placeholder="&#xf023;  Password" value={this.state.password || ""} onChange={this.handleInputData} />
                                        {this.validator.message("password", this.state.password,  ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="registration-input" id="inputConfirmPassword" name="confirmPassword"
                                            placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                        {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "must match Password." } })}
                                    </div>

                                    <button type="submit" className="registration-button">Register</button>


                                    <div className="condition">

                                        <input name="newsLetterCheck" type="checkbox" defaultChecked={this.state.newsLetterCheck} onChange={this.handleCheckBox} />
                                        <span>Click here!! Want to get notification on mail.</span>

                                        <p> By continuing, you agree to  amYflip's<span><Link to="/amYflip conditions"> Conditions  of  Use </Link></span>and <span><Link to="/privacy policy">Privacy Policy</Link></span>.</p>
                                    </div>
                                    <hr className="horizontalLine" />
                                    <div className="login-bottom">
                                        <p>Already a User?  <span><Link to="/login"> Sign In </Link></span> </p>
                                    </div>

                                </form>
                            </div>
                            <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                        </div></div></div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state)=> {
    console.log(state);
    return {errormessage: state.register.error};
}
export default connect(mapStateToProps, { RegistrationAction })(Registration);