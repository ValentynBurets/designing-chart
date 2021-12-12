// import React, {useState, useEffect} from "react";
import {
    Row,
    Col,Card
  } from 'react-bootstrap';
  
import modeling from './HomeImages/modeling.png'
import modeling2 from './HomeImages/modeling2.png'
import analyse from './HomeImages/analyse.png'
import codding from './HomeImages/codding.jpg'
import testing from './HomeImages/testing.jpg'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            This system is designed to gain practical skills in modeling, design, testing, programming and analysis of software
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>

        <Container>
            <Row>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }}>
                <Card.Img variant="top" src={modeling2} />
                <Card.Body>
                    <Card.Title>Modeling Module</Card.Title>
                    <Card.Text>
                   Test your skills at modelling
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }}>
                <Card.Img variant="top" src={modeling} />
                <Card.Body>
                    <Card.Title>Design Module</Card.Title>
                    <Card.Text>
                   Test your skills at design
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }}>
                <Card.Img variant="top" src={analyse} />
                <Card.Body>
                    <Card.Title>Requirements Analysis Module</Card.Title>
                    <Card.Text>
                   Test your skills at requirements analysis
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>


            </Row>
            <Row>

            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem'}}>
                <Card.Img variant="top" src={codding} />
                <Card.Body>
                    <Card.Title>Codding Module</Card.Title>
                    <Card.Text>
                   Test your skills at codding
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }}>
                <Card.Img variant="top" src={testing} />
                <Card.Body>
                    <Card.Title>Testing Module</Card.Title>
                    <Card.Text>
                   Test your skills at testing
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>

        </Container>
      </main>
    </ThemeProvider>
  );
}