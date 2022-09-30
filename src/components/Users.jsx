import { useEffect, useState, useContext } from 'react';
import { getUsers } from '../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/User'
import { AiOutlineSmile } from 'react-icons/ai'

const Users = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)
    const { setLoggedInUser } = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        getUsers()
            .then(({users}) => {
                setUsers(users)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                setError(true)
            })
    }, [setUsers])

    if (error) {
        return <p className='fourOhFour'>404 - user not found! <br></br><br></br><img src='https://res.cloudinary.com/practicaldev/image/fetch/s--MDGh9sFX--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94318/6f20f70e-671b-4f70-9a30-008803d85e48.png' alt='a friendly wombat tells you that you have encountered a 404 error'></img></p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <ul className='gridList'>
                {users.map((user) => {
                    user.id = uuidv4()
                    return (
                        <li className='reviewListBoxes' key={user.id}>
                            <h2>{user.username}</h2>
                            <img 
                                width="150rem"
                                height="150rem"
                                src={user.avatar_url}
                                alt={`${user.username}'s avatar`}
                            ></img><br></br>
                            <button className='logInButton'  onClick={() => setLoggedInUser(user)}><strong>That's Me! &nbsp;
                                </strong><AiOutlineSmile size={20} 
                                style={{fill: '#553c9a'}}/> </button>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

export default Users;