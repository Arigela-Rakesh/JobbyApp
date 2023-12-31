import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobProfile from '../JobProfile'
import JobFiltersGroup from '../JobFiltersGroup'
import JobList from '../JobList'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiJobStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiJobStatus: apiJobStatusConstants.initial,
    employeeType: [],
    salaryRange: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getEmployeeDescription()
  }

  getEmployeeDescription = async () => {
    this.setState({apiJobStatus: apiJobStatusConstants.inProgress})

    const {employeeType, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiJobStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsSuccessView = () => {
    const {jobsList, searchInput} = this.state
    const jobsListLength = jobsList.length === 0

    return jobsListLength ? (
      <div className="no-jobs-container">
        <div className="input-container">
          <input
            type="search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.getEmployeeDescription}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-found">No Jobs Found</h1>
        <p className="para">We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <div className="background-container">
        <div className="input-container">
          <input
            type="search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.getEmployeeDescription}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="success-view">
          {jobsList.map(job => (
            <JobList key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
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

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiJobStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiJobStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  onChangeSalary = salaryRange => {
    this.setState({salaryRange}, this.getEmployeeDescription)
  }

  changeEmployee = employeeType => {
    this.setState(
      prev => ({employeeType: [...prev.employeeType, employeeType]}),
      this.getEmployeeDescription,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-detailed-container">
          <div className="jobs-container">
            <JobProfile />
            <JobFiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmployee={this.changeEmployee}
              onChangeSalary={this.onChangeSalary}
              searchInput={searchInput}
              onChangeSearchInput={this.onChangeSearchInput}
              getEmployeeDescription={this.getEmployeeDescription}
            />
          </div>
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default Jobs
