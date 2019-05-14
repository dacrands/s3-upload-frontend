import React from 'react'
import { navigate } from 'gatsby'
import { Link } from '@reach/router'

const MAX_TEXT_LEN = 130

class Upload extends React.Component {
  constructor(props) {
    super(props)
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
    let value = event.target.name
    this.setState({ [value]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    // Evetually I will disable the button, but for now alert and return
    if (this.state.text.length > 130) {
      alert('Your text description is too long. Please shorten it.')
      return
    }
    const data = new FormData(event.target)
    this.setState({ isSubmitting: true })
    fetch('https://api.files.crandall.dev/files', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
      .then(res => {
        if (res.status !== 200) {
          throw { status: res.status, msg: res }
        }
        res.json()
      })
      .then(response => {
        this.setState({ isSubmitting: false })
        navigate(`/`)
        return
      })
      .catch(({ status, msg }) => {
        msg
          .json()
          .then(err => {
            this.setState({ isSubmitting: false })
            alert(err.msg)
            return
          })
          .catch(error => {
            console.log(error)
          })
      })
  }

  render() {
    if (this.state.isSubmitting) {
      return (
        <div className="loading">
          <h1>Submitting file...</h1>
        </div>
      )
    }
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            hidden
            type="text"
            name="date"
            id="date"
            value={this.state.date}
            onChange={this.handleChange}
            ref={this.fileDate}
          />
          <label htmlFor="file">
            File:
            <br />
            <input type="file" name="file" id="file" ref={this.fileInput} />
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
              value={this.state.text}
              onChange={this.handleChange}
            />
            <br />
            {/* 
                        QD solution for now....sorry about that, couldn't resist. 
                        Shows avail chars in green, changes value to 'too long,' turns red 
                        when exceeds desc text limit.
                    */}
            <small
              style={
                this.state.text.length < MAX_TEXT_LEN + 1
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {this.state.text.length < MAX_TEXT_LEN + 1
                ? `Characters available: ${MAX_TEXT_LEN -
                    this.state.text.length}`
                : 'Please shorten your description.'}
            </small>
          </label>
          <input className="btn" type="submit" value="Submit" />
        </form>
        <Link to="/">Back to files</Link>
      </div>
    )
  }
}

export default Upload
