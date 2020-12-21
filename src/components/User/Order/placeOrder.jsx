import React, { Component } from "react";
import "../../Seller/Product/addProduct.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UpdateProductAction } from "../../../Store/actions/Seller/Product/productAction";
import { productDetailsAction } from "../../../Store/actions/User/Products/productsAction";
import { LoggedInAction, LogoutAction, userBankDetailsAction, userDeliveryAddressAction } from "../../../Store/actions/User/Authentication/authenticationAction";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { PlaceOrderAction } from "../../../Store/actions/User/Order/orderAction";
import { RemoveCartDataAction } from "../../../Store/actions/User/Cart/cartAction";
import { FetchMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";
const luhnCheck = num => {
    let arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    return sum % 10 === 0;
  };
class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEnterCvvNo:null,
            deliveryDate: new Date(new Date().setDate(new Date().getDate() + 2)).toDateString(),
            deliveryAddress: {
                address:  this.props.user.deliveryAddress ? this.props.user.deliveryAddress.address:"",
                State: this.props.user.deliveryAddress ? this.props.user.deliveryAddress.State:"",
                country: this.props.user.deliveryAddress ? this.props.user.deliveryAddress.country:"",
                pinCodeNo:  this.props.user.deliveryAddress ? this.props.user.deliveryAddress.pinCodeNo:"",
            },
            bankDetails: {
                debitCard: {
                    debitCardNo: this.props.user.bankDetails ? this.props.user.bankDetails.debitCard ? this.props.user.bankDetails.debitCard.debitCardNo : "":"",
                    dCvvNo: this.props.user.bankDetails ? this.props.user.bankDetails.debitCard ? this.props.user.bankDetails.debitCard.cvvNo : 0 : 0,
                    dCardHolderName: this.props.user.bankDetails ? this.props.user.bankDetails.debitCard ? this.props.user.bankDetails.debitCard.cardHolderName : "": "",
                    dCardExpireDate: this.props.user.bankDetails ? this.props.user.bankDetails.debitCard? this.props.user.bankDetails.debitCard.cardExpireDate : "": ""
                },
                creditCard: {
                    creditCardNo: this.props.user.bankDetails ? this.props.user.bankDetails.creditCard? this.props.user.bankDetails.creditCard.creditCardNo : "":"",
                    cCvvNo: this.props.user.bankDetails ? this.props.user.bankDetails.creditCard? this.props.user.bankDetails.creditCard.cvvNo : 0:0,
                    cCardHolderName: this.props.user.bankDetails ? this.props.user.bankDetails.creditCard? this.props.user.bankDetails.creditCard.cardHolderName : "": "",
                    cCardExpireDate: this.props.user.bankDetails ? this.props.user.bankDetails.creditCard? this.props.user.bankDetails.creditCard.cardExpireDate : "": ""
                }
            }
        }
        console.log(this.state);
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.productDetailsAction(this.props.match.params.id);
        this.props.LoggedInAction();
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            if (!this.props.error) {

               const handleDeliveryAddress = ()=>{

                    if(!this.props.loggedInUser.data.deliveryAddress){
                        console.log("set address");
                        return({
                            
                                address: this.state.address,
                                State: this.state.State,
                                country: this.state.country,
                                pinCodeNo: this.state.pinCodeNo
                         
        
                        })
                        
                       
                    }
                    else{
                        return({
                           
                                address: this.props.loggedInUser.data.deliveryAddress.address,
                                State: this.props.loggedInUser.data.deliveryAddress.State,
                                country: this.props.loggedInUser.data.deliveryAddress.country,
                                pinCodeNo: this.props.loggedInUser.data.deliveryAddress.pinCodeNo
                           
                        })
                    }
                }

            
                if(!this.state.userEnterCvvNo){
                    let bankDetailsData = {
                        emailId: this.props.loggedInUser.data.userLogin.emailId,
                        bankDetails: {
                            debitCard: {
                                debitCardNo: this.state.debitCardNo ? this.state.debitCardNo : this.state.bankDetails.debitCard.debitCardNo,
                                cvvNo: this.state.dCvvNo ? this.state.dCvvNo : this.state.bankDetails.debitCard.dCvvNo,
                                cardHolderName: this.state.dCardHolderName ? this.state.dCardHolderName : this.state.bankDetails.debitCard.dCardHolderName,
                                cardExpireDate: this.state.dCardExpireDate ? this.state.dCardExpireDate : this.state.bankDetails.debitCard.dCardExpireDate
                            },
                            creditCard: {
                                creditCardNo:  this.state.creditCardNo ? this.state.creditCardNo : this.state.bankDetails.creditCard.creditCardNo,
                                cvvNo: this.state.cCvvNo ? this.state.cCvvNo: this.state.bankDetails.creditCard.cCvvNo,
                                cardHolderName:  this.state.cCardHolderName ? this.state.cCardHolderName : this.state.bankDetails.creditCard.cCardHolderName,
                                cardExpireDate: this.state.cCardExpireDate? this.state.cCardExpireDate: this.state.bankDetails.creditCard.cCardExpireDate
                            }
                        } 
    
                    }
                    this.props.userBankDetailsAction(bankDetailsData);
                    console.log(bankDetailsData);
                }
                

                if(!this.props.loggedInUser.data.deliveryAddress){
                    console.log("no delivery address");
                    let deliveryAddressData = {
                        emailId: this.props.loggedInUser.data.userLogin.emailId,
                        deliveryAddress: {
                            address: this.state.address,
                            State: this.state.State,
                            country: this.state.country,
                            pinCodeNo: this.state.pinCodeNo
                        }
    
                    }
    
                    console.log(deliveryAddressData);
                    this.props.userDeliveryAddressAction(deliveryAddressData);
    
                }
                
                if (this.props.productDetails.data === 0) {
                    console.log("in cart",this.state);
                    if (this.props.Cart.length > 0) {
                        console.log(this.state);

                        this.props.Cart.map(data => {
                            let orderItem = {
                                _id: data._id,
                                brandName: data.cartItem.brandName,
                                quantity: data.cartItem.quantity,
                                image: data.cartItem.image,
                                price: data.cartItem.price,
                                productName: data.cartItem.productName,
                                totalPrice: (data.cartItem.price * data.cartItem.quantity) + data.cartItem.shippingCharges,
                                shippingCharges: data.cartItem.shippingCharges,
                                deliveryDate: this.state.deliveryDate
                            }
                            console.log(orderItem._id);

                            let cartData = {

                                orderItem: orderItem,
                                userDetails: {
                                    userName: this.props.loggedInUser.data.userName,
                                    mobileNo: this.props.loggedInUser.data.mobileNo,
                                    userEmailId: this.props.loggedInUser.data.userLogin.emailId,
                                    deliveryAddress: handleDeliveryAddress()

                                },
                                emailId: data.cartItem.sellerEmailId,
                                shipped: false,
                                cancelled: false,
                                payedSeller: false,
                                refundedUser: false
                            }
                            console.log(cartData);

                            this.props.PlaceOrderAction(cartData);

                            this.props.RemoveCartDataAction(orderItem._id)
                        })
                    }
                }
                
                else {
                    console.log(this.state);
                   
                        let data = {
                            emailId: this.props.productDetails.data.sellerDetails.emailId,
                            shipped: false,
                            cancelled:false,
                            payedSeller:false,
                            refundedUser:false,
                            orderItem: {
                                _id: this.props.productDetails.data._id,
                                brandName: this.props.productDetails.data.brandName,
                                quantity: 1,
                                shippingCharges: this.props.productDetails.data.shippingCharges,
                                image: this.props.productDetails.data.image,
                                price: this.props.productDetails.data.offerPrice,
                                productName: this.props.productDetails.data.productName,
                                totalPrice: this.props.productDetails.data.offerPrice + this.props.productDetails.data.shippingCharges,
                                deliveryDate: this.state.deliveryDate
                            },
                            userDetails: {
                                userName: this.props.loggedInUser.data.userName,
                                mobileNo: this.props.loggedInUser.data.mobileNo,
                                userEmailId: this.props.loggedInUser.data.userLogin.emailId,
                                deliveryAddress: handleDeliveryAddress(),
                            }
                        }
                        console.log(data);
                        this.props.PlaceOrderAction(data);
                    
                   
                }
            }
            else {
                this.props.history.push("/login");
            }

        }
        else {
            console.log("in validator error");
            this.validator.showMessages();
            console.log("after show message");
            this.forceUpdate();
        }





    }

    verifyDebitCvv = (event) =>{
        console.log(this.state.userEnterCvvNo,this.state.bankDetails.debitCard.dCvvNo);
        if(parseInt(this.state.userEnterCvvNo) === this.state.bankDetails.debitCard.dCvvNo){
            this.handleSubmitForm(event);
        }
        else{
            alert("Invalid CVV Number !!");
        }
    }
    verifyCreditCvv = (event) =>{
        console.log(this.state.userEnterCvvNo,this.state.bankDetails.creditCard.cCvvNo);
        if(parseInt(this.state.userEnterCvvNo) === this.state.bankDetails.creditCard.cCvvNo){
            this.handleSubmitForm(event);
        }
        else{
            alert("Invalid CVV Number !!");
        }
    }
    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

    }
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
        if (this.props.productDetailsLoading) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="spinner" style={{ marginLeft: "50%", marginTop: "200px" }}></i> }
        if (!this.props.loggedInUser) { return null }
        if (!this.props.productDetails) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="spinner" style={{ marginLeft: "50%", marginTop: "200px" }}></i> }
        if (this.props.cartLoading) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="spinner" style={{ marginLeft: "50%", marginTop: "200px" }}></i> }
        
        return (
            <React.Fragment>
                <div className="registration-sell">
                    <div className="row row-cols-1">
                        <div className="col-md-8">
                            <div className="col-md-12">
                                <div className="container">
                                    <div className="registration-sell-form">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h5 onClick={()=>this.displayContent("login")} style={{ textAlign: "left", color: "grey", cursor: "pointer" }}>Login :<span style={{ color: "green" }}> &#xf00c;</span></h5>
                                            </div>
                                            <div id="login" style={{ display: "none" }}>
                                                <div className="row">
                                                    <div className="col-md-7">
                                                        <div className="form-group">
                                                            <h6 className="left">Name: <span style={{ font: "18px" }}>{this.props.loggedInUser.data.userName}</span></h6>
                                                            <h6 className="left">emailId: <span style={{ font: "18px" }}>{this.props.loggedInUser.data.userLogin.emailId}</span></h6>


                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button type="button" className="placeOrder-button" onClick={this.props.LogoutAction}>CHANGE</button>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <h6 style={{ color: "#007bff" }}>LogOut & Sign In with Other Account</h6>
                                                        <div className="registration-sell-form" style={{ marginLeft: "100px", marginRight: "100px" }}>
                                                            <button type="button" onClick={this.displayDeliveryAddress} className="registration-sell-button">CONTINUE SHOPPING</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div></div>

                            </div>
                            <div className="col-md-12">
                                <div className="container">
                                    <div className="registration-sell-form">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h5 onClick={()=>this.displayContent("deliveryAddress")} style={{ textAlign: "left", color: "grey", cursor: "pointer" }}>Delivery Address :<span style={{ color: "green" }}></span></h5>
                                            </div>
                                            <div id="deliveryAddress">
                                                <form id="registration-sell" onSubmit={this.handleSubmitForm}>

                                                    <div className="form-group">
                                                        {this.props.loggedInUser.data.deliveryAddress ?
                                                            <div id="oldAddress">
                                                                <div className="row">
                                                                    <div className="col-md-12">

                                                                        <p className="deliveryAddress">
                                                                            {this.props.loggedInUser.data.deliveryAddress.address}, {this.props.loggedInUser.data.deliveryAddress.State}, {this.props.loggedInUser.data.deliveryAddress.country}- {this.props.loggedInUser.data.deliveryAddress.pinCodeNo}
                                                                        </p> </div>
                                                                    {/* <div className="col-md-4">
                                                                        <button type="button" className="placeOrder-button" onClick={this.displayOldAddressBlock && this.displayNewAddressBlock}>CHANGE</button>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                            :
                                                            <div>



                                                                <div className="form-group">
                                                                    <textarea cols="40" rows="2" className="registration-sell-input" id="inputaddress" name="address"
                                                                        placeholder="&#xf007;  Address" value={this.state.address || ""} onChange={this.handleInputData} >
                                                                        {this.validator.message("address", this.state.address, "string|required")}
                                                                    </textarea>
                                                                </div>

                                                                <div className="form-group">
                                                                    <CountryDropdown

                                                                        className="registration-sell-input"
                                                                        value={this.state.country}
                                                                        onChange={this.selectCountry}

                                                                    />
                                                                    {this.validator.message("country", this.state.country, "required|alpha")}

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
                                                                    {this.validator.message("State", this.state.State, "required|alpha")}
                                                                </div>

                                                                <div className="form-group">
                                                                    <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                                        placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                                                    {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", "required", { regex: ["^[0-9]{4}$|^[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                                                </div>


                                                                {/* <button type="" className="registration-sell-button">Register</button>
  */}

                                                            </div>}
                                                        {/* <div id="newAddress" style={{ display: "none" }}>




                                                            <div className="form-group">
                                                                <textarea cols="40" rows="2" className="registration-sell-input" id="inputaddress" name="address"
                                                                    placeholder="&#xf007;  Address" value={this.state.address || ""} onChange={this.handleInputData} >
                                                                    {this.validator.message("address", this.state.address, "string")}
                                                                </textarea>
                                                            </div>

                                                            <div className="form-group">
                                                                <CountryDropdown

                                                                    className="registration-sell-input"
                                                                    value={this.state.country}
                                                                    onChange={this.selectCountry}

                                                                />
                                                                {this.validator.message("country", this.state.country, "alpha")}

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
                                                                {this.validator.message("State", this.state.State, "alpha")}
                                                            </div>

                                                            <div className="form-group">
                                                                <input type="number" className="registration-sell-input" id="inputPincode" name="pinCodeNo"
                                                                    placeholder="&#xf023;  Pincode" value={this.state.pinCodeNo || ""} onChange={this.handleInputData} />
                                                                {this.validator.message("pinCodeNo", this.state.pinCodeNo, ["numeric", { regex: ["^[0-9]{4}$|^[0-9]{6}$"] }], { messages: { regex: "Invalid pincode !!" } })}
                                                            </div>


                                                            <button type="button" className="registration-sell-button" onClick={this.displayOrderSummary}>Register</button>


                                                        </div> */}


                                                        {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                                    </div>
                                                </form>
                                            </div>




                                        </div>

                                    </div></div>
                            </div>
                            <div className="col-md-12">
                                <div className="container">
                                    <div className="registration-sell-form">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h5 onClick={()=>this.displayContent("orderSummary")} style={{ textAlign: "left", color: "grey", cursor: "pointer" }}>Order Summary :</h5>
                                            </div>
                                            <div id="orderSummary" style={{ display: "none" }}>


                                                {
                                                    this.props.productDetails.data === 0 ?

                                                        this.props.Cart.map(data => (
                                                            <table style={{ marginTop: "25px" }} key={data._id}>
                                                                <tbody>
                                                                    <tr >
                                                                        <td data-th="Product" >
                                                                            <div className="row">
                                                                                <div className="col-sm-2 col-md-2 hidden-xs" ><img src={data.cartItem.image} alt={data.cartItem.brandName} className="img-responsive" /></div>
                                                                                <div className="col-sm-4 col-md-6" style={{ marginLeft: "70px" }}>
                                                                                    <h6 className="product-name">{data.cartItem.brandName} {data.cartItem.productName}</h6>
                                                                                    <p className="instock">{data.cartItem.stock > 0 ? "In Stock" : "Out Of Stock"}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td data-th="Quantity">

                                                                            Quantity: {data.cartItem.quantity}


                                                                        </td>
                                                                        <td style={{ float: "left", color: "grey" }}>Delivered By {this.state.deliveryDate}</td>
                                                                        {
                                                                            data.cartItem.shippingCharges ?
                                                                                <td data-th="Subtotal" className="text-center">₹ {(data.cartItem.price * data.cartItem.quantity) + data.cartItem.shippingCharges}</td> :
                                                                                <td data-th="Subtotal" className="text-center">₹ {data.cartItem.price * data.cartItem.quantity}</td>
                                                                        }


                                                                    </tr>
                                                                </tbody>

                                                            </table>

                                                        )
                                                        ) :
                                                        <table style={{ marginTop: "25px" }}>
                                                            <tbody>
                                                                <tr key={this.props.productDetails.data._id} >
                                                                    <td data-th="Product" >
                                                                        <div className="row">
                                                                            <div className="col-sm-2 col-md-2 hidden-xs" ><img src={this.props.productDetails.data.image} alt={this.props.productDetails.data.brandName} className="img-responsive" /></div>
                                                                            <div className="col-sm-4 col-md-6" style={{ marginLeft: "70px" }}>
                                                                                <h6 className="product-name">{this.props.productDetails.data.brandName} {this.props.productDetails.data.productName}</h6>
                                                                                <p className="instock">{this.props.productDetails.data.stock > 0 ? "In Stock" : "Out Of Stock"}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td data-th="Quantity">

                                                                        {this.props.productDetails.data.quantity}


                                                                    </td>
                                                                    <td style={{ float: "left", color: "grey" }}>Delivered By {this.state.deliveryDate}</td>
                                                                    {
                                                                        this.props.productDetails.data.quantity ? (
                                                                            this.props.productDetails.data.offerPrice >= 500 ?
                                                                                <td data-th="Subtotal" className="text-center">₹ {this.props.productDetails.data.offerPrice * this.props.productDetails.data.quantity}</td> :
                                                                                <td data-th="Subtotal" className="text-center">₹ {(this.props.productDetails.data.offerPrice * this.props.productDetails.data.quantity) + this.props.productDetails.data.shippingCharges}</td>)
                                                                            : (this.props.productDetails.data.offerPrice >= 500 ?
                                                                                <td data-th="Subtotal" className="text-center">₹ {this.props.productDetails.data.offerPrice * 1}</td> :
                                                                                <td data-th="Subtotal" className="text-center">₹ {this.props.productDetails.data.offerPrice * 1 + this.props.productDetails.data.shippingCharges}</td>)
                                                                    }


                                                                </tr>
                                                            </tbody>

                                                        </table>

                                                }
                                                {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}




                                            </div>

                                        </div>

                                    </div></div>
                            </div>
                            <div className="col-md-12">
                                <div className="container">
                                    <div className="registration-sell-form">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h5 onClick={()=>this.displayContent("paymentOptions")} style={{ textAlign: "left", color: "grey", cursor: "pointer" }}>Payment Options :<span style={{ color: "green" }}></span></h5>
                                            </div>
                                            <div id="paymentOptions" style={{ textAlign: "left", display: "none" }}>

                                                <form id="registration-sell" onSubmit={this.handleSubmitForm}>
                                                { 
                                                            this.state.bankDetails.debitCard.debitCardNo ?
                                                            <div className="form-group">
                                                        <input type="radio" id="userDebitCard" name="paymentOptions" value="debitCard" onChange={()=>this.displayContent("userDebitDetails")}/>
                                                        <label htmlFor="cardHolderName"> Card Holder Name: <span ><i>{this.state.bankDetails.debitCard.dCardHolderName}</i></span> </label>
                                                        <div id="userDebitDetails" style={{display: "none"}} className="cardStyle">
                                                        <div>Card No: {this.state.bankDetails.debitCard.debitCardNo}
                                                        <span style={{float:"right"}}>Expiry Date: {this.state.bankDetails.debitCard.dCardExpireDate}</span></div>
                                                        Enter cvv No.<input type="number" style={{ width: "30%" }} value={this.state.userEnterCvvNo || ""} name="userEnterCvvNo" onChange={this.handleInputData} />
                                                            {this.validator.message("userEnterCvvNo", this.state.userEnterCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}
                                                            <button type="button" className="btn btn-outline-success" style={{float:"right"}} onClick={this.verifyDebitCvv}>verify & Pay</button>
                                                        </div>
                                                       
                                                        </div>
                                                       

                                                    :null

                                                        }

{ 
                                                            this.state.bankDetails.creditCard.creditCardNo ?
                                                            <div className="form-group">
                                                        <input type="radio" id="userCreditCard" name="paymentOptions" value="creditCard" onChange={()=>this.displayContent("userCreditDetails")}/>
                                                        <label htmlFor="cardHolderName"> Card Holder Name: <span ><i>{this.state.bankDetails.creditCard.cCardHolderName}</i></span> </label>
                                                        <div id="userCreditDetails" style={{display: "none"}} className="cardStyle">
                                                        <div>Card No: {this.state.bankDetails.creditCard.creditCardNo}
                                                        <span style={{float:"right"}}>Expiry Date: {this.state.bankDetails.creditCard.cCardExpireDate}</span></div>
                                                        Enter cvv No.<input type="number" style={{ width: "30%" }} value={this.state.userEnterCvvNo || ""} name="userEnterCvvNo" onChange={this.handleInputData} />
                                                            {this.validator.message("userEnterCvvNo", this.state.userEnterCvvNo, ["numeric", { regex: ["^[0-9]{3}$"] }], { messages: { regex: "Invalid CVV Number !!" } })}
                                                            <button type="button" className="btn btn-outline-success" style={{float:"right"}} onClick={this.verifyCreditCvv}>verify & Pay</button>
                                                        </div>
                                                       
                                                        </div>
                                                       

                                                    :null

                                                        }
                                                    <div className="form-group">
                                                        <input type="radio" id="DebitCard" onClick={()=>this.displayContent("debitCard")} name="paymentOptions" value="debitCard" />
                                                        <label htmlFor="debitCard">Debit Card</label>

                                                    </div>


                                                    <div id="debitCard" style={{ display: "none" }} className="cardStyle">
                                                       
                                                        
                                                        <div className="form-group">
                                                            <label htmlFor="debitCardNumber">Debit Card No. </label>
                                                            <input type="text" style={{ width: "77%" }} value={this.state.debitCardNo || ""} name="debitCardNo" onChange={this.handleInputData} />
                                                            {luhnCheck(this.state.debitCardNo) === false ? <p style={{color:"red"}}>Invalid Debit card !!</p>:null}
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

                                                        {luhnCheck(this.state.debitCardNo)===true && this.state.dCardHolderName && this.state.dCvvNo && this.state.dCardExpireDate ?
                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" className="registration-sell-button">PAY</button>
                                                            </div> :

                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" style={{opacity:"0.3"}} disabled={true} className="registration-sell-button">PAY</button>
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
                                                           {luhnCheck(this.state.creditCardNo)===false ? <p style={{color:"red"}}>Invalid Credit Card!!</p>:null}
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
                                                        {luhnCheck(this.state.creditCardNo)===true && this.state.cCardHolderName && this.state.cCvvNo && this.state.cCardExpireDate ?

                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" className="registration-sell-button">PAY</button>

                                                            </div> :
                                                            <div className="registration-sell-form" style={{ marginLeft: "180px", marginRight: "180px" }}>
                                                                <button type="submit" style={{opacity:"0.3"}} disabled={true} className="registration-sell-button">PAY</button>

                                                            </div>}


                                                    </div>

                                                </form>
                                            </div>


                                        </div>

                                    </div></div>
                            </div>
                        </div>
                        <div className="col-md-3">

                            <table className="table  table-condensed" style={{ background: "white", fontSize: "18px", textAlign: "left", marginLeft: "-100px", marginTop: "-20px" }}>
                                <thead>
                                    <tr>
                                        <th style={{ color: "grey" }}>Price Details</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {this.props.productDetails.data === 0 ?
                                        this.props.Cart.length > 0 ?
                                            <tr>
                                                <td >
                                                    <div className="row">
                                                        <div className="col-9">
                                                            Price({this.props.Cart.length} items)
                                        </div>

                                                        <div className="col-2">
                                                            ₹ {this.props.price}
                                                        </div>

                                                        <div className="col-9">
                                                            Delivery Charges
                                    </div>
                                                        <div className="col-2">
                                                            ₹ {this.props.deliveryChargesTotal ? this.props.deliveryChargesTotal : <div className="instock">FREE</div>}

                                                        </div>
                                                    </div>
                                                </td>

                                            </tr> : null :
                                        <tr>
                                            <td >
                                                <div className="row">
                                                    <div className="col-9">
                                                        Price
                                    </div>

                                                    <div className="col-2">
                                                        ₹ {this.props.productDetails.data.offerPrice}
                                                    </div>

                                                    <div className="col-9">
                                                        Delivery Charges
                                </div>
                                                    <div className="col-2">
                                                        ₹ {this.props.productDetails.data.shippingCharges ? this.props.productDetails.data.shippingCharges : <div className="instock">FREE</div>}

                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    <tr>
                                        <td>
                                            <div className="row">
                                                <div className="col-9">
                                                    Total
                                               </div>
                                               ₹ {
                                                    this.props.productDetails.data === 0 ? this.props.total : this.props.productDetails.data.offerPrice + this.props.productDetails.data.shippingCharges
                                                }

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>

                    <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log(state);

    const user = ownProps.location.state;

    return {
        user: user,
        loggedInUser: state.loggedInUser.data,
        productDetails: state.productDetails.data,
        Cart: state.Cart.data,
        productDetailsLoading: state.productDetails.loading,
        cartLoading: state.Cart.loading,
        error: state.loggedInUser.error,
        price: state.Cart.data ? state.Cart.data.reduce((accumlator, nextValue) => (
            accumlator + nextValue.cartItem.price * nextValue.cartItem.quantity
        ), 0) : null,
        deliveryChargesTotal: state.Cart.data ? state.Cart.data.reduce((accumlator, nextValue) => (
            accumlator + nextValue.cartItem.shippingCharges * 1
        ), 0) : null,
        total: state.Cart.data ? state.Cart.data.reduce((accumlator, nextValue) => (
            accumlator + nextValue.cartItem.price * nextValue.cartItem.quantity + nextValue.cartItem.shippingCharges
        ), 0) : null
    };
}

export default connect(mapStateToProps, {
    UpdateProductAction, productDetailsAction,
    LoggedInAction, LogoutAction, FetchMainCategoryAction, userBankDetailsAction, userDeliveryAddressAction,
    PlaceOrderAction, RemoveCartDataAction
})(PlaceOrder);