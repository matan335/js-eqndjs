const getRandomSlut = size => {
  const slut = []
  size.forEach(num => {
   const rndNum = Math.floor(Math.random()* num)
   slut.push(rndNum)
  })
  return slut
}

export default {
  getRandomSlut
}