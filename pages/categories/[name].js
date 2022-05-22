import ProductList from "../../components/productList"
import { getMoviesByCategory } from "../../actions/index"
import { dynamicSort } from "../../util"
import { useState } from "react"
import Link from "next/link"

const Category = (props) => {

    const movies = props.movies
    const category = props.category

    let productList = new ProductList()

    const [sort, setSort] = useState('-rating')

    const handleSortChange = (event) => {
        const { options } = event.target
        let sortBy = sort

        for (let i = 0; i < options.length; i++){
            if (options[i].selected){
                sortBy = options[i].value
            }
        }

        setSort(sortBy)
    }
 
    return (
        <div>
            <div className="row">
                <div className="col col-8">
                    <h1 className="text-capitalize">Category: {category}</h1>
                </div>
                <div className="col col-4">
                    <Link key={category} href="/categories/[name]" as={`/categories/all`}>
                        <a>View all categories</a>
                    </Link>
                    <span className="ml-5">Sort By:</span>
                    <select
                        className="ml-2"
                        onChange={handleSortChange}
                    >
                        <option value="-rating">Best</option>
                        <option value="name">A-Z</option>
                        <option value="-name">Z-A</option>
                        <option value="-releaseYear">Newest</option>
                        <option value="releaseYear">Oldest</option>
                    </select>
                </div>
            </div>
            <div className="row pt-4">
                {productList.renderMovies(movies.sort(dynamicSort(sort)))}
            </div>
        </div>
    )

}

Category.getInitialProps = async ({ query }) => {
    const movies = await getMoviesByCategory(query.name)
    const category = query.name 
    return {
        movies,
        category
    }
}

export default Category