import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="nav-details-container">
        <li>
          <Link to="/" className="link-container">
            <p className="nav-details">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-container">
            <p className="nav-details">Jobs</p>
          </Link>
        </li>
      </ul>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
