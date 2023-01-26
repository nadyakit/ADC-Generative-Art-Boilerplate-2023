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

function createSlider() {
  const container = document.getElementById('prototype_3')
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

document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('prototype_3')
  const text_first = document.createElement('div')
  const fig_a = document.createElement('div')
  const fig_b = document.createElement('div')
  const fig_c = document.createElement('div')
  const fig_d = document.createElement('div')
  const fig_e = document.createElement('div')
  const fig_f = document.createElement('div')

  text_first.innerText = 'My collection of forms :^)'
  text_first.classList.add('text_first')
  fig_a.classList.add('fig_a')
  fig_b.classList.add('fig_b')
  fig_c.classList.add('fig_c')
  fig_d.classList.add('fig_d')
  fig_e.classList.add('fig_e')
  fig_f.classList.add('fig_f')

  container.appendChild(text_first)
  container.appendChild(fig_a)
  container.appendChild(fig_b)
  container.appendChild(fig_c)
  container.appendChild(fig_d)
  container.appendChild(fig_e)
  container.appendChild(fig_f)

  // createSlider()

  // frame.addEventListener('click', () => {
  //   createOscillator()
  // })
})
