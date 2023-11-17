import PropTypes from 'prop-types';

function Transaction(props) {
    function formatDate(date) {
        const newDate = new Date(date)

        const month = newDate.getMonth() + 1
        const day = newDate.getDate()
        const year = newDate.getFullYear() % 100

        return `${month}/${day}/${year}`
    }

    return (
        <div className="transaction--container">
            <h2>${props.amount}</h2>
            <p>{formatDate(props.date)}</p>
        </div>
    )
}

Transaction.propTypes = {
    amount: PropTypes.number,
    date: PropTypes.string,
}

export default Transaction