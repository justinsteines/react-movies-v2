import { Link } from 'react-router-dom'

import Container from './Container'
import LazyImage from './LazyImage'
import StarRating from './StarRating'

function Hero({ link, title, overview, rating, ratingCount, backdropPath }) {
  let header = (
    <h1 className="my-5 text-3xl font-bold text-slate-100 lg:text-4xl">
      {title}
    </h1>
  )

  if (link) {
    header = <Link to={link}>{header}</Link>
  }

  return (
    <div className="lg:relative lg:flex">
      <div className="relative flex max-h-[30rem] items-center overflow-hidden lg:ml-auto lg:w-2/3">
        <LazyImage
          dataSrc={`https://image.tmdb.org/t/p/w780${backdropPath}`}
          dataSrcSet={[
            `https://image.tmdb.org/t/p/w300${backdropPath} 300w`,
            `https://image.tmdb.org/t/p/w780${backdropPath} 780w`,
            `https://image.tmdb.org/t/p/w1280${backdropPath} 1280w`,
            `https://image.tmdb.org/t/p/original${backdropPath} 1650w`,
          ].join(', ')}
          alt={title}
          sizes="(max-width: 1023px) 100vw, 66vw"
          containerClassName="aspect-video w-full bg-slate-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:via-transparent after:via-15% lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:right-0 lg:before:top-0 lg:before:z-10 lg:before:bg-gradient-to-r lg:before:from-slate-950 lg:before:via-transparent lg:before:via-50%"
          className="w-full object-cover"
        />
      </div>
      <Container className="flex items-center lg:absolute lg:z-20 lg:h-full lg:w-1/2">
        <div>
          {header}
          <StarRating
            rating={rating}
            ratingCount={ratingCount}
            className="my-4 lg:my-6"
          />
          <p className="line-clamp-3 text-slate-300">{overview}</p>
        </div>
      </Container>
    </div>
  )
}

export default Hero
