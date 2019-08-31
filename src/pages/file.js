import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { BASE_URL } from '../utils/fetch'

const MAX_BODY_LEN = 130

/*

Read, Patch, and Delete interface for a file

 */
class File extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      body: '',
      mainBody: '',
      date: '--, -- --- ---- --:--:-- ---',
      url: '',
      id: -1,
      size: 0,
      isLoading: true,
      isDeleting: false,
      isEditing: false,
      didUpdate: false,
    }
    this.getFile = this.getFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.editFile = this.editFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    /* Use location state from <Link/> to set file info pre fetch  */
    if (!this.props.location.state) {
      return
    }
    const { file, body, mainBody, id } = this.props.location.state
    this.setState({
      file,
      body,
      id,
      mainBody,
      didUpdate: false,
      isLoading: false,
    })     
    /* Fetch once state is set */
    setTimeout(()=>{this.getFile()})
  }

  handleChange(event) {
    let value = event.target.name
    this.setState({ [value]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.body.length > MAX_BODY_LEN) {
      alert('Your text description is too long. Please shorten it.')
      return
    }
    const data = new FormData(event.target)
    this.editFile(data)
  }

  /*================== 
        FETCHES
 ==================*/
  editFile(data) {
    fetch(`${BASE_URL}/files/${this.state.id}/edit`, {
      credentials: 'include',
      body: data,
      method: 'PATCH',
    })
      .then(res => {
        if (res.status !== 200) {
          throw res
        }
        return res.json()
      })
      .then(response => {
        this.getFile()
        this.setState({ isEditing: false })
        return
      })
      .catch(e => {
        e.json()
          .then(err => {
            alert(err.msg)
            this.setState({ isEditing: false })
            return
          })
          .catch(error => console.error(error))
      })
  }

  deleteFile() {
    const confirmed = window.confirm(
      `You are about to delete ${
        this.state.file
      }. This action can not be undone.`
    )
    if (!confirmed) {
      return
    }

    this.setState({ isDeleting: true })
    fetch(`${BASE_URL}/files/${this.state.id}/delete`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then(res => {
        if (res.status !== 200) {
          throw res
        }
        return res.json()
      })
      .then(response => {
        this.setState({ isDeleting: false })
        navigate('/')
        return
      })
      .catch(e => {
        alert(e)
        this.setState({ isDeleting: false })
        return
      })
  }

  getFile() {
    this.setState({ isLoading: true })
    fetch(`${BASE_URL}/files/${this.state.id}`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.status !== 200) {
          throw res
        }
        return res.json()
      })
      .then(response => {
        this.setState({
          date: response.file.date,
          size: response.file.size,
          url: response.file.url,
          body: response.file.body,
          mainBody: response.file.body,
        })
        this.setState({ isLoading: false })
        return
      })
      .catch(e => {
        alert(`There was an error getting file ${this.state.file}`)
        navigate('/')
        return
      })
  }

  render() {
    /*--------------------
      NO FILE SELECTED
    --------------------*/
    if (this.state.id === -1) {
      return (
        <Layout>
          <header className="header">
            <h1>No file selected</h1>
            <Link to="/">Return to Files</Link>
          </header>
        </Layout>
      )
    }
    /*--------------------
        LOADING FILE
    --------------------*/
    if (this.state.isLoading) {
      return (
        <Layout>
          <header className="header">
            <h1>{`${this.state.file}`}</h1>
          </header>
          <div className="loader__container">
            <div className="loader" />
          </div>
        </Layout>
      )
    }
    /*--------------------
        DELETING FILE
    --------------------*/
    if (this.state.isDeleting) {
      return (
        <Layout>
          <header className="header">
            <h1>Deleting file...</h1>
          </header>
        </Layout>
      )
    }
    /*--------------------  
             FILE
      --------------------*/
    return (
      <Layout>
        <SEO title={this.state.file} />
        <header className="header">
          <h1>{this.state.file}</h1>
        </header>
        <section className="grid-aside">
          {/* Download file */}
          <div>
            <div className="box">
              <h3>Download File</h3>
              <a className="btn" href={this.state.url}>
                Download
              </a>
            </div>
            {/* Upload Date */}
            <div className="box">
              <h3>Upload Date</h3>
              <p>{this.state.date}</p>
            </div>
            <div className="box">
              <h3>Size</h3>
              <p>{Number.parseFloat(this.state.size / 1000).toFixed(2)} KB</p>
            </div>
            {/* Delete file */}
            <div className="box box--warning">
              <h3>Delete</h3>
              <button className="btn btn--warning" onClick={this.deleteFile}>
                Delete
              </button>
            </div>
          </div>
          {/* Edit file info */}
          <div className="box box--center">
            <h3>Description</h3>
            <button
              aria-label="Edit file info"
              onClick={() => {
                this.setState({ isEditing: !this.state.isEditing })                
                // Set body back to original if user doesn't submit changes
                if (this.state.isEditing) {
                  this.setState({ body: this.state.mainBody })
                }
              }}
              >
              {this.state.isEditing ? '\u2715' : '\u270E'}
            </button>
            {!this.state.isEditing ? (
              <p>{this.state.mainBody}</p>
              ) : (
                <form className="form" onSubmit={this.handleSubmit}>
                <textarea                                                    
                  rows="5"
                  type="text"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
                <p>
                  <small
                    style={
                      this.state.body.length < MAX_BODY_LEN + 1
                        ? { color: 'green' }
                        : { color: 'red' }
                    }
                  >
                    {this.state.body.length < MAX_BODY_LEN + 1
                      ? `Characters available: ${MAX_BODY_LEN -
                          this.state.body.length}`
                      : 'Please shorten your description.'}
                  </small>
                </p>
                <p>
                  <input className="btn" type="submit" value="Submit" />
                </p>
              </form>
            )}
          </div>
          
        </section>
        <Link to="/">Back to files</Link>
      </Layout>
    )
  }
}

export default File
