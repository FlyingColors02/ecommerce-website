import React, { Component } from "react";
import "../../Seller/Authentication/registrationSell.css"
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { AdminRegistrationAction } from "../../../Store/actions/Admin/Authentication/adminAuthenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


class AdminRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            mobileNo: "",
            adminLogin: {
                emailId: "",
                password: "",
                confirmPassword: ""
            },
            bankDetails: {
                debitCard: {
                    debitCardNo: "",
                    dCvvNo: 0,
                    dCardHolderName: "",
                    dCardExpireDate: ""
                },
                creditCard: {
                    creditCardNo: "",
                    cCvvNo: 0,
                    cCardHolderName: "",
                    cCardExpireDate: ""
                }
            },
            Address: {
                address: "",
                State: "",
                country: "",
                pinCodeNo: ""
            }
        }
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            let data = {
                userName: this.state.userName,
                mobileNo: this.state.mobileNo,
                isAdmin: true,
                adminLogin: {
                    emailId: this.state.emailId,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                },
                bankDetails: {
                    debitCard: {
                        debitCardNo: this.state.debitCardNo,
                        cvvNo: this.state.dCvvNo,
                        cardHolderName: this.state.dCardHolderName,
                        cardExpireDate: this.state.dCardExpireDate
                    },
                    creditCard: {
                        creditCardNo: this.state.creditCardNo,
                        cvvNo: this.state.cCvvNo,
                        cardHolderName: this.state.cCardHolderName,
                        cardExpireDate: this.state.cCardExpireDate
                    }
                },
                Address: {
                    address: this.state.address,
                    State: this.state.State,
                    country: this.state.country,
                    pinCodeNo: this.state.pinCodeNo
                }
            }
            console.log(data);
            this.props.AdminRegistrationAction(data);
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

    selectCountry = (value) => {
        this.setState({ country: value });
        console.log(this.state);
    }

    selectRegion = (value) => {
        this.setState({ State: value });
        console.log(this.state);
    }

    displayContent = (name) => {
        var x = document.getElementById(name);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="registration">
                    <div className="container">
                        <div className="registration-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />

                            <div className="panel">
                                <h2>New Account</h2>
                                {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                            </div>
                            <form id="registration" onSubmit={this.handleSubmitForm}>
                                <fieldset style={{ background: "white", opacity: "0.9", borderRadius: "7px" }}>
                                    <fieldset style={{ marginTop: "20px" }}>
                                        <label>Login & Password</label>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input type="text" className="registration-input" id="inputfirstname" name="userName"
                                                        placeholder="&#xf007;  UserName" value={this.state.userName} onChange={this.handleInputData} />
                                                    {this.validator.message("userName", this.state.userName, "alpha_num_dash_space|min:4|required")}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <PhoneInput
                                                        className="registration-input"
                                                        placeholder="phone number"
                                                        defaultCountry="IN"
                                                        value={this.state.mobileNo}
                                                        onChange={this.handleOnChange}
                                                    />

                                                    {this.validator.message("mobileNo", this.state.mobileNo, "required|phone")}


                                                </div>

                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input type="email" className="registration-input" id="inputEmail" name="emailId"
                                                        placeholder="&#xf2bd;  Email Id" value={this.state.emailId || ""} onChange={this.handleInputData} />
                                                    {this.validator.message("emailId", this.state.emailId, "email|required")}
                                                </div>
                                            </div>

                                        </div>


                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input type="password" className="registration-input" id="inputPassword" name="password"
                                                        placeholder="&#xf023;  Password" value={this.state.password || ""} onChange={this.handleInputData} />
                                                    {this.validator.message("password", this.state.password, ["string", "required", { regex: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"] }], { messages: { regex: "must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character." } })}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <input type="password" className="registration-input" id="inputConfirmPassword" name="confirmPassword"
                                                        placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                                    {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "must match Password." } })}
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>
                                    <hr className="horizontalLine-update" />
                                    <fieldset>
                                        <label>Address</label>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <textarea cols="40" rows="2" className="registration-sell-input" id="inputaddress" name="address"
                                                        placeholder="&#xf007;  Address" value={this.state.address || ""} onChange={this.handleInputData} >
                                                    </textarea>
                                                    {this.validator.message("address", this.state.address, "string|required")}
                                                </div>

                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <CountryDropdown

                                                        className="registration-sell-input"
                                                        value={this.state.country}
                                                        onChange={this.selectCountry}

                                                    />
                                                    {this.validator.message("country", this.state.country, "string|required")}
                                                </div>


                                                <div className="form-group">
                                                    <RegionDropdown

                                                        blankOptionLabel="Select State"
                                                        defaultOptionLabel="Select State"
                                                        className="registration-sell-input"
                                                        country={this.state.country}
                                                        value={this.state.State}
                                                        onChange={this.selectRegion}

                                                    />
                                                    {this.validator.message("State", this.state.State, "string|required")}
                                                </div>
                                            </div>





                                        </div>


                                        <div className="form-group">
                                            <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                            {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", "required", { regex: ["^[0-9]{4}$|^[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                        </div>


                                    </fieldset>

                                    <hr className="horizontalLine-update" />
                                    <fieldset>
                                        <label>Debit Card & Credit Card</label>

                                        <div className="form-group">
                                            <input type="radio" id="DebitCard" onClick={() => this.displayContent("debitCard")} name="paymentOptions" value="debitCard" />
                                            <label htmlFor="debitCard">Debit Card</label>

                                        </div>


                                        <div id="debitCard" style={{ display: "none" }} className="cardStyle">


                                            <div className="form-group">
                                                <label htmlFor="debitCardNumber">Debit Card No. </label>
                                                <input type="text" style={{ width: "30%" }} value={this.state.debitCardNo || ""} name="debitCardNo" onChange={this.handleInputData} />
                                                {this.validator.message("debitCardNo", this.state.debitCardNo, "card_num")}

                                                <label htmlFor="dCardHolderName" style={{ marginLeft: "10px" }}>Card Holder Name: </label>
                                                <input type="text" style={{ width: "30%" }} value={this.state.dCardHolderName || ""} name="dCardHolderName" onChange={this.handleInputData} />
                                                {this.validator.message("dCardHolderName", this.state.dCardHolderName, "alpha_space")}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dCvvNo">cvv No. </label>
                                                <input type="number" style={{ width: "30%" }} value={this.state.dCvvNo || ""} name="dCvvNo" onChange={this.handleInputData} />
                                                {this.validator.message("dCvvNo", this.state.dCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}

                                                <label htmlFor="dCardExpireDate" style={{ marginLeft: "10px" }}>Card Exp. Date:</label>
                                                <input type="text" style={{ width: "30%" }} placeholder="MM/YYYY" value={this.state.dCardExpireDate || ""} name="dCardExpireDate" onChange={this.handleInputData} />
                                                {this.validator.message("dCardExpireDate", this.state.dCardExpireDate, "card_exp")}
                                            </div>



                                        </div>





                                        <div className="form-group">
                                            <input type="radio" id="CreditCard" onClick={() => this.displayContent("creditCard")} name="paymentOptions" value="creditCard" />
                                            <label htmlFor="creditCard">Credit Card</label>
                                        </div>



                                        <div id="creditCard" style={{ display: "none" }} className="cardStyle" >

                                            <div className="form-group">
                                                <label htmlFor="creditCardNumber">Credit Card No.</label>
                                                <input type="number" style={{ width: "30%" }} value={this.state.creditCardNo || ""} name="creditCardNo" onChange={this.handleInputData} />
                                                {this.validator.message("creditCardNo", this.state.creditCardNo, "card_num")}

                                                <label htmlFor="cCardHolderName" style={{ marginLeft: "10px" }}>Card Holder Name: </label>
                                                <input type="text" style={{ width: "30%" }} value={this.state.cCardHolderName || ""} name="cCardHolderName" onChange={this.handleInputData} />
                                                {this.validator.message("cCardHolderName", this.state.cCardHolderName, "alpha_space")}

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cCvvNo">cvv No.</label>
                                                <input type="number" style={{ width: "30%" }} value={this.state.cCvvNo || ""} name="cCvvNo" onChange={this.handleInputData} />
                                                {this.validator.message("cCvvNo", this.state.cCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}

                                                <label htmlFor="cCardExpireDate" style={{ marginLeft: "10px" }}>Card Exp. Date: </label>
                                                <input type="text" style={{ width: "30%" }} value={this.state.cCardExpireDate || ""} placeholder="MM/YYYY" name="cCardExpireDate" onChange={this.handleInputData} />
                                                {this.validator.message("cCardExpireDate", this.state.cCardExpireDate, "card_exp")}
                                            </div>

                                        </div>

                                    </fieldset>
                                    {this.state.debitCardNo && this.state.dCardHolderName && this.state.dCvvNo && this.state.dCardExpireDate || this.state.cCardHolderName && this.state.cCreditCardNo && this.state.cCvvNo && this.state.cCardExpireDate ?
                                        <div className="registration-sell-form" style={{ marginLeft: "35%", marginRight: "35%" }}>
                                            <button type="submit" className="registration-sell-button">Register</button>
                                        </div> :

                                        <div className="registration-sell-form" style={{ marginLeft: "35%", marginRight: "35%" }}>
                                            <button type="submit" style={{opacity:"0.2"}} disabled={true} className="registration-sell-button">Register</button>
                                        </div>}

                                    <hr className="horizontalLine" />
                                    <div className="login-bottom">
                                        <p>Already a User?  <span><Link to="/admin/login"> Sign In </Link></span> </p>
                                    </div>



                                </fieldset>

                            </form>
                        </div>
                        <p className="copyrightmark" style={{textAlign:"center"}}>© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { errormessage: state.adminRegister.error };
}
export default connect(mapStateToProps, { AdminRegistrationAction })(AdminRegistration);