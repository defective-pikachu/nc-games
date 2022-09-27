import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CommentVoter from "./CommentVoter";

const CommentCard = () => {
    const [comments, setComments] = useState([])
    const { review_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}/comments`)
        .then(({ data }) => {
            setComments(data.comments)
            setIsLoading(false)
        })
    }, [review_id])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <ol className="list-numbered">
                {comments.map((comment) => {
                    const convertedDate = comment.created_at
                    const dateString = `${convertedDate.split('T')[1].split('.')[0].split(':')[0]}:${convertedDate.split('T')[1].split('.')[0].split(':')[1]}, ${convertedDate.split('T')[0]}`
                    return (
                        <li key={comment.comment_id}>
                            <p>{`"${comment.body}"`}</p>
                            <p>Posted by <strong>{comment.author}</strong> at: {dateString}</p>
                            {/* <CommentVoter comments={comments} setComments={setComments} review_id={review_id}/> */}
                        </li>
                    )
                })}
            </ol>
        </main>
    )

}

export default CommentCard;