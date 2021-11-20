import { React } from 'react'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap'
import Image from "react-bootstrap/Image"
import modeling from './HomeImages/modeling.png'
import designImage from './HomeImages/designImage.jpg'
import informationImage from './HomeImages/informationImage.jpg'
import TextData from "../../jsonData/Home.json"
import './HomeStyle.sass'

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
                    <Card
                    bg="" 
                border="success" 
                className="cardTemplateStyle" 
                 onClick={()=>{viewOrder("/UserTaskListPage")}}
            >
                <Row>
                    <Row className="PictureBlock">
                        <Image  
                            fluid={true} 
                            //className="CardImageStyle"
                            className={"img-responsive center-block w-100"}  
                            src= {modeling}
                            alt= 'picture'
                        />   
                    </Row>           
                    <Col >
                        <Card.Body>
                            <Card.Text className="ml-3">
                                {TextData.Modelling}
                            </Card.Text>
                            <Card.Text className="ml-3 CommentText">
                                {TextData.ModellingTestSkills}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>    
                </Col>
                <Col>
            <Card 
                bg="" 
                border="success" 
                className="cardTemplateStyle" 
                // onClick={viewOrder}
            >
                <Row>
                    <Row className="PictureBlock">
                        <Image  
                            fluid={true} 
                            //className="CardImageStyle"
                            className={"img-responsive center-block w-100"}  
                            src= {designImage}
                            alt= 'picture'
                        />   
                    </Row>           
                    <Col >
                        <Card.Body>
                            <Card.Text className="ml-3">
                                {TextData.Design}
                            </Card.Text>
                            <Card.Text className="ml-3 CommentText">
                                {TextData.DesignTestSkills}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            </Col>
            <Col>
            <Card 
                bg="" 
                border="success" 
                className="cardTemplateStyle" 
                // onClick={viewOrder}
            >
                <Row>
                    <Row className="PictureBlock">
                        <Image  
                            fluid={true} 
                            //className="CardImageStyle"
                            className={"img-responsive center-block w-100"}  
                            src= {informationImage}
                            alt= 'picture'
                        />   
                    </Row>           
                    <Col >
                        <Card.Body>
                            <Card.Text className="ml-3">
                                {TextData.Theory}
                            </Card.Text>
                            <Card.Text className="ml-3 CommentText">
                                {TextData.UsefulLinks}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default Home