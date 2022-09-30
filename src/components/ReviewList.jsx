import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getReviews } from '../utils/api';

const ReviewList = () => {

const { category } = useParams()

const [buttonText, setButtonText] = useState('Ascending')
const [error, setError] = useState(false)
const [isLoading, setIsLoading] = useState(true)
const [params, setParams] = useState({})
const [reviews, setReviews] = useState([])

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
            setError(true)
        })
}, [params])

if (error) {
    return <p className='fourOhFour'>404 - category not found! <br></br><br></br><img src='https://res.cloudinary.com/practicaldev/image/fetch/s--MDGh9sFX--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94318/6f20f70e-671b-4f70-9a30-008803d85e48.png' alt='a friendly wombat tells you that you have encountered a 404 error'></img></p>
}

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
            <strong>Sort By: </strong><button className='button-18' onClick={() => handleComments('comment_count')}
            >Comments</button>&nbsp;
            <button className='button-18' onClick={() => handleSort('created_at')}>Date</button> &nbsp;
            <button className='button-18' onClick={() => handleTitle('title')}
            >Title</button>&nbsp;
            <button className='button-18' onClick={() => handleVotes('votes')}
            >Votes</button>&nbsp;
            <br></br>
            <strong>Change Order to: </strong><button className='button-18' onClick={() => handleOrder('ASC')}
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
                        <p>Votes: {review.votes}</p>

                    </li>
                )
            })}
        </ul>
    </main>
    );
  };

export default ReviewList;