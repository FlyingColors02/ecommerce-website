import React, { Component } from "react";
import "./registrationSell.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { SellRegistrationAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';



class RegistrationSell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            newsLetterCheck: true,
            mobileNo: "",
            isSeller: true,
            sellerLogin: {
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
                isSeller: true,
                sellerLogin: {
                    emailId: this.state.emailId,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }
            }
            console.log(data);
            this.props.SellRegistrationAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

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
                <div className="registration-sell">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2>CREATE YOUR SELLER ACCOUNT</h2>
                                            {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                        </div>
                                        <form id="registration-sell" onSubmit={this.handleSubmitForm}>
                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" id="inputfirstname" name="userName"
                                                    placeholder="&#xf007;  UserName" value={this.state.userName} onChange={this.handleInputData} />
                                                {this.validator.message("userName", this.state.userName, "alpha_num_dash_space|min:4|required")}
                                            </div>

                                            <div className="form-group">
                                                <PhoneInput
                                                    className="registration-sell-input"
                                                    placeholder="phone number"
                                                    defaultCountry="IN"
                                                    value={this.state.mobileNo}
                                                    onChange={this.handleOnChange}
                                                />

                                                {this.validator.message("mobileNo", this.state.mobileNo, "required|phone")}


                                            </div>


                                            <div className="form-group">
                                                <input type="email" className="registration-sell-input" id="inputEmail" name="emailId"
                                                    placeholder="&#xf2bd;  Email Id" value={this.state.emailId || ""} onChange={this.handleInputData} />
                                                {this.validator.message("emailId", this.state.emailId, "email|required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="password" className="registration-sell-input" id="inputPassword" name="password"
                                                    placeholder="&#xf023;  Password" value={this.state.password || ""} onChange={this.handleInputData} />
                                                {this.validator.message("password", this.state.password, ["string", "required", { regex: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"] }], { messages: { regex: "must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character." } })}
                                            </div>

                                            <div className="form-group">
                                                <input type="password" className="registration-sell-input" id="inputConfirmPassword" name="confirmPassword"
                                                    placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                                {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "must match Password." } })}
                                            </div>

                                            <button type="submit" className="registration-sell-button">Register</button>


                                            <div className="condition">

                                                <input name="newsLetterCheck" type="checkbox" defaultChecked={this.state.newsLetterCheck} onChange={this.handleCheckBox} />
                                                <span>Click here!! Want to get notification on mail.</span>

                                                <p> By continuing, you agree to  amYflip's<span><Link to="/amYflip conditions"> Conditions  of  Use </Link></span>and <span><Link to="/privacy policy">Privacy Policy</Link></span>.</p>
                                            </div>
                                            <hr className="horizontalLine" />
                                            <div className="login-bottom">
                                                <p>Already a Seller?  <span><Link to="/seller/login"> Sign In </Link></span> </p>
                                            </div>

                                        </form>
                                    </div>
                                    
                                </div></div>
                        </div>
                        <div className="col-md-5">
                            <div className="container sell-registration-text">
                                <h3 style={{ paddingBottom:"20px"}}>Sell to crores of customers on amYflip, right from your doorstep!</h3>
                                <hr className="horizontalLine-white" />
                                
                                      
                                <h5 className="info-sell">How will this information be used?</h5>
                                <p>
                                You can use your email address or mobile number as 'Username' to login to your amYflip Seller Account.
                                Please note, the 'Username' and 'Password' used here are only to access your amYflip Seller Account and can’t be used on amYflip.com shopping destination.
                                </p>
                                <hr className="horizontalLine-white" />
                            </div>
                        </div>
                       
                    </div>
                    <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        errormessage: state.sellerRegister.error
    };
}
export default connect(mapStateToProps, { SellRegistrationAction })(RegistrationSell);