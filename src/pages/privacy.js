import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

const Privacy = ({location}) => (
  <Layout location={location}>
    <SEO title="Privacy" />
    <h1>Privacy</h1>
    <p>
      In the <a href="https://twitter.com/BtcpayServer/status/1093181716531949568" target="_blank">words of BTCPay Server</a>, "We don't collect anything. Bye."
    </p>
  </Layout>
)

export default Privacy
