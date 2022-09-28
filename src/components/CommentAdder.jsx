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
                return [...comments, data.comments]
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
        setTimeout(() => {
            setIsSuccessful(false)
          }, 5000);
        return <p>Comment Posted!</p>
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <p><strong>Add a Comment</strong></p>
            <ul class="form-style-1">
                <li>
                    <label>Username <span class="required">(required)</span></label>
                    <input type="text" name="field3" class="field-long" placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </li><br></br>
                <li>
                    <label>Comment <span class="required">(required)</span></label>
                    <textarea
                        name="field5" 
                        id="field5" 
                        class="field-long field-textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        >
                    </textarea>
                </li>
                <li>
                <input type="submit" value="Submit" />
                </li>
            </ul>
</form>
    )
}

export default CommentAdder;