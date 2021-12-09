import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./AutorizationStyle.sass"
import axios from 'axios'


function AutorizationPage(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    let history = useHistory();

    function handleSignIn(){
        history.push({
            pathname: '/home'
        });
    }

    function handleInputChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleInputChangePassword(event) {
        setPassword(event.target.value);
    }

    const logIn =() =>
    {
        const logInJson = {
            "email": email,
            "password": password
        };

        console.log(logInJson);

        axios
        .post("https://localhost:44383/api/Authentication/Login", logInJson)
        .then((responce) => {
            var data = responce.data;
            alert(data.token);
            localStorage.setItem('token', data.token);
        })
        .then(function(){
            myInfo();
            handleSignIn();
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
            alert(data.name + '  '+data.surname);
            console.log(data)
        })
        .catch((e) => {
            console.log(e)
            alert(e)
            return false
        })


    }


    return(
        <Form className="FormStyle">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleInputChangeEmail}/>
            <Form.Text className="text-muted" >
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handleInputChangePassword}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={logIn}>
            Submit
        </Button>
        <Button variant="primary" type="button" onClick={myInfo}>
            info
        </Button>
    </Form>
    )
}

export default AutorizationPage