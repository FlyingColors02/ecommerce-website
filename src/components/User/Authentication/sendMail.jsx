import React, { Component } from "react";
import "./sendMail.css";
import simpleReactValidator from "simple-react-validator";
import {SendMailAction} from "../../../Store/actions/User/Authentication/resetPasswordAction";
import {connect} from "react-redux";

class SendMail extends Component {
    constructor(props) {
        super(props);
        this.state={
            emailId:"",
        }
        console.log(props);
        this.validator = new simpleReactValidator({autoForceUpdate: this});
    }

    handleSubmitForm = (event) =>{
        event.preventDefault();
        if(this.validator.allValid()){
            let data = {
                emailId: this.state.emailId,
            }
            console.log(data);
            this.props.SendMailAction(data);
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
                <div className="forgetPassword">
                    <div className="container">
                        <div className="forgetPassword-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Enter Your Email Id</h2>
                                    {this.props.error ? <p className="error-message-forgetPassword">{this.props.error.message}</p> : null}
                                </div>
                                <form id="forget-Password" onSubmit={this.handleSubmitForm}>
                                    <div className="form-group">
                                        <input type="email" className="forgetPassword-input" id="inputEmail" name="emailId"
                                        placeholder="&#xf2bd;  Email Id" value={this.state.emailId} onChange={this.handleInputData} />
                                        { this.validator.message("emailId", this.state.emailId, "email|required")}
                                    </div>


                                    <button type="submit" className="forgetPassword-button">Submit</button>
                                    <p>Please <span className="turn-on">Turn On</span> "Less Secure App Access" to receive mail.</p>
                                    <hr className="horizontalLine" />

                                </form>
                                <div className="bottom-registration">
                                    <p className="bottom-text"> New To amYflip</p>
                                    <button type="button" className="registration-button">Create Your amYflip Account</button>
                                </div>
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
        sendmail: state.sendmail,
        error: state.sendmail.error
    };
}
export default connect(mapStateToProps,{ SendMailAction })(SendMail);