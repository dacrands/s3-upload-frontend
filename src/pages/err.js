import React from 'react'
import { Link } from 'gatsby'

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
        const err = this.props.location.state.err
        const errText = this.props.location.state.errText
        this.setState({ err, errText })
    }
    render() {
        return (
            <Layout>
                <header className="header">
                    <h1>{this.state.err || "Uh oh!"} </h1>
                    <h2>{this.state.errText || "Something went wrong."}</h2>
                </header>
                <div className="content">
                {
                    this.state.err === 403 
                    ? <p>You need to be logged in to do that:  <Link to="/login">login here</Link></p>
                    : <p>{this.state.errTex}t <Link to="/">Go back to the homepage</Link></p>
                }
                </div>                
            </Layout>
        )
    }
}
export default Err