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

    const [sortType,setSortType]=useState('');
    const SortTypeSelect = (e) => {
        console.log(e);
        setSortType(e)
    }

    const [selectedParams, setSelectedParam] = useState({
        "selectedType": null,
        "selectedCategory": null
    });

    const CategoryHandler = (CategoryName) => {
        alert("sorting by" + CategoryName);
        setSelectedParam(prevState => ({ ... prevState, selectedCategory: CategoryName }))
    }
    const TypeHandler = (TypeName) => {
        alert("sorting by" + TypeName);
        setSelectedParam(prevState => ({ ... prevState, selectedType: TypeName }))
    }

    console.log(tasks)

    return(
        <Container>
            {data.isLoading 
                ? <Loading/>
                :<Container>
                    <Row className='PageHeader'>
                        <div>{TextData.PageTitle}</div>    
                    </Row>
                    <Row>
                        <Col md={{ span: 3, offset: 8 }}>
                            <Button className='BackButton' variant='primary' onClick={back}>
                                {TextData.Back}
                            </Button>
                        </Col>
                    </Row> 
                    <Row>
                        <Col md={{ span: 3, offset: 8 }}>
                            <DropdownButton
                                alignRight
                                title={TextData.ChooseSortType}
                                id="dropdown-menu-align-right"
                                onSelect={SortTypeSelect}
                            >
                                <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
                                <Dropdown.Item eventKey="TitleName">Title Name</Dropdown.Item>
                            </DropdownButton>
                            <h10 className='HeaderText'> {TextData.ChosenSortType} { sortType}</h10>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <Row className='HeaderText'>
                                <div >{TextData.ChooseCategory}</div>
                            </Row>
                            <Row>
                                <DropdownButton id="dropdown-basic-button" title={selectedParams.selectedCategory} onSelect={CategoryHandler}>
                                    {categories.map((item) => (
                                        <Dropdown.Item eventKey={item.Name}>{item.Name}</Dropdown.Item>    
                                    ))}
                                </DropdownButton>
                            </Row>
                            <Row className='HeaderText'>
                                <div >{TextData.ChooseType}</div>
                            </Row>
                            <Row>
                                <DropdownButton id="dropdown-basic-button" title={selectedParams.selectedType}  onSelect={TypeHandler}>
                                    {types.map((item) => (
                                        <Dropdown.Item eventKey={item.Name}>{item.Name}</Dropdown.Item>    
                                    ))}
                                </DropdownButton>
                            </Row>
                        </Col>
                        <Col>
                            <TaskCardDeck tasks = {tasks} />
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    )
}

export default UserTaskListPage

