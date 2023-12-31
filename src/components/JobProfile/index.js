import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobProfile extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getUpdatedData = eachData => ({
    name: eachData.name,
    profileImageUrl: eachData.profile_image_url,
    shortBio: eachData.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = this.getUpdatedData(data.profile_details)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileData} = this.state
    console.log(profileData)
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="bg-container">
        <div className="profile-container">
          <div className="profile-details-container">
            <img
              src={profileImageUrl}
              alt="profile"
              className="profile-image"
            />
            <h1 className="name">{name}</h1>
            <p className="bio">{shortBio}</p>
          </div>
        </div>
        <hr className="line" />
      </div>
    )
  }

  renderErrorImage = () => (
    <>
      <button className="failure-button" type="button">
        Retry
      </button>
    </>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderErrorImage()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.getProfile()}</>
  }
}

export default JobProfile
