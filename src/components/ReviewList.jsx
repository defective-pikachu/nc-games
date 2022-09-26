import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getReviews } from '../utils/api';

const ReviewList = () => {

const [isLoading, setIsLoading] = useState(true)
const [reviews, setReviews] = useState([])

useEffect(() => {
    getReviews()
        .then(({ reviews }) => {
            setReviews(reviews)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

if (isLoading) {
    return <p>Loading...</p>
}

    return (
        <main>
        <ul>
            {reviews.map((review) => {
                const category = review.category.charAt(0).toUpperCase() + review.category.slice(1)
                return (
                    <li key={review.review_id}>
                        <Link to={`/reviews/${review.review_id}`}>
                            <h3>{review.title}</h3>
                        <img
                            width="150rem"
                            height="150rem"
                            src={review.review_img_url}
                            alt={`${review.title}`}
                            ></img>
                            </Link>
                        <p>Author: {review.owner}</p>
                        <p>Category: <Link to={`/reviews/categories/${category}`}>{category}</Link></p>

                    </li>
                )
            })}
        </ul>
    </main>
    );
  };

export default ReviewList;