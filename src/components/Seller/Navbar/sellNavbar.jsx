import React, { Component } from "react";
import { Navbar, Image, Nav, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "./sellNavbar.css";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { SellLogoutAction, SellLoggedInAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { ViewSellerOrderAction, ViewShippedOrderAction } from "../../../Store/actions/Seller/Order/orderAction"
import history from "../../../Shared/History/index";

class SellNavigation extends Component {
    
    componentDidMount = () => {
        this.props.SellLoggedInAction();
        this.props.ViewSellerOrderAction();
        this.props.ViewShippedOrderAction();
    }


    data = JSON.parse(localStorage.getItem("seller"));
    render() {
        return (
            <React.Fragment>
                <Navbar bg="primary">

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="dropdown-custom-1"><i className="fa fa-bars" aria-hidden="true"></i></Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1" as={Link} to="/s/account/details">Your Account</Dropdown.Item>
                            <Dropdown.Item eventKey="2" as={Link} to="/seller/addproduct">Add Product</Dropdown.Item>
                            <Dropdown.Item eventKey="3" as={Link} to="/seller/ProductContribution/pageNo=1">Product Contribution</Dropdown.Item>
                            <Dropdown.Item eventKey="4" as={Link} to="/delete/account/_s">Delete Account</Dropdown.Item>
                            <Dropdown.Item eventKey="5" onClick={this.props.SellLogoutAction}> logOut</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Navbar.Brand href="#home">
                        <Image className="image-logo" src={require("../../../assets/amYflipLogo.png")} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle id="dropdown-custom-1">{this.props.sellerOrder ? <span className="badge-cart-length" style={{ backgroundColor: " rgb(255, 102, 0)" }}>{this.props.sellerOrder.length}</span> : null}Orders</Dropdown.Toggle>
                                        <Dropdown.Menu className="super-colors">
                                            <Dropdown.Item eventKey="1" as={Link} to="/orders/s">
                                                {this.props.sellerOrder ? <span className="badge-order-length">{this.props.sellerOrder.length}</span> : null}<i aria-hidden="true">Orders</i>&nbsp;

                                    </Dropdown.Item>
                                            <Dropdown.Item eventKey="2" as={Link} to="/shipped/orders/s">{this.props.shippedOrder ? <span className="badge-cart-length">{this.props.shippedOrder.length}</span> : null}<i aria-hidden="true">Shipped Orders</i>&nbsp;

                                    </Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>
                                   

                            {
                                this.props.user ?
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle id="dropdown-custom-1">{this.props.user.data.userName}</Dropdown.Toggle>
                                        <Dropdown.Menu className="super-colors">
                                            <Dropdown.Item eventKey="1" as={Link} to="/s/account/details">Your Account</Dropdown.Item>
                                            <Dropdown.Item eventKey="2" as={Link} to="/seller/addproduct">Add Product</Dropdown.Item>
                                            <Dropdown.Item eventKey="3" as={Link} to="/seller/ProductContribution/pageNo=1">Product Contribution</Dropdown.Item>
                                            <Dropdown.Item eventKey="4" onClick={this.props.SellLogoutAction}> logOut</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    null

                            }


                            {

                                this.props.user ?

                                    <Nav.Link onClick={this.props.SellLogoutAction}>LogOut</Nav.Link>

                                    :
                                    <>
                                        <Nav.Link as={Link} to="/seller/login">Login for Existing Seller</Nav.Link>
                                        <Nav.Link as={Link} to="/seller/registration">Registration</Nav.Link>
                                    </>
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

        user: state.loggedInSeller.data,
        sellerOrder: state.sellerOrder.data,
        shippedOrder: state.shippedOrder.data
    };

}
export default connect(mapStateToProps, { SellLogoutAction, SellLoggedInAction, ViewSellerOrderAction, ViewShippedOrderAction })(SellNavigation);