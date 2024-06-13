import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="listCourseItem">
        <img src={logoUrl} alt={name} className="logo-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default Courses
