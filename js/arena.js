import utiles from './utiles.js'
import player from './player.js'

const size = [7, 6]
let arena = []
// 0 is blank , 1 is a apple , 2 is snake

const initializeArena = () => {
  arena = []
  for (let i = 0; i < size[0]; i++) {
    const column = []
    for (let j = 0; j < size[1]; j++) {
      column.push(0)
    }
    arena.push(column)
  }
}

initializeArena()

const elArena = document.querySelector('.arena')

const getSnakeSprite = () => {
  const { direction, sprites } = player.snake
  switch (direction) {
    case 'up':
      return sprites.back
    case 'down':
      return sprites.front
    case 'left':
      return sprites.side 
    case 'right':
      return `
     ${sprites.side}"style="-webkit-transform: scaleX(-1);
      transform: scaleX(-1);
     `
    default: ''
  }
}

const getSlutStyle = value => {
  const color = player.snake.color
  switch (value) {
    case 0:
      return ''
    case 1:
  return '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQe5t1DIEGJsjRAueaZpfnseA_oQ9ZrMW3k7Ia9dnbVoCvT_pO4" class="slut apple"/>'
    case 2:
      return `<div class="snake" style="background-color:${color};"
      ></div>`
    case 2.5:
      return `<img src="${getSnakeSprite()}" class="slut ${color}"
      style=""/>
      `
      case 2.2:

      return `<div class="snake" style="background-color:${'black'};"
      ></div>`
  }
}

const render = () => {
  getSnake()
  let strHTML = ''
  arena[0].forEach((_, j) => {
    let row = '<tr>'
    for (let i = 0; i < arena.length; i++) {
      let value = arena[i][j]
      let slut = `
      <td>
       ${getSlutStyle(value)}
      </td>`
      row += slut
    }
    row += '</tr>'
    strHTML += row
  })
  elArena.innerHTML = strHTML
}

const getApple = () => {
  const slut = utiles.getRandomSlut(size)
  if (arena[slut[0]][slut[1]] === 0) arena[slut[0]][slut[1]] = 1
  else getApple()
}

const getSnake = () => {
  const location = player.getSnake()
  location.forEach((snakeSlut, i) => {
    let value 
    switch(i) {
      case 0:
        value = 2.5
        break
      case location.length-1:
        value = 2.2
        break
      default:
      value = 2
    }
    arena[snakeSlut[0]][snakeSlut[1]] = value
  })
}

const startArena = () => {
  getApple()
  render()
}

const getArena = () => arena

const setArena = newArena => {
  arena = newArena
}

export default {
  startArena,
  arena,
  render,
  getApple,
  size,
  initializeArena,
  getSnake,
  getArena,
  setArena
}