import React, { Component } from "react";
import { Navbar, Image, Form, FormControl, Button, Nav, Dropdown, ButtonGroup } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom"
class Navigation extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar bg="primary">

                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="dropdown-custom-1"><i class="fa fa-bars" aria-hidden="true"></i></Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3" active> Active Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Navbar.Brand href="#home">
                        <Image src={require("../../assets/amYflipLogo.png")} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Form >
                                <FormControl type="text" placeholder="Search" className="mr-lg-12" />
                            </Form>
                            <Button id="search-button">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            </Button>
                           <Nav.Link>
                           <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                           </Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/Registration">Registration</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        )
    }
}
export default Navigation;