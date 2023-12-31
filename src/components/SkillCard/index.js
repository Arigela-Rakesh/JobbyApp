import './index.css'

const SkillCard = props => {
  const {eachSkillDetails} = props
  const {imageUrl, name} = eachSkillDetails
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-logo" />
      <p className="name">{name}</p>
    </li>
  )
}

export default SkillCard
