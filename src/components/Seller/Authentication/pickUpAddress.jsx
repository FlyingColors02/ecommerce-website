import React, { Component } from "react";
import "./pickUpAddress.css";
import simpleReactValidator from "simple-react-validator";
import { SellRegistrationAction, PickUpAddressAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import 'react-phone-number-input/style.css'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';


class SellerPickUpAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
                emailId: "",
               
                pickUpAddress: {
                    address:"",
                    State:'',
                    country:'',
                    pinCodeNo: 0
            
                }
        }
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            let SellerEmailId = JSON.parse(localStorage.getItem("sellerRegistration"))
            let data = {
                emailId: SellerEmailId.sellerLogin.emailId,
                pickUpAddress: {
                    address: this.state.address,
                    State: this.state.State,
                    country: this.state.country,
                    pinCodeNo: this.state.pinCodeNo
            
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
                                            <h2>NEED PICK UP ADDRESS</h2>
                                            {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null}
                                        </div>
                                        <form id="registration-sell" onSubmit={this.handleSubmitForm}>
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
                                                    {this.validator.message("country", this.state.country, "required")}
                                            </div>


                                            <div className="form-group">
                                            <RegionDropdown
                                                
                                                   blankOptionLabel="Select State"
                                                    defaultOptionLabel="Select State"
                                                    className="registration-sell-input"
                                                    country={this.state.country}
                                                    value={this.state.State}
                                                    onChange={ this.selectRegion} 
                                                    
                                                    />
                                                    {this.validator.message("State", this.state.State, "required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                    placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                                {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", "required", { regex: ["^[0-9]{4}|[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                            </div>


                                            <button type="submit" className="registration-sell-button">Register</button>

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
                                Your Pick Up Address will be used to take goods to amYflip Godown.
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
export default connect(mapStateToProps, { SellRegistrationAction, PickUpAddressAction })(SellerPickUpAddress);