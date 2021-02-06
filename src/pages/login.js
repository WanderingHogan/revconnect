/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */

import React, {useState, useContext} from 'react'
import {navigate} from 'gatsby'
import {Header, Form, Input, Button, Segment, Message} from 'semantic-ui-react'
import SEO from '../components/SEO'

import {login} from '../../lib/services'
import AuthContext from '../components/Context/AuthContext'
import Layout from '../components/Layout'
import useForm from '../components/Hooks/useForm'

const LoginPage = ({location}) => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState([])
  const {updateToken} = useContext(AuthContext)

  const formLogin = () => {
    setLoading(true)
    login({email: values.name, password: values.password})
    .then((resp) => {
      localStorage.setItem('userToken', resp.data.token) //.replace('JWT ', ''))
      updateToken()
      navigate('/')
    })
       .catch(e => {
        setLoading(false)
        setApiError(e.errors || e)
      })
  }
  const {values, handleChange, handleSubmit, errors} = useForm(
    formLogin,
    validate,
  )

  const handleErrors = errors => {
    if (!Array.isArray(errors) && !errors.length > 0) {
      return (
        <Message
          error
          header="Sorry"
          content="Please check your login details and try again."
        />
      )
    }
    return errors.map(e => (
      <Message error header={e.title} content={e.detail} key={e.status} />
    ))
  }
  return (
    <Layout location={location}>
      <SEO title="Login" />
      <Header as="h1">Log in to your account</Header>
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={apiError.length !== 0 || Object.entries(errors).length !== 0}
      >
        {apiError.length !== 0 ? handleErrors(errors) : null}
        <Segment>
          <Form.Field>
            <label htmlFor="name">Username</label>
            <Input
              id="name"
              fluid
              name="name"
              type="name"
              autoFocus
              placeholder="Your Username"
              onChange={handleChange}
              value={values.name || ''}
            />
          </Form.Field>
          {errors.email && (
            <p data-testid="error" style={{color: 'red'}}>
              {errors.name}
            </p>
          )}
          <Form.Field>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              fluid
              name="password"
              type="password"
              placeholder="Password"
              value={values.password || ''}
              onChange={handleChange}
            />
          </Form.Field>
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          <Button type="submit" color="orange">
            Login
          </Button>
        </Segment>
      </Form>
    </Layout>
  )
}

export default LoginPage

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Email address is required'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
