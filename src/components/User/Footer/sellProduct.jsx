import React,{ Component } from "react";
import "./sellProduct.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SellLoggedInAction} from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";

class  SellProductLinkFooter extends Component {
    componentDidMount(){
        this.props.SellLoggedInAction();

    }
    render(){
    return(
        <React.Fragment>
            <footer className="footer-amYflip bg-primary">
                <div className="row footer-row">
                <button type="button" className="btn primary">
                    {this.props.loggedInSeller ?
                     <Link to="/seller/ProductContribution/pageNo=1">
                     <h6 className="footer-container">
                     <i className="fa fa-shopping-bag" aria-hidden="true"></i>  Sell On amYflip 
                     </h6>
                 </Link>:
                  <Link to="/seller product/main page">
                  <h6 className="footer-container">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>  Sell On amYflip 
                  </h6>
              </Link>
                    }
                   
                </button>
                </div>
            </footer>
        </React.Fragment>
        
    )
}
}
const mapStateToProps = (state) => {
    console.log(state);
    
    return {
        loggedInSeller: state.loggedInSeller.data};
}
export default connect(mapStateToProps, { SellLoggedInAction })(SellProductLinkFooter);