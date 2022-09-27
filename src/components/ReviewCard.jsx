import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewCard = () => {
    const [review, setReview] = useState([])
    const { review_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}`)
        .then(({ data }) => {
            setReview(data.reviews)
            setIsLoading(false)
        })
        .catch((err) => {
        })
    }, [review_id])
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    const category = review.category.charAt(0).toUpperCase() + review.category.slice(1).replace(/-/g, ' ')
    
    return (

        <main>
            <h3>{review.title}</h3>
            <p>Designer: {review.designer}</p>
            <p>Author: {review.owner}</p>
            <img
                width="250rem"
                height="250rem"
                src={review.review_img_url}
                alt={`${review.review_img_url}`}
                ></img>
            <p>{review.review_body}</p>
            <p>Category: <a className='ReviewListLinks' href={`/categories/${review.category}`}>{category}</a></p>
            <p>Votes: {review.votes} &nbsp;&nbsp;&nbsp; Comments: {review.comment_count}</p>
        </main>
    )

}

export default ReviewCard;