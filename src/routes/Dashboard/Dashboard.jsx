import React, { useState, useEffect } from 'react'
import TokenService from '../../services/tokenService'
import appApiService from '../../services/appApiService'
import './Dashboard.css'

export default function Dashboard(props) {

    const [tips, setTips] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        appApiService.getAllTips().then((tips) => {
            setTips(tips)
        })
    }, [])

    const sumOfTotalEarnings = (tips) => {
        let sum = 0
        for(let i = 0; i < tips.length; i++) {
            let curr = parseFloat(tips[i].tip_total);
            sum = sum + curr;
        } return sum;
    }

    const sumOfYearlyEarnings = null //Get tip_totals fron tips state matching the current year from currentDate, then sum and return?

    const sumOfMonthyEarning = null //Get tip_totals fron tips state matching the current month from currentDate, then sum and return?

    const sumOfWeeklyEarnings = null //Get tip_totals fron tips state matching the current week from currentDate, then sum and return?
    

    // BUTTON FUNCTIONS //

    const handleLogout = () => {
        TokenService.clearAuthToken()
        props.setUserId(null)
    }

    const handleStartShift = () => {

    }

    // --------------- //

    // CONSOLE LOG TEST (DELETE BEFORE PRODUCTION BUILD) //
    console.log(tips)
    console.log(currentDate)
    // ------------------------------------------------ //

    return (
        <>
        <h3 className="date">{currentDate.toLocaleDateString()}</h3>
        {/* <h3>{props.username}</h3> username comes back as undefined for some reason? */}

        <div className="button-section">
        <button className="space">Start Shift</button>
        <button onClick={handleLogout}>Log Out</button>
        </div>

        <hr/>

        <div className="earnings">
        <span>Total Earnings (All Time): ${sumOfTotalEarnings(tips)}</span>
        <p>Current Yearly Earnings: </p>
        <p>Current Monthly Earnings: </p>
        <p>Current Weekly Earnings: </p>
        </div>

        <hr/>

        <select name="graphs" id="graphs">
            <option value="year">All Year Totals</option>
            <option value="month">Highest Earning Months</option>
            <option value="dates">Highest Earning Dates</option>
            <option value="days">Hightest Earning Days</option>
        </select>
        </>
        
    )
}
