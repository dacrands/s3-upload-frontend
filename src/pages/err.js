import React from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'

class Err extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      err: '',
      errText: '',
    }
  }

  componentDidMount() {
    // check to see if location has state (i.e., an err)
    // if note, redirect to index
    if (!this.props.location.state) {
      navigate('/')
      return
    }
    const err = this.props.location.state.err
    const errText = this.props.location.state.errText
    this.setState({ err, errText })
  }
  render() {
    return (
      <Layout>
        <header className="header">
          <h1>{this.state.err || 'Uh oh!'} </h1>
          <h2>{this.state.errText || 'Something went wrong.'}</h2>
        </header>
        <div className="content">
          {this.state.err === 403 ? (
            <p>
              You need to be logged in to do that:{' '}
              <Link to="/login">login here</Link>
            </p>
          ) : (
            <p>
              {this.state.errTex} <Link to="/">Go back to the homepage</Link>
            </p>
          )}
        </div>
      </Layout>
    )
  }
}
export default Err
