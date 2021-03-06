import React from 'react'
import { navigate } from 'gatsby'

import { BASE_URL } from '../utils/fetch'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.registerFetch = this.registerFetch.bind(this)
    this.isValidPassword = this.isValidPassword.bind(this)
  }

  handleChange(event) {
    let value = event.target.name
    this.setState({ [value]: event.target.value })
  }

  isValidPassword() {
    if (this.state.password1 !== this.state.password2) {
      return false
    }
    return true
  }

  async registerFetch(url, formData) {
    let response = await fetch(`${url}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    return await response.json();
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.username.length < 8 || this.state.username.length > 20) {
      alert(`Username must be between 8 and 20 characters`)
      return
    }

    const validPassword = this.isValidPassword()
    if (!validPassword) {
      alert(`Your passwords must match.`)
      return
    }

    const data = new FormData(event.target)
    this.registerFetch(BASE_URL, data)
      .then(response => {
        if (response.err) {
          alert(response.err)
          return
        }
        alert('Thanks! Please verifiy your email within 10 minutes.')
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
            <br />
            <small>Must be between 8 and 20 characters</small>
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <small>
              This is only to confirm you exist, I won't send you anything
              unsolicited!
          </small>
          </label>
          <label htmlFor="password1">
            Password
          <br />
            <input
              type="password"
              name="password1"
              id="password1"
              value={this.state.password1}
              onChange={this.handleChange}
            />
            <br />
            <small>
              Sorry for repeating myself, but this also must be between 8 and 20
              characters
          </small>
          </label>
          <label htmlFor="password2">
            Re-enter Password
          <br />
            <input
              type="password"
              name="password2"
              id="password2"
              value={this.state.password2}
              onChange={this.handleChange}
            />
          </label>
          <input className="btn" type="submit" value="Register" />
        </form>
    )
  }
}

export default RegisterForm
