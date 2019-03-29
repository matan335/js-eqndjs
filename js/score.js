import Main from './main'

const elScore = document.querySelector('.score')
let score = 0

const render = () => {
  let scoreCopy = String(score)
  while(scoreCopy.length < 8 ) {
    scoreCopy = '0' + scoreCopy
  }
  elScore.innerHTML = scoreCopy
}

render()

const add = () => {
  score += Main.appleVal
  render()
}

const restart = () => {
  score = 0
  render()
}

export default {
  add,
  restart
}