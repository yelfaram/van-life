import { BsStarFill } from "react-icons/bs"
import Review from "../../components/Host/Review"
import RatingProgressBar from "../../components/Host/RatingProgressBar"

function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "November 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "October 13, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
        {
            rating: 3,
            name: "Will",
            date: "September 23, 2022",
            text: "Not good",
            id: "3",
        },
        {
            rating: 2,
            name: "Bob",
            date: "September 10, 2022",
            text: "Bad service",
            id: "4",
        },
    ]

    const reviewElements = reviewsData.map(review => <Review key={review.id} {...review} />)
    const overallRating = (reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length).toFixed(2)

    return (
        <section className="reviews">
            <div className="reviews--header">
                <h2>Your reviews</h2>
                <p>Last <span>30 days</span></p>
            </div>
            <div className="reviews--progress-container">
                <div className="reviews--progress-header">
                    <h2>{overallRating}</h2>
                    <BsStarFill className="overall-rating" />
                    <p>overall rating</p>
                </div>
                <RatingProgressBar reviews={reviewsData} />
            </div>
            <div className="reviews--container">
                <div>
                    <h3>Reviews ({reviewsData.length})</h3>
                </div>
                {reviewElements}
            </div>
        </section>
    )
}

export default Reviews