import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getReviews } from '../utils/api';

const ReviewList = () => {

const { category } = useParams()

const [isLoading, setIsLoading] = useState(true)
const [reviews, setReviews] = useState([])
const [params, setParams] = useState({})
const [buttonText, setButtonText] = useState('Ascending')

useEffect(() => {
    setParams({ category })
}, [category])

useEffect(() => {
    setIsLoading(true)
    getReviews(params)
        .then(({ reviews }) => {
            setReviews(reviews)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
        })
}, [params])

const handleSort = (column) => {
    setParams((currParams) => {
        return {...currParams, sort_by: column}
    })
}

const handleOrder = (order) => {
    if (buttonText === 'Ascending') {
        setButtonText('Descending')
        order = 'ASC'
    } else {
        setButtonText('Ascending')
        order = 'DESC'
    }
    setParams((currParams) => {
        return {...currParams, order}
    })
}

const handleTitle = (title) => {
    setParams((currParams) => {
        return {...currParams, sort_by: title}
    })
}

const handleVotes = (votes) => {
    setParams((currParams) => {
        return {...currParams, sort_by: votes}
    })
}

const handleComments = (comment_count) => {
    setParams((currParams) => {
        return {...currParams, sort_by: comment_count}
    })
}

if (isLoading) {
    return <p>Loading...</p>
}

    return (
        <main>
            <div className='sortingBox'>
            Sort By: <button onClick={() => handleComments('comment_count')}
            >Comments</button>&nbsp;
            <button onClick={() => handleSort('created_at')}>Date</button> &nbsp;
            <button onClick={() => handleTitle('title')}
            >Title</button>&nbsp;
            <button onClick={() => handleVotes('votes')}
            >Votes</button>&nbsp;
            <br></br>
            Change Order to: <button onClick={() => handleOrder('ASC')}
            >{buttonText}</button>
            </div>
        <ul className='gridList'>
            {reviews.map((review) => {
                const category = review.category.charAt(0).toUpperCase() + review.category.slice(1).replace(/-/g, ' ')
                return (
                    <li className='reviewListBoxes' key={review.review_id}>
                        <Link to={`/reviews/${review.review_id}`} className='ReviewListLinks' >
                            <h2>{review.title}</h2>
                        <img
                            width="150rem"
                            height="150rem"
                            src={review.review_img_url}
                            alt={`${review.title}`}
                            ></img>
                            </Link>
                        <p>Author: {review.owner}</p>
                        <p>Category: <Link to={`/categories/${review.category}`} className='ReviewListLinks' >{category}</Link></p>

                    </li>
                )
            })}
        </ul>
    </main>
    );
  };

export default ReviewList;