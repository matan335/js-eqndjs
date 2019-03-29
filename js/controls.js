
const elUpBtn = document.querySelector('.up-btn')
const elDownBtn = document.querySelector('.down-btn')

const handleClick = props => {
  console.log('got props',props)

}

const handleControls = () => {
  return
  elUpBtn.addEventListener('click', () =>   handleClick('up'))
  elDownBtn.addEventListener('click', () => handleClick('down'))



}

export default {
  handleControls
}