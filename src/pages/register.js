import React from 'react'

import Layout from '../components/layout'
import Register from '../components/register'
import SEO from '../components/seo'

const RegisterPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Register />
  </Layout>
)

export default RegisterPage