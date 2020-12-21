import React from "react";
import "./mailSendMessage.css";

const MailSend=()=>{
return(
    <React.Fragment>
        <div className="mailsend">
        <div className="container">
            <div className="mailsend-conatiner">
            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                <div className="content-mailsend">
                
                <br/>
                <p className="content">A mail is send to your EmailId.
                    
                    <br/><br/>Reset Your Password Using the Link Provided in the mail.</p>
                </div>
                <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
            </div>
        </div>
        </div>
        
    </React.Fragment>
)
}

export default MailSend;