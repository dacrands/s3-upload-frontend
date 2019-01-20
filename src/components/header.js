import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <nav className="navbar">
    <Link
      to="/"
      activeStyle={{textDecoration: 'underline'}}
    >
      <h2>File Uploader</h2>
    </Link>   

    <ul className="navbar__links">
      <li>
        <Link to="/page-2" activeStyle={{textDecoration: 'underline'}}>Info</Link>
      </li>
      <li>
        <Link to="/upload" activeStyle={{textDecoration: 'underline'}}>Upload</Link>
      </li>      
      <li>
        <Link to="/login" activeStyle={{textDecoration: 'underline'}}>Logout</Link>
      </li>      
    </ul> 
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
