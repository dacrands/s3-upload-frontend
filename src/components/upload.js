import React from 'react'
import { navigate } from 'gatsby'
import { Link } from '@reach/router'

import { BASE_URL } from '../utils/fetch'

/* 
POST a file with a short description (<= 130 chars)
Uses the Fetch API and FormData object.
 */

const MAX_TEXT_LEN = 130
const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      date: '',
      isSubmitting: false,
    }
    this.isValidUpload = this.isValidUpload.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }

  componentDidMount() {
    this.setState({ date: new Date().toDateString() })
  }

  isValidUpload() {
    if (!this.fileInput.current.files[0]) {
      alert('No file selected.')
      return false
    }
    if (this.fileInput.current.files[0].size > MAX_FILE_SIZE) {
      alert('That file is too big')
      return false
    }
    if (this.state.text.length > MAX_TEXT_LEN) {
      alert('Your text description is too long. Please shorten it.')
      return false
    }
    return true
  }

  handleChange(event) {
    let value = event.target.name
    this.setState({ [value]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()    
    if (!this.isValidUpload()) {
      return
    }
    const data = new FormData(event.target)
    //TODO create postFile()
    this.setState({ isSubmitting: true })    
    fetch(`${BASE_URL}/files`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
      .then(res => {        
        if (res.status !== 200) {
          throw res
        }
        res.json()
      })
      .then(response => {
        this.setState({ isSubmitting: false })
        navigate(`/`)
        return
      })
      .catch(err => {      
        try {
          err
          .json()
          .then(err => {
            this.setState({ isSubmitting: false })
            alert(err.msg)
            return
          })
          .catch(err => {
            console.log(err)
          })
        }
        catch(err) {
          console.log(err)
          this.setState({ isSubmitting: false })
          alert("Failed to upload file.")
          return
        }                                  
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
            <small
              style={
                this.state.text.length <= MAX_TEXT_LEN
                  ? { color: 'green' } 
                  : { color: 'red' } // red indicates text is too long
              }
            >
              {this.state.text.length <= MAX_TEXT_LEN
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
