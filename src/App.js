import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import ReviewList from './components/ReviewList'
import NavBar from './components/NavBar';
import ReviewCard from './components/ReviewCard';

function App() {
  return (
    <div className="App">
    <Header />
    <NavBar />
    <Routes>
        <Route path='/' element={<ReviewList />} />
        <Route path='/reviews' element={<ReviewList />} />
        <Route path='*' element={<p className='fourOhFour'>404 not found!</p>} />
        <Route path='/categories/:category' element={<ReviewList />} />
        <Route path='/reviews/:review_id' element={<ReviewCard />} />
      </Routes>
   </div>
  );
}

export default App;
