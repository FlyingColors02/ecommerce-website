import React, { Component } from "react";
import "./bankDetails.css";
import simpleReactValidator from "simple-react-validator";
import { SellRegistrationAction, BankDetailsAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'


class SellerBankDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
                emailId: "",
               
                bankDetails: {
                    accountNo:0,
                    accountHolderName:"",
                    ifscCode: 0
                }
        }
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            let sellerEmailId= JSON.parse(localStorage.getItem("sellerRegistration"));
            console.log(sellerEmailId);
            let data = {
                emailId: sellerEmailId.sellerLogin.emailId,
                bankDetails: {
                    accountNo:this.state.accountNo,
                    accountHolderName: this.state.accountHolderName,
                    ifscCode: this.state.ifscCode
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

    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });


    }
    selectCountry = (value) => {
        
        this.setState({country: value });
        console.log(this.state);
    }
    
    selectRegion = (value)=> {
        this.setState({State: value });
        console.log(this.state);
    }

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
                                            <h2>NEED BANK DETAILS</h2>
                                            {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                        </div>
                                        <form id="registration-sell" onSubmit={this.handleSubmitForm}>
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

                                            <button type="submit" className="registration-sell-button">Submit</button>

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
                                Your bank details will be used to credit your products amounts with respect to quantity to your account.
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
export default connect(mapStateToProps, { SellRegistrationAction, BankDetailsAction })(SellerBankDetails);