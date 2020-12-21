import React, { Component } from "react";
import "./registrationSell.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { SellLoggedInAction, ChangeMobileNumberAction, ChangePasswordAction, ChangeUserNameAction, PickUpAddressAction, BankDetailsAction} from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';

class UpdateSellerAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            mobileNo: "",
            password: "",
            confirmPassword: "",
            bankDetails: {
                accountNo: "",
                accountHolderName: "",
                ifscCode: ""
            },
            pickUpAddress: {
                address: "",
                State: "",
                country: "",
                pinCodeNo: ""
            },
        }

        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount() {
        this.props.SellLoggedInAction();
    }

    handleUserNameForm = (event) => {
        event.preventDefault();

        if (this.validator.fieldValid("userName")) {
            let data = {
                emailId:this.props.seller.data.sellerLogin.emailId,
                userName: this.state.userName
            }
            console.log(data);
            this.props.ChangeUserNameAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleMobileNumberForm = (event) => {
        event.preventDefault();

        if (this.validator.fieldValid("mobileNo")) {
            let data = {
                emailId:this.props.seller.data.sellerLogin.emailId,
                mobileNo:this.state.mobileNo
            }
            console.log(data);
            this.props.ChangeMobileNumberAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleAddressForm = (event) => {
        event.preventDefault();

        if (this.validator.fieldValid("address","State","country","pinCodeNo")) {
            let data = {
                emailId:this.props.seller.data.sellerLogin.emailId,
                pickUpAddress:{
                    address:this.state.address,
                    State:this.state.State,
                    country:this.state.country,
                    pinCodeNo:this.state.pinCodeNo
                }
            }
            console.log(data);
            this.props.PickUpAddressAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleBankDetailsForm = (event) => {
        event.preventDefault();

        if (this.validator.fieldValid("accountNo","accountHolderName","ifscCode")) {
            let data = {
                            emailId:this.props.seller.data.sellerLogin.emailId,
                           bankDetails:{
                               accountNo:this.state.accountNo,
                               accountHolderName:this.state.accountHolderName,
                               ifscCode:this.state.ifscCode
                           }
                        }
                        console.log(data);
                        this.props.BankDetailsAction(data);
            
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handlePasswordForm = (event) => {
        event.preventDefault();

        if (this.validator.fieldValid("password","confirmPassword")) {
            let data = {
                emailId:this.props.seller.data.sellerLogin.emailId,
                password:this.state.password
            }
            console.log(data);
            this.props.ChangePasswordAction(data);
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

    selectCountry = (value) => {
        this.setState({country: value });
        console.log(this.state);
    }
    
    selectRegion = (value)=> {
        this.setState({State: value });
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
        if (this.props.loading) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ alignSelf: "center", marginTop: "200px" }}></i> }
        if (!this.props.seller) { return null }
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
                                    <h6>{this.props.seller.data.userName}<button style={{ float: "right" }} onClick={()=>this.displayContent("username")}>Edit</button></h6>
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
                                            <button type="submit" className="registration-sell-button">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>MOBILE NUMBER</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    <h6>{this.props.seller.data.mobileNo}<button style={{ float: "right" }} onClick={()=>this.displayContent("mobileNo")}>Edit</button></h6>
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

                                                {this.validator.message("mobileNo", this.state.mobileNo, "required|phone")}


                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" className="registration-sell-button">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>ADDRESS</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    <h6>{this.props.seller.data.pickUpAddress.address},{this.props.seller.data.pickUpAddress.State}
                                    ,{this.props.seller.data.pickUpAddress.country}-{this.props.seller.data.pickUpAddress.pinCodeNo}
                                    <button style={{ float: "right" }} onClick={()=>this.displayContent("address")}>Edit</button></h6>
                                </div>

                                <form id="address" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleAddressForm}>
                                    <div className="row">
                                        <div className="col-8">
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
                                                {this.validator.message("country",this.state.country,"required")}
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
                                                {this.validator.message("State",this.state.State,"required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                    placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                                {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", "required", { regex: ["^[0-9]{4}|[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="registration-sell-button">Update</button>
                                    </div>
                                </form>
                            </div>

                            <div className="main-div registration-sell">
                                <div className="panel">
                                    <h6 style={{ textAlign: "left" }}>ACCOUNT DETAILS</h6>
                                    <hr className="horizontalLine-update" />
                                    {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                    {this.props.seller.data.bankDetails? 
                                        <div><h6>Account Holder Name: {this.props.seller.data.bankDetails.accountHolderName}</h6>
                                        <h6>Account Number: {this.props.seller.data.bankDetails.accountNo}</h6>
                                        <h6>IFSC Code:{this.props.seller.data.bankDetails.ifscCode}<button style={{ float: "right" }} onClick={()=>this.displayContent("bankDetails")}>Edit</button></h6>
                                    </div>
                                    :<button onClick={()=>this.displayContent("bankDetails")}>ADD BANK DETAILS</button> }
                                    </div>

                                <form id="bankDetails" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleBankDetailsForm}>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="form-group">
                                                
                                            <input type="number" className="registration-sell-input" id="inputaccountNo" name="accountNo"
                                                    placeholder="&#xf007;  Account No." value={this.state.accountNo || ""} onChange={this.handleInputData} />
                                                {this.validator.message("accountNo", this.state.accountNo, ["numeric","required", {regex: ["^[0-9]{16}$"]}], {messages:{regex: "Invalid Account Number."}})}
                                                
                                            </div>

                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" id="inputaccountHolderName" name="accountHolderName"
                                                    placeholder="&#xf023;  Account Holder Name" value={this.state.accountHolderName || ""} onChange={this.handleInputData} />
                                                {this.validator.message("accountHolderName", this.state.accountHolderName, "alpha_space|required",)}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputifscCode" name="ifscCode"
                                                    placeholder="&#xf023;  IFSC Code" value={this.state.ifscCode || ""} onChange={this.handleInputData} />
                                                {this.validator.message("accountHolderName", this.state.ifscCode,  ["numeric", "required", { regex: ["^[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                     
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" className="registration-sell-button">Update</button>
                                        </div>
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
        loading: state.loggedInSeller.loading,
        errormessage: state.sellerRegister.error,
        seller: state.loggedInSeller.data
    };
}
export default connect(mapStateToProps, { SellLoggedInAction, ChangeMobileNumberAction,ChangePasswordAction,ChangeUserNameAction,PickUpAddressAction,BankDetailsAction })(UpdateSellerAccount);