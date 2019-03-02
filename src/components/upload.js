import React from 'react'
import { navigate } from 'gatsby'
import { setUser } from '../utils/auth'

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: '',
            isSubmitting: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)        
        this.fileInput = React.createRef()
    }

    componentDidMount() {
        this.setState({ date: new Date().toDateString() })
    }

    handleChange(event) {
        let value = event.target.name;
        this.setState({ [value]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();   
        const data = new FormData(event.target);
        this.setState({ isSubmitting: true })
        fetch('http://192.168.0.115:5000/files', {
            method: "POST",
            body: data,
            credentials: 'include',
        })
            .then(res => {
                if (res.status !== 200) {
                    throw ({status: res.status, msg: res})
                }
                res.json()
            })
            .then(response => {
                this.setState({ isSubmitting: false })
                navigate(`/`)
                return
            })
            .catch(({status, msg}) => {                
                msg.json().then(err => {        
                    this.setState({ isSubmitting: false })         
                    alert(err.msg)                     
                    return  
                    // navigate('/err', {state: {err: status, errText: err.msg}})
                }).catch(error => {
                    console.log(error)
                })
            })
    }

    render() {
        if(this.state.isSubmitting) {
            return <div className="loading">
                <h1>Submitting file...</h1>
            </div>
        }
        return (

            <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        hidden
                        type="text"
                        name="date"
                        id="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                        ref={this.fileDate} />
                <label htmlFor="file">
                    File:
                    <br/>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        ref={this.fileInput} />
                </label>
                <label htmlFor="text">
                    File Info:
                <br />
                    <textarea 
                        type="text" 
                        name="text" 
                        id="text" 
                        rows="5" 
                        cols="30"
                        value={this.state.text} onChange={this.handleChange}
                    />                    
                </label>
                <input className="btn" type="submit" value="Submit" />
            </form>

        )
    }
}


export default Upload