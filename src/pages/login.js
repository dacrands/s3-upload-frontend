import React from 'react'

import Layout from '../components/layout'
import LoginForm from '../components/loginForm'
import SEO from '../components/seo'

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <header className="header">
      <h1>Login</h1>
    </header>
    <LoginForm />
  </Layout>
)

export default LoginPage
