import { useEffect, useRef, useState } from 'react'

function LazyImage({ className, ...props }) {
  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let imageRefValue

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        imageRefValue.src = imageRefValue.dataset.src
        imageRefValue.srcset = imageRefValue.dataset.srcset
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
  }, [])

  return (
    <div className={`${className} bg-slate-900`}>
      <img
        ref={imageRef}
        className={`${className} ${
          loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } transition-all duration-1000`}
        onLoad={() => {
          setLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

export default LazyImage
