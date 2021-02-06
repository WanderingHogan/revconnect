import React, {useContext, useEffect, useState} from 'react'
// import {navigate} from 'gatsby'
import {Header} from 'semantic-ui-react'
import AuthContext from '../components/Context/AuthContext'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import {getUserStats} from '../../lib/services'
import {Button, Form, Input, Segment} from 'semantic-ui-react'
import FormTextInput from '../components/FormComponents/FormTextInput'
import FormTextarea from '../components/FormComponents/FormTextarea';
const StoreIndex = ({location}) => {
  const siteTitle = 'inventory'
  const {token} = useContext(AuthContext)
  const [stats, setStats] = useState(true)
  const getStats = () => {
    getUserStats().then(data => {
      setStats(prevState => ({
        ...prevState,
        groupMembers: data.data.total_organization_members,
      }))
    })
  }
  useEffect(() => {
    if (token == null) {
      // navigate('/login/')
    } else {
      getStats()
    }
  }, [token])
  const handleSubmit = () => {
    setOpen(false)
  }
  const handleFieldChange = (stateName, event) => {
    console.log('stateName, event', stateName, event)
  }
  
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        />
      </Header>
        <span>
          <p>Use the form below to complete a submission to the REV Connect team. You should receive an automated response that your submission has been received within minutes.</p>
          <p>You will also receive a direct email reply from the REV Connect team member assigned to your submission within two weeks from the confirmed submission that details next steps.</p>
          <p>The information provided in this submission form is not final and may be refined as the project progresses through the REV Connect process.</p>
          <p>For information on how submissions are evaluated, see our criteria.</p>
          <Form onSubmit={handleSubmit}>
            <Segment>
              <FormTextInput label="Primary Company Name" required="true" stateName="primary-company-name" maximumLength="150" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextInput label="Primary Contact - First Name" required="true" stateName="primary-contact-first-name" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextInput label="Primary Contact - Last Name" required="true" stateName="primary-contact-last-name" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextInput label="Primary Contact Title" required="true" stateName="primary-contact-title" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextInput label="Primary Contact Phone No." required="true" stateName="primary-contact-phone-number" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextInput label="Primary Contact Email Address" required="true" stateName="primary-contact-email-address" returnedValue={(s, e) => handleFieldChange(s, e)}/>
              <FormTextarea label="Names of Partner Organizations (if applicable)" required="true" stateName="primary-contact-email-address" maximumLength="200" returnedValue={(s, e) => handleFieldChange(s, e)} />


              <Button
                type="submit"
                content="Add"
                labelPosition="right"
                icon="checkmark"
                positive
              />
            </Segment>
          </Form>
        </span>
    </Layout>
  )
}

export default StoreIndex
