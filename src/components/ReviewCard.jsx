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
        setIsLoading(true)
        
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}`)
        .then(({ data }) => {
            setReview(data.reviews)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
            setError(true)
        })
    }, [review_id])

    if (error) {
        return <p className='fourOhFour'>404 - review not found! <br></br><br></br><img src='https://res.cloudinary.com/practicaldev/image/fetch/s--MDGh9sFX--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94318/6f20f70e-671b-4f70-9a30-008803d85e48.png' alt='a friendly wombat tells you that you have encountered a 404 error'></img></p>
    }
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    const category = review.category.charAt(0).toUpperCase() + review.category.slice(1).replace(/-/g, ' ')
    
    return (

        <main>
            <h3>{review.title}</h3> <VoteAdder review={review} setReview={setReview} review_id={review_id}/>
            <p>Author: {review.owner}</p>
            <img
                width="334rem"
                height="334rem"
                src={review.review_img_url}
                alt={`${review.review_img_url}`}
                ></img>
            <p>{review.review_body}</p>
            <p>Designer: {review.designer}</p>
            <p>Category: <Link to={`/categories/${review.category}`} className='ReviewListLinks'>{category}</Link></p>
            <p><strong>Comments:</strong></p>
            <CommentsList review_id={review_id} comments={comments} setComments={setComments}/>
            <CommentAdder review_id={review_id} comments={comments} setComments={setComments}/>
        </main>
    )

}

export default ReviewCard;