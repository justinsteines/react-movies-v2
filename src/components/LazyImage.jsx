import { useEffect, useRef, useState } from 'react'

function LazyImage({
  dataSrc,
  dataSrcSet,
  containerClassName,
  className = '',
  ...props
}) {
  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let imageRefValue

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        imageRefValue.src = dataSrc
        imageRefValue.srcset = dataSrcSet
        observer.unobserve(imageRefValue)
      }
    })

    if (imageRef.current) {
      observer.observe(imageRef.current)
      imageRefValue = imageRef.current
    }

    return () => {
      if (imageRefValue) {
        observer.unobserve(imageRefValue)
      }
    }
  }, [dataSrc, dataSrcSet])

  return (
    <div className={`${containerClassName} bg-slate-900`}>
      <img
        ref={imageRef}
        className={`${className} ${
          loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } h-full transition-all duration-1000`}
        onLoad={() => {
          setLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

export default LazyImage
