import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {HiLocationMarker, HiMail} from 'react-icons/hi'

import './index.css'

const JobList = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    title,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-item">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-container">
            <h1 className="role">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="jobs-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="employee-details-container">
            <div className="location-container">
              <HiLocationMarker className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="location-container">
              <HiMail className="location-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="location">{packagePerAnnum}</p>
        </div>
        <div className="line-containers">
          <hr className="line" />
        </div>
        <div className="description-containers">
          <h1 className="location">Description</h1>
          <p className="location">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobList
