import { useState } from 'react'

function LazyImage({ className, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`${className} bg-slate-900`}>
      <img
        className={`${className} ${
          loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } transition-all duration-1000`}
        loading="lazy"
        onLoad={() => {
          setLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

export default LazyImage
