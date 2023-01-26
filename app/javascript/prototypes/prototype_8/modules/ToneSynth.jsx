import React, { Component } from 'react'
import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { settings, handleValueChange } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="ToneSynth">
        <SC_ToggleButtonSet
          name="wave"
          options={options}
          value={settings.synth.oscillator.type}
          property="synthType"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="synth envelope attack"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.attack}
          property="synthEnvelopeAttack"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="synth envelope decay"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.decay}
          property="synthEnvelopeDecay"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="synth envelope sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="synth envelope release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={handleValueChange}
        />

        {/* <SC_Slider
          name="Volume"
          min={-100}
          max={20}
          step={1}
          value={settings.synth.volume}
          property="synthVolume"
          handleChange={handleValueChange}
        /> */}
      </div>
    )
  }
}