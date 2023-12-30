import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import classes from './Carousel.module.css'
import Container from './Container'
import LazyImage from './LazyImage'

function Carousel({
  title,
  items,
  itemsPerPage = { mobile: 2, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 6 },
}) {
  const itemsRef = useRef(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

  useEffect(() => {
    // Show the right button if the items container is scrollable.
    if (itemsRef.current.clientWidth !== itemsRef.current.scrollWidth) {
      setShowRightButton(true)
    }
  }, [])

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
      <Container>
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      </Container>
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
        <Container
          ref={itemsRef}
          className={`${classes.items} box-content flex w-full snap-x gap-2 overflow-x-auto overscroll-x-none scroll-smooth`}
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              link={item.link}
              itemsPerPage={itemsPerPage}
            >
              <CarouselItemImage imagePath={item.imagePath} alt={item.title} />
              {item.title && (
                <CarouselItemTitle
                  title={item.title}
                  subtitle={item.subtitle}
                />
              )}
            </CarouselItem>
          ))}
        </Container>
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
      className={`absolute bottom-16 top-0 z-10 hidden w-8 flex-none items-center justify-center border-2 border-slate-50/20 bg-slate-900/90 text-5xl text-slate-300 md:flex md:w-10 ${className}`}
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

function CarouselItem({ link, itemsPerPage, children }) {
  let classes = ''

  // Generate classes to show the specified number of carousel items at a time
  // based on screen size. These classes will need to be safe-listed in the
  // tailwind config.
  for (const [breakpoint, numItems] of Object.entries(itemsPerPage)) {
    if (breakpoint === 'mobile') {
      classes += `basis-[calc((100%-(${numItems - 1}*0.5rem))/${numItems})]`
      continue
    }
    classes += ` ${breakpoint}:basis-[calc((100%-(${
      numItems - 1
    }*0.5rem))/${numItems})]`
  }

  return (
    <Link
      to={link}
      className={`flex-none snap-start scroll-ml-2 overflow-hidden md:scroll-ml-12 ${classes}`}
    >
      {children}
    </Link>
  )
}

function CarouselItemImage({ imagePath, alt }) {
  return (
    <LazyImage
      dataSrc={`https://image.tmdb.org/t/p/w185${imagePath}`}
      dataSrcSet={`
        https://image.tmdb.org/t/p/w92${imagePath} 92w,
        https://image.tmdb.org/t/p/w154${imagePath} 154w,
        https://image.tmdb.org/t/p/w185${imagePath} 185w,
        https://image.tmdb.org/t/p/w342${imagePath} 342w,
        https://image.tmdb.org/t/p/w500${imagePath} 500w,
        https://image.tmdb.org/t/p/w780${imagePath} 780w,
        https://image.tmdb.org/t/p/original${imagePath} 980w,
      `}
      sizes={`
        (max-width: 639px) 309px,
        (max-width: 767px) 246px,
        (max-width: 1023px) 305px,
        (max-width: 1279px) 267px,
        (max-width: 1535px) 263px,
        218px
      `}
      alt={alt}
      containerClassName="aspect-[6/9] rounded-lg"
      className="w-full rounded-[inherit] object-cover"
    />
  )
}

function CarouselItemTitle({ title, subtitle }) {
  return (
    <div className="hidden h-16 flex-col px-1 md:flex">
      <div className="mt-2 truncate text-lg">{title}</div>
      {subtitle && <div className="truncate text-slate-400">{subtitle}</div>}
    </div>
  )
}

export default Carousel
