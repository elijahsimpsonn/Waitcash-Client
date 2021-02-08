import React, { useState, useEffect } from 'react'
import WeekUtils from 'week-utils'
import TokenService from '../../services/tokenService'
import appApiService from '../../services/appApiService'
import { Link } from 'react-router-dom';
import { VictoryBar } from 'victory'
import './Dashboard.css'

export default function Dashboard(props) {

    const [tips, setTips] = useState([]);
    const currentDate = new Date();
    const weekUtils = new WeekUtils(0, 6);

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

    const sumOfYearlyEarnings = (tips) => {
        let currentYear = currentDate.getFullYear()
        let sum = 0
        for(let i = 0; i < tips.length; i++) {
            let tipDate = new Date(tips[i].tip_date);
            if(tipDate.getFullYear() === currentYear) {
                let curr = parseFloat(tips[i].tip_total);
                sum = sum + curr;
            }
        } return sum
    }
    
    const sumOfMonthyEarnings = (tips) => {
        let currentMonth = currentDate.getMonth()
        let sum = 0
        for(let i = 0; i < tips.length; i++) {
            let tipDate = new Date(tips[i].tip_date);
            if(tipDate.getMonth() === currentMonth) {
                let curr = parseFloat(tips[i].tip_total);
                sum = sum + curr;
            }
        } return sum
    }
    
    const sumOfWeeklyEarnings = (tips) => {
        let currentWeek = weekUtils.curWeek(currentDate)
        let sum = 0
        for(let i = 0; i < tips.length; i++) {
            let tipDate = new Date(tips[i].tip_date);
            let tipWeek = weekUtils.curWeek(tipDate)
            if(tipWeek === currentWeek) {
                let curr = parseFloat(tips[i].tip_total);
                sum = sum + curr;
            }
        } return sum
    }
    
    // BUTTON FUNCTIONS //

    const handleLogout = () => {
        TokenService.clearAuthToken()
        props.setUserId(null)
    }

    // --------------- //

    // CONSOLE LOG TEST (DELETE BEFORE PRODUCTION BUILD) //
    console.log(tips)
    // console.log(currentDate)
    // console.log(tipDate)
    // console.log(currentYear)
    // ------------------------------------------------ //

    return (
        <>
        <h3 className="date">{currentDate.toLocaleDateString()}</h3>
        {/* <h3>{props.username}</h3> username comes back as undefined for some reason? */}

        <div className="button-section">
        <Link to='/tips'><button className="space">Enter Tips</button></Link>
        <button onClick={handleLogout}>Log Out</button>
        </div>

        <hr/>

        <div className="earnings">
        <span>Total Earnings (All Time): ${sumOfTotalEarnings(tips)}</span>
        <p>Current Yearly Earnings: ${sumOfYearlyEarnings(tips)}</p>
        <p>Current Monthly Earnings: ${sumOfMonthyEarnings(tips)}</p>
        <p>Current Weekly Earnings: ${sumOfWeeklyEarnings(tips)}</p>
        </div>

        <hr/>

        <div className="graphs">
        <select name="graphs" id="graphs">
            <option value="year">All Year Totals</option>
            <option value="month">Highest Earning Months</option>
            <option value="dates">Highest Earning Dates</option>
            <option value="days">Hightest Earning Days</option>
        </select>
        </div>

        <VictoryBar/>
        </>
        
    )
}
