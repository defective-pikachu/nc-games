import axios from "axios"
import { useState } from "react"

const VoteAdder =({ review, setReview, review_id }) => {

    const [hasVoted, setHasVoted] = useState(false)

    const voteOnReview = () => {

        console.log(hasVoted)

        if (!hasVoted) {
            setReview(currReview => {
                setHasVoted(true)
                return {...review, votes: review.votes + 1}
            })
        }

        const reqBody = {
            inc_votes: 1,
        };

        axios
            .patch(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}`, reqBody)
            .then(({data}) => {
            })
            .catch((err) => {
                setReview(currReview => {
                    setHasVoted(false)
                    return {...review, votes: review.votes - 1}
                })
            }, [hasVoted])
    }

        return (
            <section>
                    <button onClick={() => voteOnReview()}>
                        {review.votes}
                        <span aria-label="votes for this review">👍</span>
                        </button>
            </section>
        )

}

export default VoteAdder;