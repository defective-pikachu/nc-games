import axios from "axios"

const VoteAdder =({ review, setReview, review_id }) => {

    const voteOnReview = () => {

        setReview(currReview => {
            return {...review, votes: review.votes + 1}
        })

        const reqBody = {
            inc_votes: 1,
        };

        axios
            .patch(`https://michael-games-app.herokuapp.com/api/reviews/${review_id}`, reqBody)
            .then(({data}) => {
            })
            .catch((err) => {
                setReview(currReview => {
                    return {...review, votes: review.votes - 1}
                })
            })
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