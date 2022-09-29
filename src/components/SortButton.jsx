import { useState } from "react";

const SortButton = ({reviews, setReviews}) => {

    const [date, setDate] = useState('DESC')
    const [commentCount, setCommentCount] = useState('DESC')
    const [voteCount, setvoteCount] = useState('DESC')
    const [sort, setSort] = useState('a -> z')

    return (
        <select id = "dropdown" > Sort By:
        <option value="N/A">--Select Sort Criteria--</option>
        <option value={date}>--Date (most recent)--</option>
        <option value="2">--Date (oldest)--</option>
        <option value={commentCount}>--Comment Count (most)--</option>
        <option value="5">--Comment Count (fewest)--</option>
        <option value={voteCount}>--Upvotes (most)--</option>
        <option value="7">--Upvotes (fewest)--</option>
    </select>
    )
}

export default SortButton;