import React from 'react'

import Layout from '../components/layout'
import RegisterForm from '../components/registerForm'
import SEO from '../components/seo'

const RegisterPage = () => (
  <Layout>
    <SEO title="Register" />
    <header className="header">
      <h1>Register</h1>
    </header>
    <RegisterForm />
  </Layout>
)

export default RegisterPage
