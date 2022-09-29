import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getReviews } from '../utils/api';
import SortButton from '../components/SortButton';

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
            <SortButton reviews={reviews} setReviews={setReviews}/>
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