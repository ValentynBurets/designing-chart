import "./Header.sass";
import React, {useState, useEffect} from "react";
import {
    Container,
    Navbar,
    Nav,
    Button,
    Modal,
    Form,
    Dropdown,
    DropdownButton,
    NavDropdown
  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TextData from "../../jsonData/Header.json";
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Header() {

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSignOut() {
        localStorage.clear();
        setName(null);
        setSurname(null);
      }

    function handleSignIn(){
        const logInJson = {
            "email": email,
            "password": password
        };

        console.log(logInJson);

        axios
        .post("https://localhost:44383/api/Authentication/Login", logInJson)
        .then((responce) => {
            var data = responce.data;
            localStorage.setItem('token', data.token);
        })
        .finally(function(){
            myInfo();
        })
        .catch((e) => {
            console.log(e)
            alert(e)
        })
        
    }

    const myInfo =() =>
    {
        axios.get('https://localhost:44383/api/Profile/info', {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
            }
        }).then((responce) => {
            var data = responce.data;
            localStorage.setItem('UserName', data.name);
            localStorage.setItem('UserSurname', data.surname);
            localStorage.setItem('UserRole', data.role);
            localStorage.setItem('UserEmail', data.email);
            console.log(data)
        }).finally(function(){
            setShow(false)
        })
        .catch((e) => {
            console.log(e)
            alert(e)
            return false
        })
    }

    useEffect(() => {
        if(localStorage.getItem('token') != null){
            setName(localStorage.getItem('UserName'))
            setSurname(localStorage.getItem('UserSurname'))
            setRole(localStorage.getItem('UserRole'))
            setEmail(localStorage.getItem('UserEmail'))
        }
      });

    const getDropdown = ()=>{
        if(name !== null){
            return( 
                            <Nav>
                                <DropdownButton id="dropdown-basic-button" title={name + ' ' + surname + ' ' + email  + ' ' + role}>
                                {/* <Dropdown.Item variant="primary" id="dd-but-sign-in" onClick={handleShow}>Sign in</Dropdown.Item> */}
                                <Dropdown.Item variant="primary" id="dd-but-profile" >Profile</Dropdown.Item>
                                <Dropdown.Item variant="primary" id="dd-but-sign-out" onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </DropdownButton>
                        </Nav>)
                    }else {
                        return (
                            <Nav>
                            <DropdownButton id="dropdown-basic-button" title="Account">
                                <Dropdown.Item variant="primary" id="dd-but-sign-in" onClick={handleShow}>Sign in</Dropdown.Item>
                            </DropdownButton>
                        </Nav>
            )
        }
    }

    const getUserLinks = ()=>{
        if(localStorage.getItem('UserRole') == 'Student'){
            return(
            <>
                <Nav.Link href="/user-task-list">Tasks</Nav.Link>
                <Nav.Link href="/statistics-page">Statistics</Nav.Link>
            </>)
        }
        else if(localStorage.getItem('UserRole') == 'Admin'){
            return(
            <>
                <Nav.Link href="/admin-task-creation">Create Task</Nav.Link>
                <Nav.Link href="/user-list-page">Users</Nav.Link>
                <Nav.Link href="/statistics-page">Statistics</Nav.Link>
            </>)
        }
    }

    return (
        <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/home">{TextData.VLPI}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    {getUserLinks()}
                    <Nav.Link href="/about">About Us</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
            <Nav>
            {getDropdown()}
            </Nav>
        </Container>
        </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="fromBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value = {email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <Form.Text className="text-muted">We`ll never share your email with anyone else.</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="fromBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value = {password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="fromBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Form.Group controlId="fromSignInButton">
                            <Button variant="primary" onClick={handleSignIn}>Sign in</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Header;