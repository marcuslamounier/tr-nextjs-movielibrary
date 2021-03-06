import axios from 'axios'
import { dynamicSort } from '../util'

const BASE_URL = "http://localhost:3001/api/v1"
  
export const getMovies = () => {  
  return axios.get(`${BASE_URL}/movies`).then(res => res.data.sort(dynamicSort("-rating")))
}
  
export const getMoviesByCategory = (category) => {
  return (category !== 'all') ?
    axios.get(`${BASE_URL}/movies/categories/${category}`).then(res => res.data) :
    getMovies()
}
  
export const createMovie = (movie) => {
  movie.id = Math.random().toString(36).substr(2,7)
  return axios.post(`${BASE_URL}/movies`, movie).then(res => res.data)
}
  
export const getMovieById = (movieId) => {
  return axios.get(`${BASE_URL}/movies/${movieId}`).then(res => res.data)
}
  
export const updateMovie = (movie) => {
  return axios.patch(`${BASE_URL}/movies/${movie.id}`, movie).then(res => res.data)
}
  
export const deleteMovie = (movieId) => {  
  return axios.delete(`${BASE_URL}/movies/${movieId}`).then(res => res.data)
}
  
export const getPosts = () => {  
  return axios.get(`${BASE_URL}/posts`).then(res => res.data)
}
  
export const getCategories = (movies) => {

  let categories = []
  movies.map(m => {

    let catsMovie = m.genre.split(",")

    catsMovie.forEach(catMovie => {
      if (categories === []){
        categories.push({name: `${catMovie}`})
      }
      else {
        let exist = false
        categories.map((category) => {
          if (category.name === catMovie) {
            exist = true
          }
        })
        if (!exist) {
          categories.push({name: `${catMovie}`})
        }
      }
    })
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(categories.sort(dynamicSort("name")))
      reject('Cannot fetch data!')
    }, 50)
  })
  
}