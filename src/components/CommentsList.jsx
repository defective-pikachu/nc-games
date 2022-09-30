import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext } from 'react'
import { UserContext } from '../contexts/User'

const CommentsList = ({comments, setComments}) => {

    const { loggedInUser } = useContext(UserContext);
    const { review_id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)

    
    useEffect(() => {
        setIsLoading(true)
        axios
        .get(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}/comments`)
        .then(({ data }) => {
            setComments(data.comments)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [review_id, isDeleted])
    
    const handleDelete = (comment_id) => {
        setIsLoading(true)
        axios
            .delete(`https://michael-games-app.herokuapp.com/api/comments/${comment_id}`)
            .then(({data}) => {
                setIsLoading(false)
                setIsDeleted(true)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (comments.length === 0) {
        return <p>There are no comments yet! Why not be the first to add one?</p>
    }

    if (isDeleted) {
        return (
            <main>
                <ol className="commentlist">
                    {comments.map((comment) => {
                        const convertedDate = comment.created_at
                        const dateString = `${convertedDate.split('T')[1].split('.')[0].split(':')[0]}:${convertedDate.split('T')[1].split('.')[0].split(':')[1]}, ${convertedDate.split('T')[0]}`
                        return (
                                <li className='individualComment' key={comment.comment_id}>
                                    <p>{`"${comment.body}"`}</p>
                                    <p>Posted by <strong>{comment.author}</strong> at: {dateString}</p>

                                    { loggedInUser.username === comment.author ? 
                                        <button 
                                            className='deleteButton' 
                                            onClick={() => {handleDelete(comment.comment_id)}}>
                                            <strong>Delete</strong> &nbsp;
                                            <RiDeleteBin6Line 
                                                size={20} 
                                                style={{fill: '#553c9a'}}
                                            />
                                        <span aria-label="delete this comment"> </span>
                                        </button> : null

                                    }
                                </li>
                        )
                    })}
                </ol>
                <p>Comment Deleted!</p>
            </main>
        )
    }

    return (
        <main>
            <ol className="commentlist">
                {comments.map((comment) => {
                    const convertedDate = comment.created_at
                    const dateString = `${convertedDate.split('T')[1].split('.')[0].split(':')[0]}:${convertedDate.split('T')[1].split('.')[0].split(':')[1]}, ${convertedDate.split('T')[0]}`
                    return (
                        <li className='individualComment' key={comment.comment_id}>
                            <p>{`"${comment.body}"`}</p>
                            <p>Posted by <strong>{comment.author}</strong> at: {dateString}</p>

                            { loggedInUser.username === comment.author ? 
                                        <button 
                                    className='deleteButton' 
                                    onClick={() => {handleDelete(comment.comment_id)}}>
                                    <strong>Delete</strong> &nbsp;
                                    <RiDeleteBin6Line 
                                    size={20} 
                                    style={{fill: '#553c9a'}}/>
                                    
                                    <span aria-label="delete this comment"> </span>
                                </button> : null

                            }

                        </li>
                    )
                })}
            </ol>
        </main>
    )

}

export default CommentsList;