import React, { Component } from "react";
import "./sellerMainPage.css";
import { Link } from "react-router-dom";
class SellMainPage extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="main-container">
                    <div className="sell-product-content">
                        <div className="start-selling-div">
                            <h4 className="title-start-selling">
                                " amYflip can make Your business grow 10 times faster. "
                            </h4>
                            <button type="button" className="start-selling-button"><Link to="/seller/registration"className="registration-sell-button-text">Start Selling</Link></button>
                            <p>It only takes 15 minutes to setup your account</p>
                        </div>
                        <div className="login-sell-div">
                            <span className="login-sell-text">Already Seller? </span>
                            <button type="button" className="login-sell-button"><Link to="/seller/login"className="login-sell-button-text">Login For Existing Seller</Link></button>
                        </div>
                    </div>
                <div className="why-sell-on-amYflip">
                    <h2 className="text-why-amYflip">WHY SELL WITH amYflip?</h2>
                    <div className="content-why-sell">
                        <div className="row">
                            <div className="col-md-3">
                                    <img className="why-sell-image" src={require("../../../assets/shopping-5217035_1280.png")}/>
                                    <h3>Ease Of Work</h3>
                                    <p>You just need one product and 2 documents to start selling on amYflip</p>
                            </div>
                            <div className="col-md-3">  
                                    <img className="why-sell-image" src={require("../../../assets/magnifying-glass-1019982_1920.jpg")}/>              
                                    <h3>Transparency</h3>
                                    <p>Equal opportunities for all the sellers to grow</p>   
                            </div>
                            <div className="col-md-3">
                                    <img className="why-sell-image" src={require("../../../assets/people-4937226_1920.jpg")}/>    
                                    <h3>Reach Crores Of Customers</h3>
                                    <p>Sell to crores of engaged customer visiting the site</p>    
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                    <img className="why-sell-image" src={require("../../../assets/money-2724235_1920.jpg")}/>
                                    <h3>Receive Timely Payments</h3>
                                    <p>Amazon ensures your payments are deposited directly in your bank account within 14 days.</p>
                            </div>
                            <div className="col-md-5">
                                    <img className="why-sell-image" src={require("../../../assets/piggy-3610444_1920.jpg")}/>
                                    <h3>Lowest Cost Of Doing Business</h3>
                                    <p>Along with the most competitive rate card in the industry you do not need to spend on shop</p>    
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="start-selling-button"><Link to="/seller/registration" className="registration-sell-button-text">Start Selling</Link></button>
                <p>It only takes 15 minutes to setup your account</p>
                </div>
            </React.Fragment>
        )
    }
}
export default SellMainPage;