import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { BASE_URL } from '../utils/fetch'

const MAX_BODY_LEN = 130

class File extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: 'No file selected',
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
    if (!this.props.location.state) {
      // TO DO: check for query param `id`
      return
    }
    this.setState({ isLoading: false })
    const file = this.props.location.state.file
    const body = this.props.location.state.body
    const mainBody = this.props.location.state.body
    const id = this.props.location.state.id
    this.setState({ file, body, id, mainBody, didUpdate: false })
  }

  componentDidUpdate() {
    if (!this.state.didUpdate) {
      this.getFile()
      this.setState({ didUpdate: true })
    }
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
        alert(e.msg)
        this.setState({ isLoading: false })
        return
      })
  }

  render() {
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
    if (this.state.isLoading) {
      return (
        <Layout>
          <header className="header">
            <h1>Loading file...</h1>
          </header>
            <div className="loader__container">
              <div className="loader" />
            </div>
        </Layout>
      )
    }
    if (this.state.isDeleting) {
      return (
        <Layout>
          <header className="header">
            <h1>Deleting file...</h1>
          </header>
        </Layout>
      )
    }
    return (
      <Layout>
        <SEO title={this.state.file} />
        <header className="header">
          <h1>{this.state.file}</h1>
        </header>
        <section className="box">
          <div className="box__item">
            <h3>Download File</h3>
            <a className="btn" href={this.state.url}>
              Download
            </a>
          </div>
          <div className="box__item">
            <h3>Upload Date</h3>
            <p>{this.state.date}</p>
          </div>
          <div className="box__item">
            <h3>Size</h3>
            <p>{Number.parseFloat(this.state.size / 1000).toFixed(2)} KB</p>
          </div>

          <div className="box__item box__item-desc">
            <h3>Description</h3>
            <button
              aria-label="Edit file info"
              onClick={() => {
                this.setState({ isEditing: !this.state.isEditing })
              }}
            >
              {this.state.isEditing ? '\u2715' : '\u270E'}
            </button>
            {!this.state.isEditing ? (
              <p>{this.state.mainBody}</p>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <textarea
                  cols="40"
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

          <div className="box__item box__item--warning">
            <h3>Delete</h3>
            <button className="btn btn--warning" onClick={this.deleteFile}>
              Delete
            </button>
          </div>
        </section>
        <Link to="/">Back to files</Link>
      </Layout>
    )
  }
}

export default File
