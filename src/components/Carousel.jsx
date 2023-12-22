import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import classes from './Carousel.module.css'
import LazyImage from './LazyImage'
import StarRating from './StarRating'

function Carousel({ title, items }) {
  const itemsRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  function handleClick(direction) {
    // The element connected to itemsRef is using content-box sizing.
    // Use getComputedStyle to get the width without padding.
    const width = +getComputedStyle(itemsRef.current).width.replace('px', '')
    if (direction === 'left') {
      itemsRef.current.scrollLeft -= width
    } else if (direction === 'right') {
      itemsRef.current.scrollLeft += width
    }
  }

  function handleScroll(evt) {
    if (evt.target.scrollLeft <= 0) {
      setShowLeftButton(false)
      setShowRightButton(true)
    } else if (
      evt.target.scrollLeft + evt.target.clientWidth >=
      evt.target.scrollWidth
    ) {
      setShowLeftButton(true)
      setShowRightButton(false)
    } else {
      setShowLeftButton(true)
      setShowRightButton(true)
    }
  }

  return (
    <div className="my-14">
      <h2 className="mb-4 px-2 text-2xl font-bold md:px-12">{title}</h2>
      <div className="relative flex">
        <AnimatePresence>
          {showLeftButton && (
            <CarouselButton
              className="left-0 rounded-r-lg border-l-0"
              onClick={() => handleClick('left')}
            >
              &lsaquo;
            </CarouselButton>
          )}
        </AnimatePresence>
        <div
          ref={itemsRef}
          className={`${classes.items} box-content flex snap-x gap-2 overflow-x-auto overscroll-x-none scroll-smooth px-2 md:px-12`}
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className="flex-none basis-[calc((100%-(1*0.5rem))/2)] snap-start scroll-ml-2 overflow-hidden sm:basis-[calc((100%-(2*0.5rem))/3)] md:scroll-ml-12 lg:basis-[calc((100%-(3*0.5rem))/4)] xl:basis-[calc((100%-(4*0.5rem))/5)] 2xl:basis-[calc((100%-(5*0.5rem))/6)]"
            >
              <LazyImage
                dataSrc={`https://image.tmdb.org/t/p/w185${item.posterPath}`}
                dataSrcSet={`
                  https://image.tmdb.org/t/p/w92${item.posterPath} 92w,
                  https://image.tmdb.org/t/p/w154${item.posterPath} 154w,
                  https://image.tmdb.org/t/p/w185${item.posterPath} 185w,
                  https://image.tmdb.org/t/p/w342${item.posterPath} 342w,
                  https://image.tmdb.org/t/p/w500${item.posterPath} 500w,
                  https://image.tmdb.org/t/p/w780${item.posterPath} 780w,
                  https://image.tmdb.org/t/p/original${item.posterPath} 980w,
                `}
                sizes={`
                  (max-width: 639px) 309px,
                  (max-width: 767px) 246px,
                  (max-width: 1023px) 304px,
                  (max-width: 1279px) 266px,
                  (max-width: 1535px) 262px,
                  217px
                `}
                alt={item.title}
                containerClassName="aspect-[6/9] rounded-lg"
                className="w-full rounded-[inherit] object-cover"
              />
              <div className="hidden h-14 flex-col justify-around px-1 md:flex">
                <p className="text-md mt-1 truncate">{item.title}</p>
                {item.rating && <StarRating rating={item.rating} />}
              </div>
            </Link>
          ))}
        </div>
        <AnimatePresence>
          {showRightButton && (
            <CarouselButton
              className="right-0 rounded-l-lg border-r-0"
              onClick={() => handleClick('right')}
            >
              &rsaquo;
            </CarouselButton>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CarouselButton({ className, children, ...props }) {
  return (
    <motion.button
      type="button"
      className={`absolute bottom-14 top-0 z-10 hidden w-8 flex-none items-center justify-center border-2 border-slate-50/20 bg-slate-900/90 text-5xl text-slate-300 md:flex md:w-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Carousel
