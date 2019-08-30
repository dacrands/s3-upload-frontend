import React from 'react'
import { Link } from 'gatsby'

import { FaFileWord } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { FaFileExcel } from 'react-icons/fa';
import { FaFileImage } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import { FaRegFolder } from 'react-icons/fa';

import { BASE_URL } from '../utils/fetch'

const ICON_SIZE = 28

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
    this.getFileExtCounts = this.getFileExtCounts.bind(this)
    this.getFileIcon = this.getFileIcon.bind(this)
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
          isLoading: false,          
        })                
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

  getFileIcon(ext) {
    switch(ext) {
      case 'docx':
        return <FaFileWord color="#00a2ed" size={ICON_SIZE} />        
      case 'pdf':
        return <FaFilePdf color="#ff0000"  size={ICON_SIZE} />        
      case 'xlsx':
        return <FaFileExcel color="#008000" size={ICON_SIZE} />     
      case 'jpg': 
      case 'jpeg':
      case 'png':
        return <FaFileImage color="#663399" size={ICON_SIZE} />     
      default:
          return <FaFile color="#595d63" size={ICON_SIZE} />     
    }
  }

  filterFiles(name) {
    let filteredArr = this.state.files.filter(file => {
      return file.name.includes(name) > 0
    })
    this.setState({ filteredFiles: filteredArr, searchTerm: name })
  }

  getFileExtCounts() {
    const fileExtensions = {}    
    for(let i = 0; i < this.state.files.length; i++) {
      let ext = this.state.files[i].name.split('.').pop().toLowerCase()
      !fileExtensions[ext]
      ? fileExtensions[ext] = 1
      : fileExtensions[ext]++      
    }
    return fileExtensions
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
            onChange={term => this.filterFiles(term.target.value)}
          />
          <Link
            className="btn btn--big"
            to="/upload"
            style={{ float: 'right' }}
          >
            Upload
          </Link>
          <div className="tag__container">
            <button 
            className="tag"
            onClick={() => {this.filterFiles('')}}>
                <FaRegFolder size={ICON_SIZE} />
                <br/>
                All Files
            </button>
            {
              Object.keys(this.getFileExtCounts()).map(ext => (
                <button 
                onClick={() => {this.filterFiles(ext)}}
                className="tag">
                  {
                    this.getFileIcon(ext)
                  }
                  <br/>
                  {ext}: {` `} 
                  {this.getFileExtCounts()[ext]}
                </button>
              ))
            }
          </div>
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
