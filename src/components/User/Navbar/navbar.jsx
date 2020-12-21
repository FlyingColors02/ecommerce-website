import React, { Component } from "react";
import { Navbar, Image, Form, FormControl, Button, Nav, Dropdown, ButtonGroup } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {LogoutAction, LoggedInAction} from "../../../Store/actions/User/Authentication/authenticationAction";
import history from "../../../Shared/History/index";
import { FetchCartDataAction } from "../../../Store/actions/User/Cart/cartAction";

class Navigation extends Component {
   constructor(props){
       super(props);
       this.state={
           input:"",
           
       }
   }
    
    componentDidMount = () => {
        this.props.FetchCartDataAction();
        this.props.LoggedInAction();
        
    }

    handleFormData=(event)=>{
        event.preventDefault();
        console.log(this.state.input);
        
      
      history.push(`/searched product/data/data=${this.state.input}/pageNo/pageNo=1`);
      window.location.reload();
    }
    
    data = JSON.parse(localStorage.getItem("user"));
    render() {
            return (
            <React.Fragment>
                <Navbar bg="primary">

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="dropdown-custom-1"><i className="fa fa-bars" aria-hidden="true"></i></Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1" as={Link} to="/account/details/u">Your Account</Dropdown.Item>
                            <Dropdown.Item eventKey="2" as={Link} to="/order/u">Your Orders</Dropdown.Item>
                            <Dropdown.Item eventKey="3" as={Link} to="/delete/account/_u">Delete Account</Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={this.props.LogoutAction}> logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Navbar.Brand href="/home">
                        <Image src={require("../../../assets/amYflipLogo.png")} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Form onSubmit={this.handleFormData}>
                                <FormControl type="text" placeholder="Search" className="mr-lg-12" onChange={event=>this.setState({input:event.target.value})} />
                            </Form>
                            <Button id="search-button" onClick={this.handleFormData}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            </Button>
                           <Nav.Link as={Link} to="/cart">
                           <Button type="button" className="btn-cart">{this.props.cart ?<span className="badge-cart-length">{ this.props.cart.length}</span> : null}<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                           </Button>
                           </Nav.Link>
                           
                           {
                               this.props.user ?
                               <Dropdown as={ButtonGroup}>
                               <Dropdown.Toggle id="dropdown-custom-1">{this.props.user.data.userName}</Dropdown.Toggle>
                               <Dropdown.Menu className="super-colors">
                                   <Dropdown.Item eventKey="1" as={Link} to="u/account/details">Your Account</Dropdown.Item>
                                   <Dropdown.Item eventKey="2" as={Link} to="/order/u">Your Orders</Dropdown.Item>
                                   <Dropdown.Item eventKey="3" onClick={this.props.LogoutAction}> logout</Dropdown.Item>
                               </Dropdown.Menu>
                           </Dropdown>
                              :
                              null
                               
                           }


                           {
                               this.props.user ? 
                                <Nav.Link onClick={this.props.LogoutAction}>LogOut</Nav.Link>
                                :
                                <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
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

        cart: state.Cart.data,
        user: state.loggedInUser.data
        
    };
    
}
export default connect(mapStateToProps,{LogoutAction, LoggedInAction, FetchCartDataAction})(Navigation);