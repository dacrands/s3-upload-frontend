import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload';

const UploadPage = () => (
  <Layout>
    <SEO title="Upload" />
    <header className="header">
      <h1>Upload</h1> 
      <h3 style={{fontWeight: 'normal'}}>Supports jpg, png, gif, docx, xlsx, pdf</h3>     
    </header>
    <Upload />
  </Layout>
)

export default UploadPage