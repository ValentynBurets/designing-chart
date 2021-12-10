import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import Loading from '../../Components/Loading/Loading'
import LoadDataService from './Services/LoadDataService'
import TaskCardDeck from '../../Components/TaskCard/TeskCardDeck/TaskCardDeck'
import TextData from '../../jsonData/TaskListPage'
import './TaskListStyle.sass'
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

function UserTaskListPage(){
    let history = useHistory()

    const [data, saveData] = useState({
        isLoading: true,
        requests: null,
        inProgress: null
    })

    const back = () =>{
        history.push({
            pathname: '/home'
        })
    }

    const clear = () =>{
        setSortType('Choose Sort Type')
        setSelectedParam(prevState => ({ ... prevState, selectedCategory: 'Choose Category' }))
    }

    const [tasks, setTasks] = useState(null);
    const [categories, setCategories] = useState(null);
    const [types, setTypes] = useState(null);
    
    useEffect(() => {
        LoadDataService(setTasks, setCategories, setTypes)
    }, [setTasks])
    
    useEffect(()=>
        {
            if(tasks != null && types != null && categories != null)
                (saveData({isLoading: false}))
        },
        [tasks, types, categories]
    )

    const [sortType,setSortType] = useState('Choose Sort Type');
    const SortTypeSelect = (e) => {
        //console.log(e);
        setSortType(e)
    }

    const [selectedParams, setSelectedParam] = useState({
        "selectedType": 'Choose Type',
        "selectedCategory": 'Choose Category'
    });

    const CategoryHandler = (CategoryName) => {
        //alert("sorting by" + CategoryName);
        setSelectedParam(prevState => ({ ... prevState, selectedCategory: CategoryName }))
    }
    const TypeHandler = (TypeName) => {
        //alert("sorting by" + TypeName);
        setSelectedParam(prevState => ({ ... prevState, selectedType: TypeName }))
    }

    console.log(tasks)

    return(
        <Container>
            {data.isLoading 
                ? <Loading/>
                :<Container>
                    <Row>
                        <Col xs={6} md={8} className='PageHeader'>
                            <div>Design Module Tasks</div>    
                        </Col>
                        <Col >
                            <Button className='BackButton' variant='primary' onClick={back}>
                                {TextData.Back}
                            </Button>
                        </Col>
                    </Row>
                   
                    <Row className='PageHeader'>
                        
                            <Col >
                                <DropdownButton
                                 className='DropDown'
                                 id="dropdown-basic-button" title={selectedParams.selectedCategory} 
                                 onSelect={CategoryHandler}>
                                    {categories.map((item) => (
                                        <Dropdown.Item eventKey={item.Name}>{item.Name}</Dropdown.Item>    
                                    ))}
                                </DropdownButton>
                            </Col>

                                <Col>
                                    <DropdownButton
                                        className='DropDown'
                                        alignRight
                                        title={sortType}
                                        id="dropdown-menu-align-right"
                                        onSelect={SortTypeSelect}
                                    >
                                        <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                                        <Dropdown.Item eventKey="TitleName">Title Name</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col md={2}>
                                    <Button className='BackButton' variant='primary' onClick={clear}>
                                        Clear
                                    </Button>
                                </Col>
                    </Row>

                    <Col>
                        <TaskCardDeck tasks = {tasks} />
                    </Col>

                </Container>
            }
        </Container>
    )
}

export default UserTaskListPage

