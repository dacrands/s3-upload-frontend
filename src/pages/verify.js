import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class Verify extends Component {
  constructor(){
    super();    
    this.state = { token: '' }
    this.verifyToken = this.verifyToken.bind(this);
  } 
  
  componentDidMount() {    
    const verifyUrl = new URL(document.location.href)
    const token = verifyUrl.searchParams.get('token')
    if (!token) {
      navigate('/')
      return
    }
    this.setState({ token });
    setTimeout(() => { this.verifyToken() })      
  }

  verifyToken() {
    fetch(`https://api.files.crandall.dev/verify?token=${this.state.token}`)
      .then(res => {
        return res.json()
      })
      .then(response => {
        alert('Account verified. Please login.')
        navigate(`/login`)
      })
      .catch(e => console.error(e))
  }



  render() {
    return (
      <Layout>
        <SEO title="Verify" />
        <header className="header">
          <h1>Verify</h1>
        </header>
        <p>Verifying account</p>        
      </Layout>
    )
  }
}


export default Verify
