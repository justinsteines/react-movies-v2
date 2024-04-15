import classes from './StarRating.module.css'

function StarRating({ rating, ratingCount, className }) {
  const stars = (rating / 2).toFixed(1)
  const percentage = (stars / 5) * 100 + '%'

  return (
    <div className={`relative h-6 w-28 ${className}`}>
      {ratingCount > 0 && (
        <>
          <div
            style={{ '--percentage': percentage }}
            className={`${classes.stars} before:absolute before:bg-clip-text before:text-transparent before:content-['★★★★★'] after:absolute after:text-sky-400 after:content-['☆☆☆☆☆']`}
          />
          <div className="absolute left-[90px] text-base text-slate-400">
            {stars}
          </div>
        </>
      )}
      {ratingCount <= 0 && <small className="text-slate-400">No Rating</small>}
    </div>
  )
}

export default StarRating
