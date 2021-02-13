const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, value) => {
    return sum + value.likes
  }
  return array.reduce(reducer, 0)
}
  
const favoriteBlog = (array) => {
  return array.reduce((max, value) => (value.likes > max ? value.likes : max),
  {
    title: array[0].title,
    author: array[0].author,
    likes: array[0].likes
  })
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
