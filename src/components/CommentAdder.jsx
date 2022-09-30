import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from 'react'
import { UserContext } from '../contexts/User'

const CommentAdder = ({comments, setComments, review_id}) => {

    const { loggedInUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [newComment, setNewComment] = useState({author: '', body: ''})


    useEffect(() => {
        if(isSuccessful) {
            setTimeout(() => {
                setIsSuccessful(false)
              }, 2500);
        }
    }, [isSuccessful])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios
        .post(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}/comments`, { ...newComment, review_id })
        .then(({data}) => {
            setComments((currComments) => {
                return [...currComments, data.comment]
            })
            setNewComment({author: '', body: ''})
            setIsLoading(false)
            setIsSuccessful(true)
        })
        .catch((err) => {
            setIsLoading(false)
        })
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isSuccessful) {
        return <p>Comment Posted!</p>
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <p><strong>Add a Comment</strong></p>
            <ul className="form-style-1">
                <li>
                    <label><strong>Username: {loggedInUser.username}</strong> <br></br><br></br>Comment <span className="required">(required)</span></label>
                    <textarea
                        name="field5" 
                        id="field5" 
                        className="field-long field-textarea"
                        value={newComment.body}
                        required
                        onChange={(e) => setNewComment((currComment) => ({...currComment, body: e.target.value}))}
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