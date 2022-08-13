const getById = (i, array) => {
  const item = array.filter(item => item.id === i)
  return item
}

const randomItem = (array) => {
  return Math.ceil(Math.random()*array.length);
}

const randomId = () => {
  return Math.ceil(Math.random() * 10000)
}

module.exports = { getById, randomId, randomItem }