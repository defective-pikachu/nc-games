import axios from "axios"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CommentAdder = ({comments, setComments, review_id}) => {

    const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)

    const comment = {
        votes: 0,
        created_at: new Date(),
        comment_id: uuidv4(),
        review_id: review_id,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        comment.author = username
        comment.body = body
        axios
        .post(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}/comments`, comment)
        .then(({data}) => {
            setIsLoading(true)
            setUsername('')
            setBody('')
            setComments((currComments) => {
                setIsLoading(false)
                setIsSuccessful(true)
                return [data.comment, ...comments]
            })
        })
        .catch((err) => {
            console.log(err)
        }, [comment])
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isSuccessful) {
        return <p>Comment Posted!</p>
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Submit a Comment</label><br></br>
            Username: <textarea 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                >
            </textarea><br></br>
            Comment: <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                >
            </textarea>
            <br></br><button>Submit</button>
</form>
    )
}

export default CommentAdder;