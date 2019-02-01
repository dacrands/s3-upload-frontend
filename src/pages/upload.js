import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload';

const UploadPage = () => (
  <Layout>
    <SEO title="Page two" />
    <header className="header">
      <h1>Upload a file</h1>      
    </header>
    <Upload />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default UploadPage