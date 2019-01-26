import React from 'react'
import { navigate } from 'gatsby'
import { setUser } from '../utils/auth'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            err: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.name;
        this.setState({ [value]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://192.168.0.115:5000/login', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
            .then(res => {
                return res.json()
            })
            .then(response => {    
                if(response.err) {
                    alert(response.err)
                    this.setState({username: '', password: ''})   
                    return
                }            
                setUser(response.username)
                navigate(`/`)
                return
            })
            .catch(e => {
                console.error(e)
            })
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="username">
                    <span>Username</span>
                    <br />
                    <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} /></label>
                <label htmlFor="password">
                    Password
                    <br />
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} /></label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}


export default Login