import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { getUser } from '../utils/auth'

const Header = ({ siteTitle }) => {
  if (!getUser()) {
    return (
      <nav className="navbar">
        <Link to="/" activeStyle={{ textDecoration: 'underline' }}>
          <h2>{siteTitle}</h2>
        </Link>

        <ul className="navbar__links">
          <li>
            <Link to="/login" activeStyle={{ textDecoration: 'underline' }}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" activeStyle={{ textDecoration: 'underline' }}>
              Register
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
  return (
    <nav className="navbar">
      <Link to="/" activeStyle={{ textDecoration: 'underline' }}>
        <h2>{siteTitle}</h2>
      </Link>        
      <Link className="btn" to="/upload" activeStyle={{ textDecoration: 'underline' }}>
        Upload
      </Link>        
      <Link to="/logout" activeStyle={{ textDecoration: 'underline' }}>
        Logout
      </Link>        
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Files`,
}

export default Header
