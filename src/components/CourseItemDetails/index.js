import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseItem: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseItem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseItemsView = () => {
    const {courseItem} = this.state
    const {name, description, imageUrl} = courseItem
    return (
      <div className="card-container">
        <div className="image-container">
          <img src={imageUrl} alt={name} className="image-url" />
        </div>
        <div className="desc-container">
          <h1 className="itemHeading">{name}</h1>
          <p className="itemDesc">{description}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseItemDetails()
  }

  renderFailureView = () => (
    <div className="failureViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#4656a1" />
    </div>
  )

  renderDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="courseItemDetailsContainer">
        {this.renderDetailsView()}
      </div>
    )
  }
}
export default CourseItemDetails
