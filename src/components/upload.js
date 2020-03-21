import React from 'react'
import { navigate } from 'gatsby'
import { Link } from '@reach/router'

import { BASE_URL } from '../utils/fetch'

import UploadFileForm from '../components/uploadFileForm'

/* 
POST a file with a short description (<= 130 chars)
Uses the Fetch API and FormData object.
 */

const MAX_TEXT_LEN = 130
const MAX_FILE_GB = 5
const MAX_FILE_SIZE = MAX_FILE_GB * 1024 * 1024

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      date: '',
      isSubmitting: false,
    }

    this.uploadFileFetch = this.uploadFileFetch.bind(this)
    this.isValidUpload = this.isValidUpload.bind(this)
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

  handleSubmit(event, isValidUpload, fileInput) {
    event.preventDefault()
    if (!isValidUpload(fileInput)) {
      return
    }
    const data = new FormData(event.target)
    this.uploadFileFetch(data)
  }

  uploadFileFetch(data) {
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
        } catch (err) {
          console.log(err)
          this.setState({ isSubmitting: false })
          alert('Failed to upload file.')
          return
        }
      })
  }

  isValidUpload(maxFileSize, maxTextLen) {
    return fileInput => {
      if (!fileInput.current.files[0]) {
        alert('No file selected.')
        return false
      }
      if (fileInput.current.files[0].size > maxFileSize) {
        alert('That file is too big')
        return false
      }
      if (this.state.text.length > maxTextLen) {
        alert('Your text description is too long. Please shorten it.')
        return false
      }
      return true
    }
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
        <UploadFileForm
          MAX_TEXT_LEN={MAX_TEXT_LEN}
          MAX_FILE_SIZE={MAX_FILE_SIZE}
          MAX_FILE_GB={MAX_FILE_GB}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isValidUpload={this.isValidUpload}
          fileInput={this.fileInput}
          text={this.state.text}
          date={this.state.date}
        />
        <Link to="/">Back to files</Link>
      </div>
    )
  }
}

export default Upload
