import React, { Component } from "react";
import { Navbar, Image, Nav, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { AdminLogoutAction, AdminLoggedInAction } from "../../../Store/actions/Admin/Authentication/adminAuthenticationAction";
import { AllShippedOrdersAction, AllCancelledOrdersAction} from "../../../Store/actions/Admin/Payment/paymentAction"
import history from "../../../Shared/History/index";
import "../../User/Navbar/navbar.css";
class AdminNavigation extends Component {
    
    componentDidMount = () => {
        this.props.AdminLoggedInAction();
        this.props.AllShippedOrdersAction();
        this.props.AllCancelledOrdersAction();
    }


    data = JSON.parse(localStorage.getItem("admin"));
    render() {
        return (
            <React.Fragment>
                <Navbar bg="primary">

                   

                    <Navbar.Brand href="/home">
                        <Image className="image-logo" src={require("../../../assets/amYflipLogo.png")} style={{marginRight:"0px"}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="mr-auto" >
                            
                                    
                                        <NavLink to="/pay/Seller" style={{color:"white",marginRight:"30px", padding:"8px"}}>{this.props.allShippedOrders ? <span className="badge-cart-length" style={{ backgroundColor: " rgb(255, 102, 0)" }}>{this.props.allShippedOrders.length}</span> : null}Pay Seller</NavLink>
                                       
                                            <NavLink  to="/refund/user" style={{color:"white",marginRight:"30px", padding:"8px"}}>
                                                {this.props.cancelledOrders ? <span className="badge-order-length">{this.props.cancelledOrders.length}</span> : null}Refund User

                                    </NavLink>
                                            <NavLink  to="/add/category/_a" style={{color:"white", padding:"8px"}}>Add Category

                                    </NavLink>

                                       
                                   

                            {
                                this.props.user ?
                                    <Dropdown as={ButtonGroup} style={{marginLeft:"65%"}}>
                                        <Dropdown.Toggle id="dropdown-custom-1">{this.props.user.data.userName}</Dropdown.Toggle>
                                        <Dropdown.Menu className="super-colors">
                                             <Dropdown.Item eventKey="4" onClick={this.props.AdminLogoutAction}> logOut</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    null

                            }



                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

        user: state.loggedInAdmin.data,
        allShippedOrders: state.allShippedOrders.data,
        cancelledOrders: state.cancelledOrders.data,
    };

}
export default connect(mapStateToProps, { AdminLogoutAction, AdminLoggedInAction, AllShippedOrdersAction, AllCancelledOrdersAction })(AdminNavigation);