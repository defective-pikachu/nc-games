import axios from "axios"
import { useState } from "react"
import { useParams } from 'react-router-dom';

const CommentVoter = ({comments, setComments, review_id}) => {

    const [hasVoted, setHasVoted] = useState(false)
    const { comment_id } = useParams()

    
    const voteOnComment = () => {

        if (!hasVoted) {
            setComments(currComments => {
                return currComments.map((comment) => {
                    if (comment.comment_id === comment_id) {
                        setHasVoted(true)
                        return {...comment, votes: comment.votes + 1}
                    }
                    return comment;
                })
            })
        }
    
        const reqBody = {
            inc_votes: 1,
        };

        axios
        .patch(`https://michael-games-app.herokuapp.com/api/comments/${comment_id}`, reqBody)
        .then(({data}) => {

        })
        .catch((err) => {
            setComments(currComments => {
                return currComments.map((comment) => {
                    if (comment.comment_id === comment_id) {
                        setHasVoted(false)
                        return {...comment, votes: comment.votes - 1}
                    }
                    return comment;
                })
            })
        }, [hasVoted])
    }

    return (
        <section>
                <button onClick={() => voteOnComment()}>
                    {comments.map((comment) => {
                        return comment.votes
                    })
                    }
                    <span aria-label="votes for this comment">👍</span>
                    </button>
        </section>
    )

}

export default CommentVoter;