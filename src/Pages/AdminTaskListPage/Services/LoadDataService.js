//import ConnectionConfig from '../../../jsonData/ConnectionConfig.json'

import axios from 'axios'

const LoadDataService = (setTasks, setCategories, setTypes) => {  

    //setTasks(TempData);
    //setCategories(CategoryData); 
    //setTypes(TypeData);

    axios
        .get('https://localhost:44383/api/Exercises/GetAll')
        .then((responce) => {
            var data = responce.data            
            //console.log(data)
            if (data != null) {
                setTasks(data)
            }
        })
        .catch((e) => {
            setTasks(null)
            console.log(e)
        });

    axios
        .get('https://localhost:44383/api/Category/GetAll')
        .then((responce) => {
            var data = responce.data            
            console.log(data)
            if (data != null) {
                setCategories(data)
            }
        })
        .catch((e) => {
            setCategories(null)
            console.log(e)
        });
}

export default LoadDataService
