import React from 'react'

import Layout from '../components/layout'
import Files from '../components/files'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Files" keywords={[`David Crandall`, `file hosting`, `aws`]} />
    <Files />
  </Layout>
)

export default IndexPage
