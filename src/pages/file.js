import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

class File extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: 'No file selected',
            body: '',
            date: '--, -- --- ---- --:--:-- ---',
            url: '',
            id: -1,
            size: 0,
            didUpdate: false,
            isDeleting: false,
        };
        this.getFile = this.getFile.bind(this)
        this.deleteFile = this.deleteFile.bind(this)
    }

    componentDidMount() {
        const file = this.props.location.state.file
        const body = this.props.location.state.body
        const id = this.props.location.state.id
        this.setState({ file, body, id, didUpdate: false })
    }
    
    componentDidUpdate() {
        if (!this.state.didUpdate) {
            this.getFile()
            this.setState({ didUpdate: true })
        }        
    }

    deleteFile() {
        this.setState({ isDeleting: true })
        fetch(`http://192.168.0.115:5000/files/${this.state.id}/delete`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(res => {
            if(res.status !== 200) {
                throw(res)
            }
            return res.json()
        })
        .then(response => {
            this.setState({ isDeleting: false })
            navigate('/')            
            return
        })
        .catch(e => {
            alert(e)
            this.setState({ isDeleting: false })
            return
        })
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
        if(this.state.isDeleting) {
            return <Layout>
                <header className="header">
                    <h1>Deleting file...</h1>
                </header>                
            </Layout>
        }
        return (
            <Layout>
                <SEO title="Page two" />
                <header className="header">
                    <h1>{this.state.file}</h1>                   
                </header>
                <section className="box">
                    {
                        this.state.body.length < 1
                        ?  null
                        :  <div className="box__item box__item--desc">                    
                            <h3>Description</h3>                        
                            <p>{this.state.body}</p>
                        </div> 
                    }
                                                          
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
                    <div className="box__item box__item--warning">
                        <h3>Delete</h3>                        
                        <button onClick={this.deleteFile}>
                            Click Here to Delete
                        </button>
                    </div>

                </section>
                <Link to="/">Go back to the homepage</Link>
            </Layout>
        )
    }
}

export default File