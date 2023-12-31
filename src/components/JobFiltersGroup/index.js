import './index.css'

const JobFiltersGroup = props => {
  const renderEmploymentType = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachEmployee => {
      const {changeEmployee} = props
      const onChangeEmployeeType = event => {
        changeEmployee(event.target.value)
      }
      return (
        <li
          className="list-item-container"
          key={eachEmployee.employmentTypeId}
          onChange={onChangeEmployeeType}
        >
          <input
            type="checkbox"
            value={eachEmployee.employmentTypeId}
            className="input"
            id={eachEmployee.employmentTypeId}
          />
          <label
            className="label-element"
            htmlFor={eachEmployee.employmentTypeId}
          >
            {eachEmployee.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryType = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {onChangeSalary} = props
      const onSalaryType = event => {
        onChangeSalary(event.target.value)
      }

      return (
        <li
          className="list-item-container"
          key={salary.salaryRangeId}
          onChange={onSalaryType}
        >
          <input
            type="radio"
            value={salary.salaryRangeId}
            className="input"
            id={salary.salaryRangeId}
          />
          <label htmlFor={salary.salaryRangeId} className="label-element">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentDetails = () => (
    <div className="employee-container">
      <h1 className="employee-heading">Type of Employment</h1>
      <ul className="employees-list">{renderEmploymentType()}</ul>
    </div>
  )

  const renderSalaryRangeDetails = () => (
    <div className="employee-container">
      <h1 className="employee-heading">Salary Range</h1>
      <ul className="employees-list">{renderSalaryType()}</ul>
    </div>
  )

  return (
    <>
      {renderEmploymentDetails()}
      <div className="container">
        <hr className="hr-line" />
      </div>
      {renderSalaryRangeDetails()}
    </>
  )
}

export default JobFiltersGroup
