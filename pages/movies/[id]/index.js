import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { deleteMovie, getMovieById } from "../../../actions/index"
import ProductList from '../../../components/productList'

const Movie = (props) => {

    const router = useRouter()
    const { movie } = props
    const { id } = router.query

    let productList = new ProductList

    const handleDeleteMovie = (id) => {
        deleteMovie(id).then(() => {
            router.push('/')
        })
    }

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-6">{ movie.name }</h1>
                <p className="lead">{movie.description}</p>
                <div className="d-flex justify-content-center">
                    <img
                        className="d-block img-fluid"
                        src={movie.image}
                        alt={movie.name}
                    />
                </div>
                <hr className="my-4" />
                <p className="movie-genre">
                    {productList.splitGenre(movie.genre).map(category => 
                    <React.Fragment>
                        <Link key={category.name} href="/categories/[name]" as={`/categories/${category.name}`}>
                        <a className="text-capitalize">{category.name}</a>
                        </Link>
                        <span>, </span>
                    </React.Fragment>
                    )}
                </p>
                <button 
                    className="btn btn-primary btn-lg mr-2"
                    href="#"
                    role="button"
                >Learn more</button>
                <Link href="/movies/[id]/edit" as={`/movies/${movie.id}/edit`}>
                    <button
                        className="btn btn-secondary btn-lg mr-2"
                        href="#"
                        role="button"
                    >Edit</button>
                </Link>
                <button
                    onClick={() => handleDeleteMovie(id)}
                    className="btn btn-danger btn-lg mr-2"
                    href="#"
                    role="button"
                >Delete</button>
            </div>
            <p className="text-justify">{movie.longDescription}</p>
        </div>
    )
}

Movie.getInitialProps = async ({ query }) => {
    const movie = await getMovieById(query.id)
    return { movie }
}

export default Movie