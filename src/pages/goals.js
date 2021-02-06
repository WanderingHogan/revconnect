import React, {useState, useEffect, useContext} from 'react'
import {navigate} from 'gatsby'
import SEO from '../components/SEO'
// import FamilyMemberList from '../components/FamilyMemberListItem'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'
import PageHeader from '../components/PageHeader'

const Goals = ({location}) => {
  const {token} = useContext(AuthContext)
  const clickEvent = (() => {
    console.log('clicked')
  })
  useEffect(() => {
    if (token == null) {
      navigate('/login/')
    }
    
  }, [token])

  return (
    <Layout location={location}>
      <PageHeader title="My Goals" clickEvent={clickEvent}/>
      <SEO title="My Goals" />
      {/* <FamilyMemberList
        FamilyMembers={members}
        loading={loading}
      /> */}
      goals go here bro
    </Layout>
  )
}
export default Goals
