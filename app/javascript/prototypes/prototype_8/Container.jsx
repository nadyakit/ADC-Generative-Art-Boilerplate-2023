import * as Tone from 'tone'
import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'
import React, { Component } from 'react'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'
import ToneSynth from './modules/ToneSynth.jsx'

let bassSynth
let bassChorus
let bassPingPongDelay

let melodySynth
let melodyChorus
let melodyPingPongDelay

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      melodySettings
    }
  }

  handleEnd = () => {
    Tone.Transport.stop()
  }

  handleStart = () => {
    const { melodySettings, bassSettings  } = this.state

    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()
    bassPingPongDelay = new Tone.PingPongDelay(
      bassSettings.pingPongDelay
    ).toDestination()

    bassSynth.chain(bassChorus, bassPingPongDelay)

    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = true

    melodySynth = new Tone.Synth(melodySettings.synth)
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start()
    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    ).toDestination()

    melodySynth.chain(melodyChorus, melodyPingPongDelay)

    const melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings.sequence.steps).start(0)

    melodyPart.loopEnd = melodySettings.sequence.duration
    melodyPart.loop = true

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, drumsSettings.sequence.steps).start(0)

    drumsPart.loopEnd = drumsSettings.sequence.duration
    drumsPart.loop = true

    Tone.Transport.start()
  }

  handleBassValueChange = (property, value) => {
    const { bassSettings } = this.state

    if (property === 'synthType') {
      bassSynth.oscillator.type = value
      bassSettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      bassSynth.envelope.attack = value
      bassSettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      bassSynth.envelope.decay = value
      bassSettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      bassSynth.envelope.sustain = value
      bassSettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      bassSynth.envelope.release = value
      bassSettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    }

    this.setState({
      bassSettings
    })
  }

  handleMelodyValueChange = (property, value) => {
    const { melodySettings } = this.state

    if (property === 'synthType') {
      melodySynth.oscillator.type = value
      melodySettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      melodySynth.envelope.attack = value
      melodySettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      melodySynth.envelope.decay = value
      melodySettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      melodySynth.envelope.sustain = value
      melodySettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      melodySynth.envelope.release = value
      melodySettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      melodyPingPongDelay.wet.value = value
      melodySettings.pingPongDelay.wet = value
    } else if (property === 'chorusWet') {
      melodyChorus.wet.value = value
      melodySettings.chorus.wet = value
    }

    this.setState({
      melodySettings
    })
   
  }

  render() {
    const { bassSettings, melodySettings } = this.state

    return (
      <div className="Container">
        <div className="PlayStop">
          <SC_Button
            text="play"
            handleClick={this.handleStart}
          />

          <SC_Button
                text="stop"
                handleClick={this.handleEnd}
          />
        </div>
        <div className="DelayChorus">
          <SC_Slider
            name="delay_wet"
            min={0}
            max={1}
            step={0.01}
            value={bassSettings.pingPongDelay.wet}
            property="pingPongDelayWet"
            handleChange={this.handleBassValueChange}
          />

          <SC_Slider
            name="chorus_wet"
            min={0}
            max={1}
            step={0.01}
            value={bassSettings.chorus.wet}
            property="chorusWet"
            handleChange={this.handleBassValueChange}
          />
        </div>
        
        <div className="melodies">
          <div className="BassStyle">
            <h2>print.png</h2>
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
          </div>
          <div className="MelodyStyle">
            <h2>this.jpeg</h2>
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
          </div>
        </div>
      </div>
      
    )
  }
}