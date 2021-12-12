import { Container, Button} from 'react-bootstrap'
import TaskCardAdmin from '../TaskCardAdmin/TaskCardAdmin'

export default function TaskCardDeck(props){
    return(
        <Container className='TaskList' >
            {props.tasks?.map((task) => (
                <TaskCardAdmin 
                    key={task.id} 
                    task={task}/>
            ))}
        </Container>
    )   
}
