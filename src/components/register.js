import React from 'react'
import { navigate } from 'gatsby'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordTwo: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
    }

    handleChange(event) {
        let value = event.target.name;
        this.setState({ [value]: event.target.value });
    }

    isValidPassword() {
        if (this.state.password !== this.state.passwordTwo) {
            return false
        }
        return true
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username.length < 8 || this.state.username.length > 20) {
            alert(`Username must be between 8 and 20 characters`)
            return
        }
        const validPassword = this.isValidPassword()
        if (!validPassword) {
            alert(`Your passwords must match.`)
            return
        }
        const data = new FormData(event.target);
        fetch('http://192.168.0.115:5000/register', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
            .then(res => {                
                return res.json()
            })
            .then(response => {    
                if (response.err) {
                    alert(response.err)
                    return
                }
                navigate(`/login`)
                return
            })
            .catch(e => {
                console.error(e)
            })
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="username">
                    <span>Username</span>
                    <br />
                    <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    <small>Must be between 8 and 20 characters</small>
                </label>
                <label htmlFor="password">
                    Password
                    <br />
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <small>Sorry for repeating myself, but this also must be between 8 and 20 characters</small>
                </label>
                <label htmlFor="passwordTwo">
                    Re-enter Password
                    <br />
                    <input type="password" name="passwordTwo" id="passwordTwo" value={this.state.passwordTwo} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

        )
    }
}


export default Register