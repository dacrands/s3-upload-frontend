import React from 'react'
import { navigate } from 'gatsby'

import { setUser } from '../utils/auth'
import { BASE_URL } from '../utils/fetch'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      err: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginFetch = this.loginFetch.bind(this)
  }

  async loginFetch (url, formData) {
    let response = await fetch(`${url}/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    return await response.json();    
  }

  handleChange(event) {
    let value = event.target.name
    this.setState({ [value]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    this.loginFetch(BASE_URL, data)
      .then(response => {
        if (response.err) {
          alert(response.err)
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
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <input className="btn" type="submit" value="Submit" />
      </form>
    )
  }
}

export default Login
