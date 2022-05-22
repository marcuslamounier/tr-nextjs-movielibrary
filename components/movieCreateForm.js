import React from 'react'
import { useState } from "react"

const MovieCreateForm = (props) => {

    const defaultData = {
        id: '',
        name: '',
        releaseYear: '',
        description: '',
        longDescription: "",
        rating: '',
        genre: 'Not informed',
        image: '',
        cover: ''
    }

    const formData = props.initialData ? {...props.initialData} : defaultData

    const [form, setForm] = useState(formData)

    const [genres, setGenre] = useState({
        options: '',
        added: ''        
    })

    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        setForm({
            ...form,
            [name]: target.value
        })
        console.log(form)
    }

    const handleGenreChange = (event) => {
        const { options } = event.target
        const optionsLength = options.length
        let value = []

        for (let i = 0; i < optionsLength; i++){
            if (options[i].selected){
                value.push(options[i].value)
            }
        }

        value = value.toString()

        setGenre({
            ...genres,
            options: value
        })

        setForm({
            ...form,
            genre: mergeGenre(value, genres.added)
        })
    }

    const addGenre = (event) => {
        const target = event.target
        setGenre({
            options: genres.options,
            added: target.value
        })
        setForm({
            ...form,
            genre: mergeGenre(genres.options, target.value)
            
        })
    }

    const mergeGenre = (p1, p2) => {
        return ((p1 === "" && p2 === "") ?
            "Not informed" :
            ((p1 === "" || p2 === "") ?
                p1 + p2 :
                p1 + "," + p2
            )
        )
    }

    const submitForm = () => {
        props.handleFormSubmit({...form})
    }
    
    return (
        
        <form>
            <div className="row">
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Lord of the Rings"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    value={form.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Somewhere in Middle-earth..."
                />
            </div>
            <div className="form-group">
                <label htmlFor="releaseYear">Release Year</label>
                <input
                    value={form.releaseYear}
                    onChange={handleChange}
                    name="releaseYear"
                    type="number"
                    min="1888"
                    className="form-control"
                    id="releaseYear"
                    placeholder="2013"
                />
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                    value={form.rating}
                    onChange={handleChange}
                    name="rating"
                    type="number"
                    max="5"
                    min="0"
                    className="form-control"
                    id="rating"
                    placeholder="3"
                />
                <small id="emailHelp" className="form-text text-muted">Max: 5, Min: 0 </small>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                    value={form.image}
                    onChange={handleChange}
                    name="image"
                    type="text"
                    className="form-control"
                    id="image"
                    placeholder="http://....."
                />
            </div>
            <div className="form-group">
                <label htmlFor="cover">Cover</label>
                <input
                    value={form.cover}
                    onChange={handleChange}
                    name="cover"
                    type="text"
                    className="form-control"
                    id="cover"
                    placeholder="http://......"
                />
            </div>
            <div className="form-group">
                <label htmlFor="longDescription">Long Description</label>
                <textarea
                    value={form.longDescription}
                    onChange={handleChange}
                    name="longDescription"
                    className="form-control"
                    id="longDescription"
                    rows="3"
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genres</label>
                <select
                    onChange={handleGenreChange}
                    multiple
                    name="genre"
                    className="form-control"
                    id="genre"
                >
                    {props.categories.map((category) => (
                        <option
                            value={category.name}
                            key={`c-${category.name}`}
                            className="text-capitalize"
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="otherGenre">Other Genres</label>
                <input
                    onChange={addGenre}
                    name="otherGenre"
                    type="text"
                    className="form-control"
                    id="otherGenre"
                    placeholder="genre1,genre2,...,genreN"
                />
            </div>
            <button
                onClick={submitForm}
                type="button"
                className="btn btn-primary"
            >{ props.submitButtonText || "Create" }</button>
        </form>
    )
}

export default MovieCreateForm