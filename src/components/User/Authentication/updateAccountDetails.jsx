import React, { Component } from "react";
import "../../Seller/Authentication/registrationSell.css";
import simpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { LoggedInAction,changeUserNameAction,userMobileNumberAction, removeCreditCardAction,removeDebitCardAction,userBankDetailsAction,userDeliveryAddressAction,userPasswordAction } from "../../../Store/actions/User/Authentication/authenticationAction";

class UpdateUserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            mobileNo: "",
            password: "",
            confirmPassword: "",
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
            deliveryAddress: {
                address: "",
                State: "",
                country: "",
                pinCodeNo: ""
            },
        }

        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount() {
        this.props.LoggedInAction();
    }

    selectCountry = (value) => {
        this.setState({country: value });
        console.log(this.state);
    }
    
    selectRegion = (value)=> {
        this.setState({State: value });
        console.log(this.state);
    }
    handleUserNameForm = (event) => {
        event.preventDefault();
        if(this.validator.fieldValid("userName")){
            let data={
                emailId:this.props.user.data.userLogin.emailId,
                userName: this.state.userName
            }
            this.props.changeUserNameAction(data);

        }
        else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleMobileNumberForm = (event) => {
        event.preventDefault();
        if(this.validator.fieldValid('mobileNo')){
            let data={
                emailId:this.props.user.data.userLogin.emailId,
                mobileNo: this.state.mobileNo
            }
            this.props.userMobileNumberAction(data);

        }
        else{
            this.validator.showMessages();
            this.forceUpdate();
            console.log("hii in mobile error");
        }
    }

    handleAddressForm = (event) => {
        event.preventDefault();
        if (this.validator.fieldValid("address")) {
            if(this.validator.fieldValid("country")){
                if(this.validator.fieldValid("State")){
                    if(this.validator.fieldValid("pinCodeNo")){
                        let data = {
                            emailId:this.props.user.data.userLogin.emailId,
                            deliveryAddress: {
                                address: this.state.address,
                                State: this.state.State,
                                country: this.state.country,
                                pinCodeNo: this.state.pinCodeNo
                            },
                        }
                        console.log(data);
                        this.props.userDeliveryAddressAction(data);
                    } else {
                        this.validator.showMessages();
                        this.forceUpdate();
                    }
                } else {
                    this.validator.showMessages();
                    this.forceUpdate();  
                }
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            }  
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handlePasswordForm = (event) => {
        event.preventDefault();
        if (this.validator.fieldValid("password")) {
            if(this.validator.fieldValid("confirmPassword")){
                let data = {
                    emailId:this.props.user.data.userLogin.emailId,
                    password:this.state.password
                }
                console.log(data);
                this.props.userPasswordAction(data);
            }else {
                this.validator.showMessages();
                this.forceUpdate();
            }
            
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    handleRemoveDebitCardForm = (event) => {
        event.preventDefault();
            let data = {
                emailId:this.props.user.data.userLogin.emailId,
            }
            console.log(data);
            this.props.removeDebitCardAction(data);
        
    }

    handleRemoveCreditCardForm = (event) => {
        event.preventDefault();
            let data = {
                emailId:this.props.user.data.userLogin.emailId,
            }
            console.log(data);
            this.props.removeCreditCardAction(data);
        
    }

    handleBankDetailsForm = (event) => {
        event.preventDefault();
        if (this.validator.fieldValid("debitCardNo","dCvvNo","dCardHolderName","dCardExpireDate","creditCardNo","cCvvNo","cCardHolderName","cCardExpireDate")) {
                console.log(this.state.bankDetails);
                    let bankDetailsData = {
                        emailId: this.props.user.data.userLogin.emailId,
                        bankDetails: {
                            debitCard: {
                                debitCardNo: this.state.debitCardNo ? this.state.debitCardNo : "",
                                cvvNo: this.state.dCvvNo ? this.state.dCvvNo : "",
                                cardHolderName: this.state.dCardHolderName ? this.state.dCardHolderName :"",
                                cardExpireDate: this.state.dCardExpireDate ? this.state.dCardExpireDate : ""
                            },
                            creditCard: {
                                creditCardNo:  this.state.creditCardNo ? this.state.creditCardNo : "",
                                cvvNo: this.state.cCvvNo ? this.state.cCvvNo: "",
                                cardHolderName:  this.state.cCardHolderName ? this.state.cCardHolderName : "",
                                cardExpireDate: this.state.cCardExpireDate? this.state.cCardExpireDate: ""
                            }
                        } 
    
                    }
                    this.props.userBankDetailsAction(bankDetailsData);
                    console.log(bankDetailsData);
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


    displayContent = (name) => {
        var x = document.getElementById(name);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    

    render() {
        if (this.props.loading) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ alignSelf: "center", marginTop: "200px" }}></i> }
        if (!this.props.user) { return null }
        return (
            <React.Fragment>
                <div className="registration-sell">
                    <div className="container">
                        <div className="registration-sell-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>USERNAME</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    <h6>{this.props.user.data.userName}<button style={{ float: "right" }} onClick={()=>this.displayContent("username")}>Edit</button></h6>
                                </div>

                                <form id="username" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleUserNameForm}>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" name="userName"
                                                    placeholder="&#xf007;  UserName" value={this.state.userName} onChange={this.handleInputData} />
                                                {this.validator.message("userName", this.state.userName, "alpha_num_dash_space|min:4|required")}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            {this.state.userName?
                                            <button type="submit" className="registration-sell-button">Update</button>
                                            :<button type="submit" disabled={true} className="registration-sell-button">Update</button>
                                            }
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>MOBILE NUMBER</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    <h6>{this.props.user.data.mobileNo}<button style={{ float: "right" }} onClick={()=>this.displayContent("mobileNo")}>Edit</button></h6>
                                </div>

                                <form id="mobileNo" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleMobileNumberForm}>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group">
                                                <PhoneInput
                                                    className="registration-sell-input"
                                                    placeholder="phone number"
                                                    defaultCountry="IN"
                                                    value={this.state.mobileNo}
                                                    onChange={this.handleOnChange}
                                                />

                                                {this.validator.message("mobileNo", this.state.mobileNo, "phone|required")}


                                            </div>
                                        </div>
                                        <div className="col-4">
                                            {this.state.mobileNo?
                                            <button type="submit" className="registration-sell-button">Update</button>
                                            :<button type="submit" disabled={true} className="registration-sell-button">Update</button>}
                                     
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>ADDRESS</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}

                                    {
                                        this.props.user.data.deliveryAddress?
                                        this.props.user.data.deliveryAddress.address ?
                                        <h6>
                                            {this.props.user.data.deliveryAddress.address},{this.props.user.data.deliveryAddress.State},{this.props.user.data.deliveryAddress.country}-{this.props.user.data.deliveryAddress.pinCodeNo}<button style={{ float: "right" }} onClick={()=>this.displayContent("address")}>Edit</button>
                                        </h6>
                                        : <button onClick={()=>this.displayContent("address")}>ADD ADDRESS</button>:null

                                    }

                                </div>

                                <form id="address" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleAddressForm}>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="form-group">
                                                <textarea cols="40" rows="2" className="registration-sell-input" id="inputaddress" name="address"
                                                    placeholder="&#xf007;  Address" value={this.state.address || ""} onChange={this.handleInputData} >  
                                                </textarea>
                                                {this.validator.message("address", this.state.address, "string|required")}
                                            </div>

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

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                    placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                                {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", "required",{ regex: ["^[0-9]{4}$|^[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                            </div>

                                        </div>
                                        <div className="col-3" style={{ float: "center", marginTop: "15%" }}>
                                           
                                           <button type="submit"  className="registration-sell-button">Update</button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>SAVED CARDS</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    {
                                        this.props.user.data.bankDetails?
                                        this.props.user.data.bankDetails.debitCard ?
                                            <div>
                                                <h6><span style={{ color: "blue" }}>Card Holder Name:</span> {this.props.user.data.bankDetails.debitCard.cardHolderName}<span style={{ marginLeft: "5%" }}><span style={{ color: "blue" }}>Card No. </span>{this.props.user.data.bankDetails.debitCard.debitCardNo}</span></h6>
                                                <h6><span style={{ color: "blue" }}>Card Expiry Date:</span>{this.props.user.data.bankDetails.debitCard.cardExpireDate}<button style={{ float: "right" }} onClick={this.handleBankDetailsForm}>Remove Card</button>
                                                    <button style={{ float: "right" }} onClick={()=>this.displayContent("bankDetails")}>Edit</button></h6>
                                            </div> : null:null
                                    }
                                    {
                                        this.props.user.data.bankDetails?
                                        <div>
                                            {this.props.user.data.bankDetails.creditCard ?
                                            <div style={{ marginTop: "7%" }}>
                                                <h6><span style={{ color: "blue" }}>Card Holder Name:</span> {this.props.user.data.bankDetails.creditCard.cardHolderName}<span style={{ marginLeft: "5%" }}><span style={{ color: "blue" }}>Card No.</span> {this.props.user.data.bankDetails.creditCard.creditCardNo}</span></h6>
                                                <h6><span style={{ color: "blue" }}>Card Expiry Date:</span>{this.props.user.data.bankDetails.creditCard.cardExpireDate}<button style={{ float: "right" }} onClick={this.handleBankDetailsForm}>Remove Card</button>
                                                    <button style={{ float: "right" }} onClick={()=>this.displayContent("bankDetails")}>Edit</button></h6>
                                            </div> : null
                                        }</div>
                                        :null


                                    }
{

                                    !this.props.user.data.bankDetails?<button onClick={()=>this.displayContent("bankDetails")}>ADD CARD</button>
                                    :
                                    !this.props.user.data.bankDetails.debitCard && !this.props.user.data.bankDetails.creditCard ?
                                    <button onClick={()=>this.displayContent("bankDetails")}>ADD CARD</button>
                                    :null}
                                    
                                    
                                </div>

                                <form id="bankDetails" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleBankDetailsForm}>
                                <div className="form-group">
                                                        <input type="radio" id="DebitCard" onClick={()=>this.displayContent("debitCard")} name="paymentOptions" value="debitCard" />
                                                        <label htmlFor="debitCard">Debit Card</label>

                                                    </div>


                                                    <div id="debitCard" style={{ display: "none" }} className="cardStyle">
                                                       
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="debitCardNumber">Debit Card No. </label>
                                                            <input type="text" style={{ width: "77%" }} value={this.state.debitCardNo || ""} name="debitCardNo" onChange={this.handleInputData} />
                                                            {this.validator.message("debitCardNo", this.state.debitCardNo, "card_num")}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="dCardHolderName">Card Holder Name: </label>
                                                            <input type="text" style={{ width: "70%" }} value={this.state.dCardHolderName || ""} name="dCardHolderName" onChange={this.handleInputData} />
                                                            {this.validator.message("dCardHolderName", this.state.dCardHolderName, "alpha_space")}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="dCvvNo">cvv No. </label>
                                                            <input type="number" style={{ width: "30%" }} value={this.state.dCvvNo || ""} name="dCvvNo" onChange={this.handleInputData} />
                                                            {this.validator.message("dCvvNo", this.state.dCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}

                                                            <label htmlFor="dCardExpireDate">Card Exp. Date:</label>
                                                            <input type="text" style={{ width: "30%" }} placeholder="MM/YYYY" value={this.state.dCardExpireDate || ""} name="dCardExpireDate" onChange={this.handleInputData} />
                                                            {this.validator.message("dCardExpireDate", this.state.dCardExpireDate, "card_exp")}
                                                        </div>

                                                        {this.state.debitCardNo && this.state.dCardHolderName && this.state.dCvvNo && this.state.dCardExpireDate ?
                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" className="registration-sell-button">ADD</button>
                                                            </div> :

                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" disabled={true} className="registration-sell-button">ADD</button>
                                                            </div>}


                                                    </div>





                                                    <div className="form-group">
                                                        <input type="radio" id="CreditCard" onClick={()=>this.displayContent("creditCard")} name="paymentOptions" value="creditCard" />
                                                        <label htmlFor="creditCard">Credit Card</label>
                                                    </div>



                                                    <div id="creditCard" style={{ display: "none" }} className="cardStyle" >

                                                        <div className="form-group">
                                                            <label htmlFor="creditCardNumber">Credit Card No.</label>
                                                            <input type="number" style={{ width: "77%" }} value={this.state.creditCardNo || ""} name="creditCardNo" onChange={this.handleInputData} />
                                                            {this.validator.message("creditCardNo", this.state.creditCardNo, "card_num")}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="cCardHolderName">Card Holder Name: </label>
                                                            <input type="text" style={{ width: "70%" }} value={this.state.cCardHolderName || ""} name="cCardHolderName" onChange={this.handleInputData} />
                                                            {this.validator.message("cCardHolderName", this.state.cCardHolderName, "alpha_space")}

                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="cCvvNo">cvv No.</label>
                                                            <input type="number" style={{ width: "30%" }} value={this.state.cCvvNo || ""} name="cCvvNo" onChange={this.handleInputData} />
                                                            {this.validator.message("cCvvNo", this.state.cCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}

                                                            <label htmlFor="cCardExpireDate">Card Exp. Date: </label>
                                                            <input type="text" style={{ width: "30%" }} value={this.state.cCardExpireDate || ""} placeholder="MM/YYYY" name="cCardExpireDate" onChange={this.handleInputData} />
                                                            {this.validator.message("cCardExpireDate", this.state.cCardExpireDate, "card_exp")}
                                                        </div>
                                                        {this.state.creditCardNo && this.state.cCardHolderName && this.state.cCvvNo && this.state.cCardExpireDate ?

                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" className="registration-sell-button">ADD</button>

                                                            </div> :
                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" disabled={true} className="registration-sell-button">ADD</button>

                                                            </div>}


                                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left", cursor:"pointer" }} onClick={()=>this.displayContent("password")}>CHANGE PASSWORD</h6>
                                    
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                   
                                </div>

                                <form id="password" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handlePasswordForm}>
                                <hr className="horizontalLine-update" />
                                    <div className="row">
                                        <div className="col-8">
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

                                        </div>
                                        <div className="col-4">
                                            {this.state.password && this.state.confirmPassword ?
                                            <button type="submit" className="registration-sell-button">Update</button>
                                            :<button type="submit" disabled={true} className="registration-sell-button">Update</button>}
                                        </div>
                                    </div>
                                </form>
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
        loading: state.loggedInUser.loading,
        errormessage: state.loggedInUser.error,
        user: state.loggedInUser.data
    };
}
export default connect(mapStateToProps, { LoggedInAction, changeUserNameAction, userMobileNumberAction,userBankDetailsAction, userDeliveryAddressAction, userPasswordAction,removeCreditCardAction,removeDebitCardAction })(UpdateUserAccount);