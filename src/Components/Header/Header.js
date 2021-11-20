import "./Header.sass";
import React from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TextData from "../../jsonData/Header.json";

function Header() {

    return (
        <Navbar className="bar-container" bg="dark" variant="dark">
            <Navbar.Brand className="ms-5">
                {TextData.AboutUs}
            </Navbar.Brand>
            <Nav className="ms-3">
                
            </Nav>

        </Navbar>
    );
}

export default Header;