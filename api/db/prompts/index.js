const prompts = [
  "Smelly Cat", "Tin foil hat", "Rain on my parade",
  "Unicorn Helmet","Stone Cold Stunner","best breakfast ever"
]

 shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

module.exports = shuffle(prompts)
