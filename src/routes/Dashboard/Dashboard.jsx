import React, { useState, useEffect } from 'react'
import TokenService from '../../services/tokenService'
import appApiService from '../../services/appApiService'

export default function Dashboard(props) {

    const [tips, setTips] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        appApiService.getAllTips().then((tips) => {
            setTips(tips)
        })
    }, [])

    const sumOfTotalEarnings = tips.reduce((prev, cur) => prev + cur.tip_total, 0) 

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
    console.log(sumOfTotalEarnings) // What is going on here? Printing the totals in a line like:  $03.20004.89001.5600
    // ------------------------------------------------ //

    return (
        <>
        <h3>{currentDate.getMonth()}/{currentDate.getDate()}/{currentDate.getFullYear()}</h3> {/* This is not showing the current date? */}
        <h3>{props.username}</h3> {/* username comes back as undefined for some reason? */}
        <button>Start Shift</button>
        <button onClick={handleLogout}>Log Out</button>

        <hr/>

        <p>Total Earnings (All Time): ${sumOfTotalEarnings}</p>
        <p>Current Yearly Earnings: </p>
        <p>Current Monthly Earnings: </p>
        <p>Current Weekly Earnings: </p>

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
