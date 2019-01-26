import React from 'react'
import { navigate } from 'gatsby'
import { setUser } from '../utils/auth'

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isSubmitting: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)        
        this.fileInput = React.createRef()
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
                    throw (res)
                }
                res.json()
            })
            .then(response => {
                this.setState({ isSubmitting: false })
                navigate(`/`)
                return
            })
            .catch(e => {
                console.error(e)
                this.setState({ isSubmitting: false })
                navigate('/err', {state: {err: e.status, errText: e.statusText}})
                return
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
                <input type="submit" value="Submit" />
            </form>

        )
    }
}


export default Upload