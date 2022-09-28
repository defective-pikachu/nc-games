import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const CommentCard = ({comments, setComments}) => {
    const { review_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}/comments`)
        .then(({ data }) => {
            setComments(data.comments)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [review_id])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <ol className="commentlist">
                {comments.map((comment) => {
                    const convertedDate = comment.created_at
                    const dateString = `${convertedDate.split('T')[1].split('.')[0].split(':')[0]}:${convertedDate.split('T')[1].split('.')[0].split(':')[1]}, ${convertedDate.split('T')[0]}`
                    return (
                        <li key={comment.comment_id}>
                            <p>{`"${comment.body}"`}</p>
                            <p>Posted by <strong>{comment.author}</strong> at: {dateString}</p>
                        </li>
                    )
                })}
            </ol>
        </main>
    )

}

export default CommentCard;