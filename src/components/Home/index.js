import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Courses from '../Courses'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {list: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({list: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {list} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="unOrderListContainer">
          {list.map(eachItem => (
            <Courses courseDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetryButton = () => {
    this.getCourses()
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
      <button
        className="button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#4656a1" />
    </div>
  )

  renderSwitchDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div className="homeContainer">{this.renderSwitchDetails()}</div>
  }
}
export default Home
