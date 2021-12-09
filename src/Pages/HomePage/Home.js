import { React } from 'react'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap'
import Image from "react-bootstrap/Image"
import modeling from './HomeImages/modeling.png'
import modeling2 from './HomeImages/modeling2.png'
import analyse from './HomeImages/analyse.png'
import codding from './HomeImages/codding.jpg'
import testing from './HomeImages/testing.jpg'
import designImage from './HomeImages/designImage.jpg'
import informationImage from './HomeImages/informationImage.jpg'
import TextData from "../../jsonData/Home.json"
import './HomeStyle.sass'
import pageurls from "../../jsonData/pageURLs.json"

import {
    Card,
    ListGroup,
    Button,
    Row,
    Col
} from 'react-bootstrap'

function Home(props){
    let history = useHistory()

    const viewOrder = (value) => {
        history.push({
            pathname: value
        })
    }
    return(
        <Container>
            <Row>
            <Col>
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

            <Col>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }} onClick={()=>{viewOrder(pageurls.userTaskList)}}>
                <Card.Img variant="top" src={modeling} />
                <Card.Body>
                    <Card.Title>Design Module</Card.Title>
                    <Card.Text>
                   Test your skills at design
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
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

            <Col>
            <Card style={{ width: '15rem', marginTop:'20px', height: '18rem' }}>
                <Card.Img variant="top" src={codding} />
                <Card.Body>
                    <Card.Title>Codding Module</Card.Title>
                    <Card.Text>
                   Test your skills at codding
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
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
    )
}

export default Home