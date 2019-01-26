import React from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'


class Err extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            err: '',
            errText: '',
        }
    }
    
    componentDidMount() {
        const err = this.props.location.state.err
        const errText = this.props.location.state.errText
        this.setState({ err, errText })
    }
    render() {
        return (
            <Layout>
                <header className="header">
                    <h1>{this.state.err} {this.state.errText}</h1>
                </header>
                <div className="content">
                {
                    this.state.err === 403 
                    ? <p>You need to be logged in to do that:  <Link to="/login">login here</Link></p>
                    : <p>{this.state.errText}: <Link to="/">Go back to the homepage</Link></p>
                }
                </div>                
            </Layout>
        )
    }
}
export default Err