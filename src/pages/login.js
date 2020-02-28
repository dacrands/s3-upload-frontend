import React from 'react'

import Layout from '../components/layout'
import Login from '../components/loginForm'
import SEO from '../components/seo'

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <header className="header">
      <h1>Login</h1>
    </header>
    <Login />
  </Layout>
)

export default LoginPage
