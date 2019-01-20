import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import Login from '../components/login'
import SEO from '../components/seo'

const LoginPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Login/>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default LoginPage