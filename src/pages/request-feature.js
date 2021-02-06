import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

const RequestFeature = ({location}) => (
  <Layout location={location}>
    <SEO title="Request Feature" />
    <h1>Request Feature</h1>
    <p>Form to allow users to request a feature and vote on them here.</p>
  </Layout>
)

export default RequestFeature
