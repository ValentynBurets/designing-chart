import React, {useState, useEffect, useMemo} from 'react';
import './StatisticsPageStyle.sass'
import Loading from '../../Components/Loading/Loading'
import StatisticsForm from './Components/StatisticsForm'
 import StudentStatisticsList from './Components/StudentStatisticsList'
 import AdminStatisticsList from './Components/AdminStatisticList'
import axios from 'axios'

const StatisticsPage = function () {
    
    const [filter, setFilter] = useState(
      {
        sort: '', 
        name: '', 
        category: '', 
        startDate: null,
        endDate: null
      }
    )
    const [records, setRecords] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getAll = async () =>
    {
      axios.get('https://localhost:44383/api/Statistics/GetAll', {
            params: {
                userName: filter.name,
                startDate: filter.startDate,
                endDate: filter.endDate,
                category: filter.category//,
                // sorting: filter.sort
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then((responce) => {
          var data = responce.data
            console.log(responce)
            if (data != null) {
              setRecords(data)
              setLoading(false)
  
            }
        })
        .catch((e) => {
          setRecords(null)
            console.log(e)
        });
    } 

    useMemo(()=>
    {
      getAll();
      
    },[filter])

    useEffect(()=>
    {
      getAll();
    },[])

      return (
          <div>
            <StatisticsForm filter={filter} setFilter={setFilter}/>
            { 
              isLoading ? <Loading/>:
              (localStorage.getItem('UserRole') == 'Admin')
              ?
              <AdminStatisticsList records={records}/>
              :
              <StudentStatisticsList record={records[0]}/>
            }
          </div>
      );
};



export default StatisticsPage;