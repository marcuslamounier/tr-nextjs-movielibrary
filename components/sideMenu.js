import Link from 'next/link'
import { useRouter } from 'next/router'
import { createMovie } from '../actions/index'
import Modal from './modal'
import MovieCreateForm from './movieCreateForm'

const SideMenu = (props) => {

    const categories = props.categories
    let modal = null

    const router = useRouter()

    const handleCreateMovie = (movie) => {
        createMovie(movie).then(createdMovie => {
            modal.closeModal()
            router.push('/')
        })
    }
    
    return (
        <div>
            <Modal ref={element => modal = element} hasSubmit={false}>
                <MovieCreateForm categories={categories} handleFormSubmit={handleCreateMovie}/>
            </Modal>
            <div className="list-group mt-5">
                <a
                    onClick={() => props.changeCategory("all")}
                    key="all"
                    href="#"
                    className={
                        `list-group-item text-capitalize 
                        ${'all' === props.activeCategory ? 'active' : ''}`
                    }
                >All</a>
                {categories.map(category => (
                    // <Link key={`c-${category.id}`} href="/categories/[name]" as={`/categories/${category.name}`}>
                        <a
                            onClick={() => props.changeCategory(category.name)}
                            key={category.name}
                            href="#"
                            className={
                                `list-group-item text-capitalize 
                                ${category.name === props.activeCategory ? 'active' : ''}`
                            }
                        >{category.name}</a>
                    // </Link>
                ))}
            </div>
        </div>
    )
}

SideMenu.getInitialProps = async() => {
    const cats = await props.categories
    return cats
}


export default SideMenu