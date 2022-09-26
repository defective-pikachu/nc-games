import { Link } from 'react-router-dom';
import { useState } from 'react';
import List from '@mui/material/List';
import { v4 as uuidv4 } from 'uuid';

const NavBar = () => {

    const categoriesArray = [
        {
          "slug": "strategy",
          "description": "Strategy-focused board games that prioritise limited-randomness"
        },
        {
          "slug": "hidden-roles",
          "description": "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role"
        },
        {
          "slug": "dexterity",
          "description": "Games involving physical skill, something like Gladiators, for Board Games!"
        },
        {
          "slug": "push-your-luck",
          "description": "Games that allow you to take bigger risks to achieve increasingly valuable rewards - or to decide to keep what you’ve got before you lose everything."
        },
        {
          "slug": "roll-and-write",
          "description": "Roll some dice and decide how to use the outcome, writing it into a personal scoring sheet. "
        },
        {
          "slug": "deck-building",
          "description": "Games where players construct their own deck as a main element of the gameplay"
        },
        {
          "slug": "engine-building",
          "description": "Games where players construct unique points-gaining engines main element of the gameplay"
        }
      ]
    const [categories, setCategories] = useState(categoriesArray)
    return (
        <nav>
            <Link to='/'>Home</Link> <br></br>
            <List>

            {categories.map((category) => {
                category.id = uuidv4()
                return <li key={category.id}><Link to={`/items/categories/${category.slug}`}>{category.slug}</Link>&nbsp;&nbsp;&nbsp;</li>;
            })}
            </List>
        </nav>
    )
}

export default NavBar;