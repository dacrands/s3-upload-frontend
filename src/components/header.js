import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { getUser } from '../utils/auth'

const Header = ({ siteTitle }) => {
  if (getUser() === "no one") {
    return <nav className="navbar">
      <Link
        to="/"
        activeStyle={{ textDecoration: 'underline' }}
      >
        <h2>File Uploader</h2>
      </Link>

      <ul className="navbar__links">
        <li>
          <Link to="/login" activeStyle={{ textDecoration: 'underline' }}>Login</Link>
        </li>
      </ul>
    </nav>
  }
  return <nav className="navbar">
    <Link
      to="/"
      activeStyle={{ textDecoration: 'underline' }}
    >
      <h2>File Uploader</h2>
    </Link>

    <ul className="navbar__links">
      <li>
        <Link to="/upload" activeStyle={{ textDecoration: 'underline' }}>Upload</Link>
      </li>
      <li>
        <Link to="/logout" activeStyle={{ textDecoration: 'underline' }}>Logout</Link>
      </li>
    </ul>
  </nav>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
