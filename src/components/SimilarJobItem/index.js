import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobItem = props => {
  const {eachSimilarJobsDetails} = props
  const {
    companyLogoUrl,

    jobDescription,

    rating,
    title,
  } = eachSimilarJobsDetails
  return (
    <li className="list-item">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <h1 className="location">Description</h1>
      <p className="location">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobItem
