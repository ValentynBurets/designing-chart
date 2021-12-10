import './TemplateStyle.css'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { useState, useEffect } from 'react'
import { AddUserModalWindow } from './AddUser/ModalWindow'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
//import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
//import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
//import Container from '@material-ui/core/Container'
import TextData from '../../jsonData/UserList.json'
import axios from 'axios'

const columns = [
  {
    id: 'name',
    label: 'First Name',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'surname',
    label: 'Last Name',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
]

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

function createData(name, surname, email, role) {
  //some code for creating data
  return { name, surname, email, role }
}

function createDataForPost(firstName, lastName, email, role, password) {
  //some code for creating data
  return { firstName, lastName, email, role, password }
}



let rows = []

const ModalWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`

function UserListPage() {

  
  useEffect(() => {
    loadUsers();
  });

  const [rows2, setRows2] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const openModal = () => {
    setShowModal((prev) => !prev)
  }

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })

  const addUser = (form) => {
    
    setNewUser(createData(form.firstName, form.lastName, form.email, form.role))
    console.log(newUser)
    
    alert('new user added')
    
    console.log(
      'Parameters were got' +
        '\n password: ' +
        newUser.firstName +
        '\n lastName: ' +
        newUser.lastName +
        '\n email: ' +
        newUser.email +
        '\npassword: ' +
        newUser.password +
        '\nrole: ' +
        newUser.role
    )

    postUser(createDataForPost(form.firstName, form.lastName, form.email, form.role, form.password), newUser);
    setShowModal(false)

  }

  function loadUsers(){
    axios.get('https://localhost:44383/api/Profile/getAll', {
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
      }
    }).then((responce) => {
      var data = responce.data;
      rows = [];
      Array.prototype.push.apply(rows, data);
      setRows2(rows)
      console.log(rows2)
    })
    .catch((e) => {
      console.log(e)
      alert(e)
      return false
    })

  }

  function postUser(newUser, rowUser){

    if(newUser.role == 'Admin'){
      axios
      .post("https://localhost:44383/api/Authentication/RegisterAdmin", newUser)
      .then((responce) => {
        var data = responce.data;
        loadUsers();
      })
      .catch((e) => {
        console.log(e)
        alert(e)
        return false
      })
  
    }
    else{
      axios
      .post("https://localhost:44383/api/Authentication/RegisterStudent", newUser)
      .then((responce) => {
        var data = responce.data;
        loadUsers();
      })
      .catch((e) => {
        console.log(e)
        alert(e)
        return false
      })
    }

  
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <h1>{TextData.Header}</h1>
      </ModalContent>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ModalContent>
        <Button className='AddUserButton' onClick={openModal}>
          {TextData.AddUserButtonText}
        </Button>
        <br />
        <AddUserModalWindow
          showModal={showModal}
          setShowModal={setShowModal}
          addUser={addUser}
        />
      </ModalContent>
    </ModalWrapper>
  )
}

export default UserListPage
