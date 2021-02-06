import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

const ReportBug = ({location}) => (
  <Layout location={location}>
    <SEO title="Report Bug" />
    <h1>Report Bug</h1>
    <p>
      Form to allow users to see known bugs, submit one, and bump a bug to show
      us which is most important to users.
    </p>
  </Layout>
)

export default ReportBug
