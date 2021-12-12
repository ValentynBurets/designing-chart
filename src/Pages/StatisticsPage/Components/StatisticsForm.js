import React, {useState, useEffect} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import SelectFilter from './Form/SelectFilter'
import SimpleDatePicker from './Form/SimpleDataPicker'
import SearchInput from './Form/SearchInput'

import {
    Row,
    Col,
    Container
  } from 'react-bootstrap'

const StatisticsForm = ({filter, setFilter}={
    sort: '', 
    name: '', 
    category: '', 
    startDate: new Date(),
    endDate: new Date()
  }) => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>
    {
      axios
      .get('https://localhost:44383/api/Category/GetAll')
      .then((responce) => {
          var data = responce.data
          console.log(data)

          if (data != null) {
              console.log(data)
              setCategories(data)
          }
      })
      .catch((e) => {
          setCategories(null)
          console.log(e)
      });

    },[])

    return (
        <div>
            <Container fluid={true}>
            <Row style={{margin: "1rem" }}>
                    <Col>
                        <SimpleDatePicker 
                            value={filter?.startDate}
                            setValue={e => setFilter({...filter, startDate: e})}
                            label="Start Date"/>
                    </Col>
                    <Col>
                        <SimpleDatePicker 
                            value={filter?.endDate} 
                            setValue={e => setFilter({...filter, endDate:  e})}
                            label="End Date"/>
                    </Col>
                    {
                        (localStorage.getItem('UserRole') === 'Admin') ?
                        <Col>
                            <SearchInput 
                                value={filter?.name}
                                setValue={e => setFilter({...filter, name: e})}
                                label="User name"/>
                        </Col>
                        :<></>
                    }
                </Row>
                <Row style={{margin: "1rem" }}>
                    <Col>
                        <SelectFilter 
                            value={filter?.category}
                            label="Category" 
                            defaultValue = {({name: "All"})}
                            onChange={e => setFilter({...filter, category: e})}
                            options={[...categories.map(c => ({value:c.name, name: c.name}))]} />
                    </Col>
                    <Col>
                        <SelectFilter 
                            value={filter?.sort}
                            onChange={e => setFilter({...filter, sort: e})}
                            label="Sort By"
                            defaultValue= {({name: "None"})} 
                            options={[
                                {value:"maxMarkDesc", name:"Max Mark Descending"},
                                {value:"maxMarkAsc", name:"Max Mark Ascending"},
                                {value:"averageMarkDesc", name:"Average Mark Descending"},
                                {value:"averageMarkAsc", name: "Average Mark Ascending"},
                                {value:"coursePercentageDesc", name:"Course Percentage Descending"},
                                {value:"coursePercentageAsc", name: "Course Percentage Ascending"},
                                {value:"attemptsCountDesc", name:"Attempts Count Descending"},
                                {value:"attemptsCountAsc", name: "Attempts Count Ascending"},
                            ]} />
                    </Col>
                </Row>
                               
            </Container>
 
        </div>
    );
};
StatisticsForm.prototype = {
    sort: PropTypes.string, 
    name: PropTypes.string, 
    category: PropTypes.string, 
    startDate: PropTypes.string,
    endDate: PropTypes.string
}

export default StatisticsForm;