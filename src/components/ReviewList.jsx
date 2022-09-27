import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviews } from '../utils/api';

const ReviewList = () => {

const [isLoading, setIsLoading] = useState(true)
const [reviews, setReviews] = useState([])
const { category } = useParams()

useEffect(() => {

    getReviews(category)
        .then(({ reviews }) => {
            setReviews(reviews)
            setIsLoading(false)
        })
        .catch((err) => {
        })
}, [category])

if (isLoading) {
    return <p>Loading...</p>
}

    return (
        <main>
        <ul>
            {reviews.map((review) => {
                const category = review.category.charAt(0).toUpperCase() + review.category.slice(1).replace(/-/g, ' ')
                return (
                    <li className='reviewListBoxes' key={review.review_id}>
                        <a className='ReviewListLinks' href={`/reviews/${review.review_id}`}>
                            <h3>{review.title}</h3>
                        <img
                            width="150rem"
                            height="150rem"
                            src={review.review_img_url}
                            alt={`${review.title}`}
                            ></img>
                            </a>
                        <p>Author: {review.owner}</p>
                        <p>Category: <a className='ReviewListLinks' href={`/categories/${review.category}`}>{category}</a></p>

                    </li>
                )
            })}
        </ul>
    </main>
    );
  };

export default ReviewList;