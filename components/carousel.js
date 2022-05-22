import React from 'react'

const Carousel = (props) => {

  const imgsCarousel = props.images.slice(0,3)

  return (
    <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
      <ol className="carousel-indicators">
        { imgsCarousel.map((image, index) => (
          <li
            key={`movie-${image.id}`}
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
            className={index === 0 ? 'active' : ''}>
          </li>
        )) }
      </ol>
      <div className="carousel-inner" role="listbox">
        { imgsCarousel.map((image, index) => (
          <div key={`movie-${image.id}`} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              className="d-block img-fluid"
              src={image.url}
              alt={image.title} />
          </div>
        )) }
      </div>

      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <style jsx>
        {`
          .carousel-inner {
            max-height: 400px;
          }
        `}
      </style>

    </div>

  )
}

export default Carousel