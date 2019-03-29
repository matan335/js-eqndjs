import Arena from './arena'
import Player from './player'
import Controls from './controls'
import nipplejs from 'nipplejs'
import Score from './score'

const init = () => { }
const elTimer = document.querySelector('.timer')
let timerVal = '00:00'
elTimer.innerHTML = timerVal
const timerInterval
const moveInterval
const appleVal = 100
let isGameEnd = false

const colors = [
  'red','blue','grey','green','yellow','black'
]
const elColorsSelect = document.querySelector('.colors')
let colorsStrHTML

colors.forEach(color => {
  colorsStrHTML += `<option>${color}</option>`
})

elColorsSelect.innerHTML = colorsStrHTML

const startTimer = () => {
  timerInterval = setInterval(() => {
    const time = timerVal.split(':')
    let [min, sec] = time
    let num = Number(sec)
    if (num >= 59) {
      min = Number(min)
      min++
      num = 0
    }
    else num++
    num = String(num)
    min = String(min)
    if (num.length < 2) num = '0' + num
    if (min.length < 2) min = '0' + min
    timerVal = min + ':' + num
    elTimer.innerHTML = timerVal
  }, 1000)

  moveInterval = setInterval(() => {
    Player.move()
    Arena.render()
  }, 700)
}

const startGame = () => {
  isGameEnd = false
  startTimer()
  Arena.startArena()
}

const endGame = () => {
  isGameEnd = true
  clearInterval(timerInterval)
  clearInterval(moveInterval)
  if (!elReplay) return
  elReplay.classList.remove('hiden')
}

const replayGame = () => {
  if (!elReplay) return
  elReplay.classList.add('hiden')

  timerVal = '00:00'
  elTimer.innerHTML = timerVal
  Player.snake.location = [[4, 4]]
  Player.snake.direction = 'up'
  Arena.initializeArena()
  Arena.getSnake()
  Score.restart()
  startGame()
}

const elReplay = document.querySelector('.replay-game')
elReplay.addEventListener('click', replayGame)

startGame()
Controls.handleControls()

const manager = nipplejs.create({
  zone: document.querySelector('.joystick'),
  mode: 'static',
  position: { left: '50%', bottom: '10%' },
  color: 'black'
});

manager.on('move', (_, props) => {
  if (!props.direction) return
  const dir = props.direction.angle
  const currDir = Player.snake.direction
  if (
    isGameEnd ||
    Player.snake.direction === dir ||
    (currDir === 'up' && dir === 'down')
  ) return

  console.log('chaned to',dir)
  Player.snake.direction = dir
  Arena.render()
})

export default {
  init,
  endGame,
  appleVal,
  colors
}
