import React from 'react'
import { Link} from 'gatsby'
import { logout } from '../utils/auth'

import SEO from '../components/seo'

class Logout extends React.Component {

    componentDidMount() {
        logout()
        fetch('https://api.files.crandall.dev/logout', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                
                return
            }).catch(e => console.error(e))
    }
    render() {
        return (
            <div style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}>
                <SEO title="Page two" />
                <header className="header">
                    <h1>You have successfully logged out!</h1> 
                    <p>Click here to login:
                    {` `}
                    <Link
                        to="/login"
                    >
                        Login
                    </Link>
                    </p>
                </header>
            </div>
        )
    }
}


export default Logout