import List from '@mui/material/List';
import { v4 as uuidv4 } from 'uuid';
import { getCategories } from '../utils/api.js'
import { useEffect, useState } from 'react';

const NavBar = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
      getCategories()
          .then(({ categories }) => {
              setCategories(categories)
              setIsLoading(false)
          })
          .catch((err) => {
              console.log(err)
          })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

    return (
        <nav>
            <a className='HomeButton' href='/'>Home</a> <br></br>
            <List className='NavBar'>

            {categories.map((category) => {
                category.id = uuidv4()
                let categoryCapitalised = category.slug.charAt(0).toUpperCase() + category.slug.slice(1).replace(/-/g, ' ')
                return <li key={category.id}><a href={`/categories/${category.slug}`}>{categoryCapitalised}</a>&nbsp;&nbsp;&nbsp;</li>;
            })}
            </List>
        </nav>
    )
}

export default NavBar;