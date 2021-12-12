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


export default function TaskCardAdmin(props) {

    let history = useHistory()

    const viewOrder = () =>{
        history.push({
            pathname: 'admin-task-info' + "/" + `${props.task.id}`,
            taskId: `${props.task.id}`,
            taskDescription: `${props.task.description}`
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
                        {task.description}
                    </Card.Text>   
                </Col>

                <Coll className="ColBlock"> 
                <Card.Text className="ml-3">
                        {'Category: ' + task.categoryTypeName}
                    </Card.Text>
                    <Card.Text className="ml-3">
                        {'Max Mark: ' + task.maxMark}
                    </Card.Text>
                    <Card.Text className="ml-3">
                        {TextData.ExpirationDate + date_day + " " + date_time}
                    </Card.Text>
                    {(task.statusType == "Expired")
                        ? (<Card.Title>{TextData.Status } <h4 className="TextRed">{task.statusType}</h4></Card.Title>)
                        : (<Card.Title>{TextData.Status } <h4 className="TextGreen">{task.statusType}</h4></Card.Title>)
                    }
                </Coll>
            </Row>
        </Card>
    )
}

