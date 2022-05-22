import Link from 'next/link'
import React from 'react'

class ProductList extends React.Component {

  splitGenre = (genres) => {
    let categories = []
    let catsMovie = genres.split(",")

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

    return categories
  }

  shortenDesc = (text, maxTextLength) => {
    if (text && text.length >= maxTextLength) {
      return text.substr(0, maxTextLength) + '...'
    }
    return text
  }

  renderMovies(movies) {

    return (
      movies.map((movie) => (
        <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100">
            <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
              <a><img className="card-img-top" src={movie.image} alt="" /></a>
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                  <a>{movie.name} ({movie.releaseYear})</a>
                </Link>
              </h5>
              <p className="movie-genre">
                {this.splitGenre(movie.genre).map(category => 
                  <React.Fragment>
                    <Link key={category.name} href="/categories/[name]" as={`/categories/${category.name}`}>
                      <a className="text-capitalize">{category.name}</a>
                    </Link>
                    <span>, </span>
                  </React.Fragment>
                )}
              </p>
              <p className="card-text">{this.shortenDesc(movie.description, 150)}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">{movie.rating}</small>
            </div>
          </div>
        </div>
      ))
    )

  }

  render() {
    const movies = this.props.movies
    const category = this.props.category

    return (
      <React.Fragment>
        <div className="row">
          {this.renderMovies(movies.slice(0,3))}
          {/* {this.renderMovies(movies)} */}
        </div>
        <div className="col-auto float-right">
          <Link key={category} href="/categories/[name]" as={`/categories/${category}`}>
            <a>View All</a>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

export default ProductList