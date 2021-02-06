/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */

import React, {useState, useContext} from 'react'
import {navigate} from 'gatsby'
import {Header, Form, Input, Button, Segment, Message} from 'semantic-ui-react'
import SEO from '../components/SEO'
import AuthContext from '../components/Context/AuthContext'
import {signup} from '../../lib/services'
import Layout from '../components/Layout'
import useForm from '../components/Hooks/useForm'

const Register = ({location}) => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState([])
  const {updateToken} = useContext(AuthContext)

  const formRegister = () => {
    setLoading(true)
    signup({
      username: values.username,
      password: values.password,
    })
      .then(resp => {
        console.log('resp', resp)
        localStorage.setItem('userToken', resp.data.token) //.replace('JWT ', ''))
        updateToken()
        navigate('/')
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
        setApiError(e.errors || e)
      })
  }

  const {values, handleChange, handleSubmit, errors} = useForm(
    formRegister,
    validate,
  )

  const handleErrors = errors => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message error header="Sorry" content="Cannot register at this time." />
      )
    }
    return errors.map(e => (
      <Message error header={e.title} content={e.detail} key={e.status} />
    ))
  }

  return (
    <Layout location={location}>
      <SEO title="Register" />
      <Header as="h1">Create an account</Header>
      <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
        {apiError.length !== 0 ? handleErrors(errors) : null}
        <Segment>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <Input
              id="nausernameme"
              fluid
              name="username"
              autoFocus
              onChange={handleChange}
              placeholder="Enter any username you want to use. Must be unique."
              value={values.username || ''}
            />
          </Form.Field>
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              fluid
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              value={values.password || ''}
            />
          </Form.Field>
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          <Button type="submit" color="orange">
            Create
          </Button>
        </Segment>
      </Form>
    </Layout>
  )
}

export default Register

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Username is required'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
