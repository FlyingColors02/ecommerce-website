import React, { Component } from "react";
import "./login.css";
import simpleReactValidator from "simple-react-validator";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            emailId:"",
            password:""
        }
        this.validator = new simpleReactValidator({autoForceUpdate: this});
    }

    handleSubmitForm = (event) =>{

    }
    render() {
        return (
            <React.Fragment>
                <div className="login">
                    <div class="container">
                        <div class="login-form">
                            <img src={require("../../assets/amYflipLogo.png")} />
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Login</h2>
                                </div>
                                <form id="Login" onSubmit={this.handleSubmitForm}>
                                    <div class="form-group">
                                        <input type="email" class="login-input" id="inputEmail" name="emailId" placeholder="&#xf2bd;  Email Id" />
                                    </div>

                                    <div class="form-group">
                                        <input type="password" class="login-input" id="inputPassword" placeholder="&#xf023;  Password" />
                                        { this.validator.message("emailId", this.state.emailId, "alpha|required")};
                                    </div>

                                    <div class="forgot">
                                        <a href="reset.html">Forgot password?</a>
                                    </div>

                                    <button type="submit" class="login-button">Login</button>

                                    <div class="condition">
                                        <p> By continuing, you agree to  amYflip's<span><a href="amYflip conditions"> Conditions  of  Use </a></span>and <span><a href="use and privacy">Privacy Notice</a></span>.</p>
                                    </div>
                                    <hr class="horizontalLine" />

                                </form>
                                <div class="bottom-registration">
                                    <p class="bottom-text"> New To amYflip</p>
                                    <button type="button" class="registration-button">Create Your amYflip Account</button>
                                </div>
                            </div>
                            <p class="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                        </div></div></div>

            </React.Fragment>
        )
    }
}

export default Login;