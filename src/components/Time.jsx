import React, { Component } from 'react'
import moment from 'moment'

class Time extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentTime: new Date().getTime(),
      currentTimeDynamic: new Date().getTime()
    }
  }

  componentDidMount() {
    // Start counting at mount, not ideal but...
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // Update current time
  tick() {
    this.setState({
      currentTimeDynamic: new Date().getTime()
    });
  }

  // Get formatted diff time with dd:hh:mm:ss
  _getDiffWithTime(diffDuration) {
    let days = diffDuration.days().toString()
    days = days.replace('-', '')

    let hours = diffDuration.hours().toString()
    hours = hours.replace('-', '')

    let minutes = diffDuration.minutes().toString()
    minutes = minutes.replace('-', '')

    let seconds = diffDuration.seconds().toString()
    seconds = seconds.replace('-', '')

    const diffWithTime = `${days} days, ${hours}h, ${minutes}m and ${seconds}s ago`
    return diffWithTime
  }

  render() {

    // Target time as moment object
    const targetTimeMoment = moment(this.props.targetTime)

    // Time with dd
    const timeDiff = targetTimeMoment.fromNow()

    // Current time either dynamic or static
    const currentTimeMoment = moment(this.props.dynamic ? this.state.currentTimeDynamic : this.state.currentTime)
    
    // Time difference between target time and now
    const diff = targetTimeMoment.diff(currentTimeMoment);
    // Time duration difference between target and now
    const diffDuration = moment.duration(diff);
    
    // Get time with dd:hh:mm:ss
    const diffWithTime = this._getDiffWithTime(diffDuration)

    return (
      <div id="time-component">
        Published {this.props.includeTime ? diffWithTime : timeDiff}
      </div>
    )
  }
}
export default Time