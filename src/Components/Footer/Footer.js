import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TextData from "../../jsonData/Footer.json";
import { Navbar, Nav, Button } from 'react-bootstrap';

function Footer(){
  return (
    <Container
    fluid
    style={{
      backgroundColor: '#212529',
      color: '#fff',
      //position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      position: 'absolute'
    }}
  >
    <Row>
    <Navbar className="bar-container" bg="dark" variant="dark">
            <Navbar.Brand className="ms-5">
                {TextData.VLPI}
            </Navbar.Brand>

        </Navbar>
    </Row>
  </Container>
  )
}
export default Footer