import React from 'react'

import Layout from '../components/layout'
import Login from '../components/login'
import SEO from '../components/seo'

const LoginPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Login/>
  </Layout>
)

export default LoginPage