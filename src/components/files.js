import React from 'react'
import { Link } from 'gatsby'

import { BASE_URL } from '../utils/fetch'

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      filteredFiles: [],
      searchTerm: '',
      isLoading: true,
      fetchErr: false,
      errStatus: null,
      errMsg: null,
    }
    this.filterFiles = this.filterFiles.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(`${BASE_URL}/files`, {
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
          files: response.files,
          filteredFiles: response.files,
          searchTerm: '',
        })
        this.setState({ isLoading: false })
        return
      })
      .catch(e => {
        this.setState({ isLoading: false, fetchErr: true })
        console.error(e.text)
        this.setState({
          errStatus: e.status,
          errMsg: e.statusText,
        })
        return
      })
  }

  filterFiles(name) {
    let filteredArr = this.state.files.filter(file => {
      return file.name.includes(name.target.value) > 0
    })
    this.setState({ filteredFiles: filteredArr, searchTerm: name.target.value })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <header className="header">
            <h1>Loading...</h1>
          </header>
          <div className="loader__container">
            <div className="loader" />
          </div>
        </div>
      )
    }
    if (this.state.fetchErr) {
      return (
        <header className="header">
          <h1>{this.state.errStatus}</h1>
          <p>{this.state.errMsg}</p>
        </header>
      )
    }
    return (
      <div>
        <header className="header">
          <h1>{this.state.filteredFiles.length} Files</h1>
          <input
            className="search"
            type="searchbox"
            placeholder="Search files"
            value={this.state.searchTerm}
            onChange={term => this.filterFiles(term)}
          />
          <Link
            className="btn btn--big"
            to="/upload"
            style={{ float: 'right' }}
          >
            Upload
          </Link>
        </header>
        <div className="grid-wrap">
          {this.state.filteredFiles[0]
            ? this.state.filteredFiles.map(file => (
                <Link
                  className="files__item"
                  key={file.name}
                  to="/file"
                  state={{
                    file: file.name,
                    body: file.body,
                    id: file.id,
                  }}
                >
                  <h3 className="files__item-title">{file.name}</h3>
                  <p className="files__item-body">{file.body}</p>
                </Link>
              ))
            : null}
        </div>
      </div>
    )
  }
}

export default Files
