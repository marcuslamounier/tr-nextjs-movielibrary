import React from 'react'
import Router from 'next/router'
import MovieCreateForm from '../../../components/movieCreateForm'
import { getCategories, getMovieById, getMovies, updateMovie } from '../../../actions/index'

class EditMovie extends React.Component {

    static async getInitialProps ({query}) {
        const movies = await getMovies()
        const categories = await getCategories(movies)
        const movie = await getMovieById(query.id)
        return {
            query,
            movie,
            categories
        }
    }

    handleUpdateMovie = (movie) => {
        updateMovie(movie).then(updatedMovie => {
            Router.push('/movies/[id]', `/movies/${movie.id}`)
        })
    }

    render() {
        const categories = this.props.categories
        const movie = this.props.movie

        return (
            <div className="container">
                <h1>Edit the Movie</h1>
                <MovieCreateForm
                    submitButtonText="Update"
                    initialData={movie}
                    categories={categories}
                    handleFormSubmit={this.handleUpdateMovie}
                />
            </div>
        )
    }
}

export default EditMovie