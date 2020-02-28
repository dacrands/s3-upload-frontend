import React from 'react'

import Layout from '../components/layout'
import Register from '../components/register'
import SEO from '../components/seo'

const RegisterPage = () => (
  <Layout>
    <SEO title="Register" />
    <header className="header">
      <h1>Register</h1>
    </header>
    <Register />
  </Layout>
)

export default RegisterPage
