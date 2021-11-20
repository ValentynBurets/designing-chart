import { React } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Card,
    ListGroup,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import Coll from 'react-bootstrap/Col'
import TextData from '../../../jsonData/TaskCard.json'
import './TaskCardStyle.sass'
import pageurls from '../../../jsonData/pageURLs.json'


export default function TaskCard(props) {

    let history = useHistory()

    const viewOrder = () =>{
        history.push({
            pathname: pageurls.userTaskPerformance + "/" + `${props.task.id}`
        })
    }

    const task = props.task
    const date = (task.expirationDate.split('T'));
    const date_time = date[1].slice(0, 5)
    const date_day = date[0]

    console.log(task)

    return (
        <Card 
            bg="" 
            border="success" 
            className="cardTemplateStyle" 
            onClick={viewOrder}
        >
            <Row>
                <Col >
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {task.textDescription}
                    </Card.Text>   
                </Col>

                <Coll className="ColBlock"> 
                    <Card.Text className="ml-3">
                        {TextData.ExpirationDate + date_day + " " + date_time}
                    </Card.Text>
                    {(task.status == "Expired")
                        ? (<Card.Title>{TextData.Status } <h4 className="TextRed">{task.status}</h4></Card.Title>)
                        : (<Card.Title>{TextData.Status } <h4 className="TextGreen">{task.status}</h4></Card.Title>)
                    }
                    {/* <Row>
                        <Button 
                            variant="primary" 
                            className="viewButton" 
                            onClick={viewOrder}
                        >
                            {TextData.EditText}
                        </Button>
                    </Row> */}
                </Coll>
            </Row>
        </Card>
    )
}

// TaskCard.propTypes = {
//     Picture: PropTypes.string,
//     Date: PropTypes.string,
//     Material: PropTypes.string,
//     Format: PropTypes.string,
//     Amount: PropTypes.number,
//     Price: PropTypes.number
// }


