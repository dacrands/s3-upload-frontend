import React from 'react'
import { navigate } from 'gatsby'
import { setUser } from '../utils/auth'

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef()
    }


    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

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
                navigate(`/`)
                return
            })
            .catch(e => {
                console.error(e)
                return
            })
    }

    render() {
        return (

            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="file">
                    File: {` `}          
                    <input 
                        type="file" 
                        name="file" 
                        id="file" 
                        ref={this.fileInput}/>
                    </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>

        )
    }
}


export default Upload