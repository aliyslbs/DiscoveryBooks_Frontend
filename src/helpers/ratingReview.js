import React from 'react'



const RatingReview = React.forwardRef(({ rating, setRating }, ref) => {
    return (
        <div ref={ref}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star, index) => {
                return (
                    <span
                        key={index}
                        className='start'
                        style={{
                            cursor: 'pointer',
                            color: rating >= star ? 'gold' : 'gray',
                            fontSize: `35px`,
                        }}
                        onClick={() => {
                            setRating(star)
                        }}
                    >
                        {' '}
                        ★{' '}
                    </span>
                )
            })}
        </div>
    )
})
export default RatingReview;