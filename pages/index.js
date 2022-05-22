import React, { useState, useEffect } from 'react'
import Carousel from '../components/carousel'
import ProductList from '../components/productList'
import SideMenu from '../components/sideMenu'
import { getCategories, getMovies } from '../actions/index'

const Home = (props) => {

  const [ filter, setFilter ] = useState('all')

  const changeCategory = category => {
    setFilter(category)
  }

  const filterMovies = movies => {
    return (filter === "all") ?
      movies :
      movies.filter(movie => movie.genre.includes(filter))
  }

  return (
    <React.Fragment>
      <div className="col-lg-3">
        <SideMenu
          changeCategory={changeCategory}
          activeCategory={filter}
          categories={props.categories}
        />
      </div>
      <div className="col-lg-9">
        <Carousel images={props.images}/>
        <ProductList
          movies={filterMovies(props.movies) || []}
          category={filter}
        />
      </div>
    </React.Fragment>
  )
  
}


Home.getInitialProps = async() => {
  const movies = await getMovies()
  const images = movies.map((movie) => {
    return {
      id: `image-${movie.id}`,
      url: movie.cover,
      title: movie.name
    }
  })

  const categories = await getCategories(movies)

  return {
    movies,
    images,
    categories
  }
}

export default Home