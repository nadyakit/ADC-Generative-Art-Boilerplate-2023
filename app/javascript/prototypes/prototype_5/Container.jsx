import React, { Component } from 'react'
import SC_Button from './SC_Button';
import SC_ToggleButtonSet from './SC_ToggleButtonSet';

export default class Container extends Component {
  constructor(props) {
    super(props)

    let audioCtx

    let oscillator = {
      settings: {
        type: 'square'
      },
      node: {}
    }

    this.state = {
      audioCtx,
      oscillator
    }

  }
  

  createOscillator = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillatorNode = audioCtx.createOscillator();

    const {oscillator} = this.state
  
    oscillatorNode.type = oscillator.settings.type
    oscillatorNode.frequency.setValueAtTime(440, audioCtx.currentTime); 
    oscillatorNode.connect(audioCtx.destination);
    oscillatorNode.start();

    this.setState({
      audioCtx,
      oscillator: {
        settings: {
          type: oscillator.settings.type
        },
      node: oscillatorNode
      }
    })

  }

  handleOscillatorPropertyChange = (property, value) => {
    const {audioCtx, oscillator} = this.state

    if (property === 'type'){
     oscillator.node.type = value
     oscillator.settings.type = value

     this.setState({
      oscillator
     })
    }

    if (property === 'frequency') {
      // some code
    }
  }

  render() {
    const options = ['sine', 'square', 'sawtooth', 'triangle']
    const {oscillator}=this.state

    return (
      <div className="Container">
        <SC_Button 
          text="PLAY" 
          handleClick={this.createOscillator} 
        />

        <SC_ToggleButtonSet
          name="Type"
          options={options}
          value={oscillator.settings.type} 
          property="type"
          handleChange={this.handleOscillatorPropertyChange}
        />
      </div>
    )
  }
}