import { forwardRef } from 'react'

const Container = forwardRef(function Container(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={`px-2 md:px-12 ${className}`} {...props}>
      {children}
    </div>
  )
})

export default Container
