import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentsList from './CommentsList';
import VoteAdder from './VoteAdder';
import CommentAdder from './CommentAdder';

const ReviewCard = () => {
    const [review, setReview] = useState([])
    const [comments, setComments] = useState([])
    const { review_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}`)
        .then(({ data }) => {
            setReview(data.reviews)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
        })
    }, [review_id])

    if (error) {
        return <p>404 - page not found</p>
    }
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    const category = review.category.charAt(0).toUpperCase() + review.category.slice(1).replace(/-/g, ' ')
    
    return (

        <main>
            <h3>{review.title}</h3> <VoteAdder review={review} setReview={setReview} review_id={review_id}/>
            <p>Designer: {review.designer}</p>
            <p>Author: {review.owner}</p>
            <img
                width="250rem"
                height="250rem"
                src={review.review_img_url}
                alt={`${review.review_img_url}`}
                ></img>
            <p>{review.review_body}</p>
            <p>Category: <Link to={`/categories/${review.category}`} className='ReviewListLinks'>{category}</Link></p>
            <p><strong>Comments:</strong></p>
            <CommentsList review_id={review_id} comments={comments} setComments={setComments}/>
            <CommentAdder review_id={review_id} comments={comments} setComments={setComments}/>
        </main>
    )

}

export default ReviewCard;