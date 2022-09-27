import axios from "axios"

const gamesAPI = axios.create({
    baseURL: 'https://michael-games-app.herokuapp.com/api/'
})

export const getReviews = (category, review_id) => {
    return gamesAPI
    .get('/reviews', {params: {category, review_id} })
    .then((res) => {
        return res.data
    })
}

export const getUsers = () => {
    return gamesAPI
    .get('/users')
    .then((res) => {
        return res.data
    })
}

export const getCategories = () => {
    return gamesAPI
    .get('/categories')
    .then((res) => {
        return res.data
    })
}