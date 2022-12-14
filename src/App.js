import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from './contexts/User'
import Header from './components/Header'
import NavBar from './components/NavBar';
import ReviewList from './components/ReviewList'
import ReviewCard from './components/ReviewCard';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      
    <Header />
    <NavBar />
    <Routes>
        <Route path='/' element={<ReviewList />} />
        <Route path='/reviews' element={<ReviewList />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={<p className='fourOhFour'>404 - page not found! <br></br><br></br><img src='https://res.cloudinary.com/practicaldev/image/fetch/s--MDGh9sFX--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94318/6f20f70e-671b-4f70-9a30-008803d85e48.png' alt='a friendly wombat tells you that you have encountered a 404 error'></img></p> } />
        <Route path='/categories/:category' element={<ReviewList />} />
        <Route path='/reviews/:review_id' element={<ReviewCard />} />
      </Routes>
   </div>
  );
}

export default App;
