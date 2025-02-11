let container
let audioCtx
let oscillator

function createOscillator(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
}

function changeOscillatorFrequency() {
  const slider = document.getElementById('slider')
  oscillator.frequency.setValueAtTime(slider.value, audioCtx.currentTime); // value in hertz
}

function changeOscillatorType (type) {
  oscillator.type = type
}

function createSlider() {
  const slider = document.createElement('input')
  slider.type = 'range'
  slider.min = 0
  slider.max = 100
  slider.value = 440
  slider.id = 'slider'
  container.appendChild(slider)

  slider.addEventListener('input', () => {
    changeOscillatorFrequency()
  })
}

function createButton(text, callback, parameter) {
 const button = document.createElement('div') 
 button.innerText = text
 button.classList.add('button')
 container.appendChild(button)

  button.addEventListener('click', () => {
    callback(parameter)
  })
}

function createOscillatorTypeButtons () {
  const types = ['sine', 'square', 'sawtooth', 'triangle']

  types.forEach((type, i) => {
    createButton(type, changeOscillatorType, type)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const frame = document.createElement('div')
  frame.innerText = 'Art Design & Coding Community'
  frame.classList.add('frame')

  container = document.getElementById('prototype_4')
  container.appendChild(frame)


  frame.addEventListener('click', () => {
    createOscillator()
    createSlider()
    createOscillatorTypeButtons()
  })
})
