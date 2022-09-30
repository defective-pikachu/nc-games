import React from 'react'
import '../App.css';
import { useContext } from 'react'
import { UserContext } from '../contexts/User'

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
    return (
        <header className='header'>
        <h1>M e e p l e b a s e</h1>
        <section>
          <img 
          className='profile_img'
          src={loggedInUser.avatar_url} 
          alt={`${loggedInUser.username}'s avatar`}
          ></img>
          <p className='loggedInAs'><strong>Logged in as: {loggedInUser.username}</strong></p>
        </section>
          </header>
    );
  };

export default Header;