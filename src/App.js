import React, { Component } from 'react'
import './App.css';
import Time from './components/Time'
import { 
  TextField,
  Switch
} from '@material-ui/core'

class App extends Component {

  constructor(props) {
    super(props)

    const date = new Date()
    const today = date.toISOString().split('T')
    const time = today[1].split(':')
    const todayTime = `${today[0]}T${time[0]}:${time[1]}`

    this.state = {
      todayTime: todayTime,
      targetTime: '2020-05-10T13:37',
      includeTime: false,
      dynamic: false
    }
  }

  render() {
    
    return (
      <div className="App">
        <form noValidate>
          <TextField
            id="datetime-local"
            label="From"
            type="datetime-local"
            InputProps={{inputProps: { max: this.state.todayTime} }}
            value={this.state.targetTime}
            onChange={e => this.setState({targetTime: e.target.value})}
          />
        </form>

        <label>Should be dynamic</label>
        <Switch 
          checked={this.state.dynamic}
          onChange={e => this.setState({dynamic: e.target.checked})}
        />

        <br />
        
        <label>Show time</label>
        <Switch 
          checked={this.state.includeTime}
          onChange={e => this.setState({includeTime: e.target.checked})}
        />

        <div id="fake-article">
          <h2>Space, the final frontier.</h2>
          <p>
            These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before. Many say exploration is part of our destiny, but it’s actually our duty to future generations and their quest to ensure the survival of the human species.
          </p>
        </div>

        <Time 
          targetTime={this.state.targetTime}
          includeTime={this.state.includeTime}
          dynamic={this.state.dynamic}
        />
      </div>
    );
  }

}
export default App
