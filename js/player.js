import Arena from './arena'
import Main from './main.js'
import Score from './score.js'

const SNAKE_KEY = 'SNAKE_765'
const elSelect = document.querySelector('.colors')

const changeColor = e => {
  const color = e.target.value
  snake.color = color
  localStorage.setItem(SNAKE_KEY,color)
}

elSelect.addEventListener('change', changeColor)

const getSnakeColor = () => {
  return localStorage.getItem(SNAKE_KEY) || 'green'
}

const snake = {
  color: getSnakeColor(),
  direction: 'up',
  location: [[4, 4]],
  sprites: {
    back: 
    'https://i.ibb.co/GtSr9Sn/oie-transparent-1.png',
    side: 'https://i.ibb.co/vXr0dLn/19ee57197ac16fc8477520580c1b06f2-1.png',
    front: 
    'https://i.ibb.co/LgXSK4z/oie-transparent.png'
  }
}

const cleanLastSlut = () => {
  const tail = snake.location[snake.location.length - 1]
  const arena = Arena.getArena()
  arena[tail[0]][tail[1]] = 0
  Arena.setArena(arena)
}

const handleColision = type => {
  switch (type) {
    case 'wall':
      Main.endGame()
      break
  }
}

const isValidSlut = slut => {
  const size = Arena.size
  if (
    slut[0] === size[0] ||
    slut[1] === size[1] ||
    slut[0] < 0 ||
    slut[1] < 0
  ) {
    handleColision('wall')
    return false
  }
  return true
}

const move = () => {
  const arena = Arena.getArena()
  const lastLocation = snake.location[0]
  cleanLastSlut(lastLocation)
  switch (snake.direction) {
    case 'up':
      const newLocation = [
        lastLocation[0],
        lastLocation[1] - 1
      ]
      if (isValidSlut(newLocation)) {
        snake.location.unshift(newLocation)
        snake.location.pop()
      }
      break;
    case 'down':
      const newLocation = [
        lastLocation[0],
        lastLocation[1] + 1
      ]
      if (isValidSlut(newLocation)) {
        snake.location.unshift(newLocation)
        snake.location.pop()
      }
      break
    case 'right':
      const newLocation = [
        lastLocation[0] + 1,
        lastLocation[1]
      ]
      if (isValidSlut(newLocation)) {
        snake.location.unshift(newLocation)
        snake.location.pop()
      }
      break
    case 'left':
      const newLocation = [
        lastLocation[0] - 1,
        lastLocation[1]
      ]
      if (isValidSlut(newLocation)) {
        snake.location.unshift(newLocation)
        snake.location.pop()
      }
      break
  }
  const location = snake.location[0]
  if (arena[location[0]][location[1]] === 1) {
    Arena.getApple()
    Score.add()
    snake.location.push(lastLocation)
  }
}

export default {
  snake,
  move
}
