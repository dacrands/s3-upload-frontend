import React, { Component } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class File extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: 'No file selected',
            body: '',
            id: -1,
            date: '--, -- --- ---- --:--:-- ---',
            url: '',
            size: 0,
        };
        this.getFile = this.getFile.bind(this)
    }

    componentDidMount() {
        const file = this.props.location.state.file
        const body = this.props.location.state.body
        const id = this.props.location.state.id
        this.setState({ file, body, id })
    }
    
    componentDidUpdate() {
        this.getFile()
    }

    getFile(){
        fetch(`http://192.168.0.115:5000/files/${this.state.id}`, {
            credentials: 'include'
        })
        .then(res => {
            if(res.status !== 200) {
                throw(res)
            }
            return res.json()
        })
        .then(response => {
            this.setState({
                date: response.file.date,
                size: response.file.size,
                url: response.file.url,
            })
            return
        })
        .catch(e => {
            alert(e)
            return
        })
    }


    render() {
        return (
            <Layout>
                <SEO title="Page two" />
                <header className="header">
                    <h1>{this.state.file}</h1>                   
                </header>
                <section className="box">
                    <div className="box__item">
                        <h3>Desc.</h3>                        
                        <p>{this.state.body}</p>
                    </div>                                        
                    <div className="box__item">
                        <h3>Upload Date</h3>                        
                        <p>{this.state.date}</p>
                    </div>                                        
                    <div className="box__item">
                        <h3>Size</h3>                        
                        <p>{this.state.size} bytes</p>
                    </div>
                    <div className="box__item">
                        <h3>Download Link</h3>                        
                        <a href={this.state.url}>
                            Click Here to Download
                        </a>
                    </div>

                </section>
                <Link to="/">Go back to the homepage</Link>
            </Layout>
        )
    }
}

export default File