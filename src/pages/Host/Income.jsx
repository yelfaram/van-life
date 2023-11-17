import { useState, useEffect } from "react"
import Transaction from "../../components/Transaction"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Income() {
    const transactionsData = [
        { amount: 720, date: "Nov 3, 2023", id: "1" },
        { amount: 560, date: "Oct 22, 2023", id: "2" },
        { amount: 980, date: "Oct 13, 2023", id: "3" },
        { amount: 440, date: "Sep 23, 2023", id: "4" },
        { amount: 140, date: "Sep 10, 2023", id: "5" },
        { amount: 640, date: "Aug 20, 2023", id: "5" },
        { amount: 700, date: "Aug 15, 2023", id: "6" },
        { amount: 350, date: "Aug 5, 2023", id: "7" },
        { amount: 500, date: "Jul 26, 2023", id: "8" },
        { amount: 620, date: "Jul 20, 2023", id: "9" },
        { amount: 310, date: "Jul 18, 2023", id: "10" },
        { amount: 820, date: "Jul 10, 2023", id: "11" },
    ]
    
    // helper function to check whether transaction is within last 30 days
    function isWithinLast30Days(transaction) {
        const currentDate = new Date();
        const last30Days = new Date(currentDate);
        last30Days.setDate(currentDate.getDate() - 30);

        const transactionDate = new Date(transaction.date);
        return transactionDate >= last30Days && transactionDate <= currentDate;
    }

    // get last 30 days transactions
    const transactionElements = transactionsData
        .filter(isWithinLast30Days)
        .map(transaction => <Transaction key={transaction.id} {...transaction} />)

    // helper funciton to calculate total revenue for each month
    function calculateMonthlyRevenues(transactions) {
        const monthlyRevenues = {}

        transactions.forEach(transaction => {
            const date = new Date(transaction.date); 
            const month = date.toLocaleString('default', { month: 'short' });
            monthlyRevenues[month] = (monthlyRevenues[month] || 0) + transaction.amount
        })

        return monthlyRevenues
    }

    function generateBarGraphData(transactions) {
        const monthlyRevenues = calculateMonthlyRevenues(transactions);
        const labels = Object.keys(monthlyRevenues);
        const data = Object.values(monthlyRevenues);

        const backgroundColors = transactions.map(transaction =>
            isWithinLast30Days(transaction) ? '#FF8C38' : '#FFEAD0'
        );

        return {
            labels: labels,
            datasets: [
                {
                    backgroundColor: backgroundColors,
                    data: data,
                },
            ],
        }
    }

    const [barGraphData, setBarGraphData] = useState(null);
    useEffect(() => {
        const data = generateBarGraphData(transactionsData);
        setBarGraphData(data);
    }, []);

    const options = {
        elements: {
            bar: {
                borderRadius: {
                    topLeft: 5,
                    topRight: 5,
                    bottomLeft: 0,
                    bottomRight: 0,
                },
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <section className="income">
            <h2>Income</h2>
            <p>Last <span>30 days</span></p>
            <h1>$2,260</h1>
            <div className="income--graph">
                {barGraphData && <Bar data={barGraphData} options={options}/>}
            </div>
            <div className="transactions--container">
                <div>
                    <h3>Your transactions ({transactionElements.length})</h3>
                    <p>Last <span>30 days</span></p>
                </div>
                {transactionElements}
            </div>
        </section>
    )
}

export default Income