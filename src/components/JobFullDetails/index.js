import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {HiLocationMarker, HiMail} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'

import {BiLinkExternal} from 'react-icons/bi'

import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

import './index.css'

const apiJobFullDetailsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobFullDetails extends Component {
  state = {
    apiJobFullDetailsStatus: apiJobFullDetailsStatusConstants.initial,
    jobFullDetailsList: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobFullDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getJobFullDetails = async () => {
    this.setState({
      apiJobFullDetailsStatus: apiJobFullDetailsStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSkillsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobFullDetailsList: updatedData,
        similarJobsData: updatedSkillsData,
        apiJobFullDetailsStatus: apiJobFullDetailsStatusConstants.success,
      })
    } else {
      this.setState({
        apiJobFullDetailsStatus: apiJobFullDetailsStatusConstants.failure,
      })
    }
  }

  renderJobFullDetailsSuccessView = () => {
    const {jobFullDetailsList, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      location,
      packagePerAnnum,
      lifeAtCompany,
      skills,

      title,
    } = jobFullDetailsList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="full-job-container">
        <div className="company-details-container">
          <div className="company-logo-details">
            <div className="logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <div className="line-container">
              <hr className="line" />
            </div>
            <div className="visit-description-container">
              <div className="description-container">
                <h1 className="location">Description</h1>
                <a className="website" href={companyWebsiteUrl}>
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="location">{jobDescription}</p>
            </div>

            <h1 className="skills">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => (
                <SkillCard key={eachSkill.id} eachSkillDetails={eachSkill} />
              ))}
            </ul>
            <div className="life-at-company-container">
              <div className="company-details-container">
                <h1 className="heading1">Life at Company</h1>
                <p className="description1">{description}</p>
              </div>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="heading1">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobsData.map(eachSimilarJobs => (
              <SimilarJobItem
                key={eachSimilarJobs.id}
                eachSimilarJobsDetails={eachSimilarJobs}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobFullDetailsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops!Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="failure-button"
        type="button"
        data-testid="button"
        onClick={this.getEmployeeDescription}
      >
        Retry
      </button>
    </div>
  )

  renderJobFullDetailsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFullDetails = () => {
    const {apiJobFullDetailsStatus} = this.state
    switch (apiJobFullDetailsStatus) {
      case apiJobFullDetailsStatusConstants.success:
        return this.renderJobFullDetailsSuccessView()
      case apiJobFullDetailsStatusConstants.failure:
        return this.renderJobFullDetailsFailureView()
      case apiJobFullDetailsStatusConstants.inProgress:
        return this.renderJobFullDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-full-details-container">
          {this.renderJobFullDetails()}
        </div>
      </>
    )
  }
}

export default JobFullDetails
