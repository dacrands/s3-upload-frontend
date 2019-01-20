import React from 'react'
import { navigate } from 'gatsby'
import { setUser } from '../utils/auth'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
                navigate(`/page-2/`)
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