import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import TextData from '../../../jsonData/UserList.json'
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

function AddUserForm({ addUserModal }) {
  const [role, setRole] = useState('Choose Role');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: ''
  })

  //function setRole(role) {
  //  setForm(prevState => ({ ...prevState, role }))
//}

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const RoleSelect = (e) => {
    console.log(e);
    setRole(e)
    form.role = e;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation() === true) {
      console.log(
        'Parameters were got' +
          '\n password: ' +
          form.firstName +
          '\n lastName: ' +
          form.lastName +
          '\n email: ' +
          form.email +
          '\npassword: ' +
          form.password +
          '\nrole: ' +
          form.role
      )
      addUserModal(form)
    }
  }

  const handleValidation = () => {
    let errors = {}
    let isFormValid = true

    if (!form.firstName) {
      isFormValid = false
      errors.firstName = 'first name cannot be empty!'
    } else if (typeof form.firstName !== undefined) {
      if (!form.firstName.match(/^[a-zA-Z ]+$/)) {
        isFormValid = false
        errors.firstName = 'first name can only include letters!'
      }
    }

    if (!form.lastName) {
      isFormValid = false
      errors.lastName = 'last name cannot be empty!'
    } else if (typeof form.lastName !== undefined) {
      if (!form.lastName.match(/^[a-zA-Z ]+$/)) {
        isFormValid = false
        errors.lastName = 'last name can only include letters!'
      }
    }

    if (!form.email) {
      isFormValid = false
      errors.email = 'Email cannot be empty!'
    } else if (typeof (form.email !== undefined)) {
      if (!form.email.match(/\S+@\S+\.\S+/)) {
        isFormValid = false
        errors.email = 'Email must be in the format example@example.com'
      }
    }

    if (!form.password) {
      isFormValid = false
      errors.password = 'password cannot be empty!'
    } else if (typeof (form.password !== undefined)) {
      if (!form.password.match()) {
        isFormValid = false
        errors.password = 'password must be in the format SomePass'
      }
    }

    setErrors(errors)
    return isFormValid
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{TextData.AddUserButtonText}</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <TextField
          required
          id='firstNameInput'
          name='firstName'
          label='First name:'
          defaultValue='name'
          placeholder='Please type your first name'
          value={form.firstName}
          onChange={(e) => handleChange(e)}
          helperText={errors.firstName}
        />
        <br />
        <TextField
          required
          id='lastNameInput'
          name='lastName'
          label='Last name:'
          defaultValue='last name'
          placeholder='Please type your last name'
          value={form.lastName}
          onChange={(e) => handleChange(e)}
          helperText={errors.lastName}
          
        />
        <br />
        <TextField
          required
          id='emailInput'
          name='email'
          label='email:'
          defaultValue='email'
          placeholder='Please type your email'
          value={form.email}
          onChange={(e) => handleChange(e)}
          helperText={errors.email}
        />
        <br />
        <br />
        <DropdownButton
          name='role'
          alignRight
          title={role}
          value={role}
          id="dropdown-menu-align-right"
          onSelect = {(e) => RoleSelect(e)}
          >
          <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
          <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
        </DropdownButton>
        <TextField
          required
          id='passwordInput'
          name='password'
          label='password:'
          defaultValue='password'
          placeholder='Please type your password'
          value={form.password}
          onChange={(e) => handleChange(e)}
          helperText={errors.password}
        />
        <br/><br/>
        <button>{TextData.AddUserButtonText}</button>
      </form>
    </div>
  )
}

export default AddUserForm
