import { Container, Button} from 'react-bootstrap'
import TaskCard from '../TaskCard/TaskCard'

export default function TaskCardDeck(props){
    return(
        <Container className='TaskList' >
            {props.tasks?.map((task) => (
                <TaskCard 
                    key={task.id} 
                    task={task}/>
            ))}
        </Container>
    )   
}
