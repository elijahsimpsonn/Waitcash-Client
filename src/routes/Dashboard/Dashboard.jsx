import React, { useState, useEffect } from "react";
import WeekUtils from "week-utils";
import { Link } from "react-router-dom";
import { VictoryPie } from "victory";

import TokenService from "../../services/tokenService";
import appApiService from "../../services/appApiService";

import "./Dashboard.css";

export default function Dashboard(props) {
  // GLOBAL STATE & VARIABLES //

  const [tips, setTips] = useState([]);
  const currentDate = new Date();
  const weekUtils = new WeekUtils(0, 6);

  // SERVER CALLS //

  useEffect(() => {
    appApiService.getAllTips().then((tips) => {
      setTips(tips);
    });
  }, []);

  // FUNCTIONS FOR EARNINGS DIV //

  const sumOfTotalEarnings = (tips) => {
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
      let curr = parseFloat(tips[i].tip_total);
      sum = sum + curr;
    }
    return sum;
  };

  const sumOfYearlyEarnings = (tips) => {
    let currentYear = currentDate.getFullYear();
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
      let tipDate = new Date(tips[i].tip_date);
      if (tipDate.getFullYear() === currentYear) {
        let curr = parseFloat(tips[i].tip_total);
        sum = sum + curr;
      }
    }
    return sum;
  };

  const sumOfMonthyEarnings = (tips) => {
    let currentMonth = currentDate.getMonth();
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
      let tipDate = new Date(tips[i].tip_date);
      if (tipDate.getMonth() === currentMonth) {
        let curr = parseFloat(tips[i].tip_total);
        sum = sum + curr;
      }
    }
    return sum;
  };

  const sumOfWeeklyEarnings = (tips) => {
    let currentWeek = weekUtils.curWeek(currentDate);
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
      let tipDate = new Date(tips[i].tip_date);
      let tipWeek = weekUtils.curWeek(tipDate);
      if (tipWeek === currentWeek) {
        let curr = parseFloat(tips[i].tip_total);
        sum = sum + curr;
      }
    }
    return sum;
  };

  // FUNCTIONS FOR GRAPH DATA //

  const getMonthData = (tips) => {
    //Add each tip to the same month in the months object
    //Return the months object
    let currentYear = currentDate.getFullYear();
    let months = [
      { month: "January", sum: 0 },
      { month: "February", sum: 0 },
      { month: "March", sum: 0 },
      { month: "April", sum: 0 },
      { month: "May", sum: 0 },
      { month: "June", sum: 0 },
      { month: "July", sum: 0 },
      { month: "August", sum: 0 },
      { month: "September", sum: 0 },
      { month: "October", sum: 0 },
      { month: "November", sum: 0 },
      { month: "December", sum: 0 },
    ];
    for (let i = 0; i < tips.length; i++) {
      let tipDate = new Date(tips[i].tip_date);
      let tipMonth = tipDate.toLocaleString("default", { month: "long" });
      if (tipDate.getFullYear() === currentYear) {
        for (let j = 0; j < months.length; j++) {
          if (tipMonth === months[j].month) {
            months[j].sum += parseFloat(tips[i].tip_total);
          }
        }
      }
    }
    return months;
  };

  const arrangeMonthDate = () => {
      const data = getMonthData(tips)
      
  }

  const getDateData = (tips) => {};

  const getDayData = (tips) => {};

  // DATA SETS FOR GRAPHS //

  const monthData = getMonthData(tips);
  const dateData = getDateData(tips);
  const dayData = getDayData(tips);

  // BUTTON FUNCTIONS //

  const handleLogout = () => {
    TokenService.clearAuthToken();
    props.setUserId(null);
  };

  // CONSOLE LOG TEST (DELETE BEFORE PRODUCTION BUILD) //
  console.log(tips);
  // console.log(currentDate)
  // console.log(tipDate)
  // console.log(currentYear)
  // console.log(currentDate.toLocaleString('default', { month: 'long' }))
  console.log(monthData);

  return (
    <>
      <h3 className="date">{currentDate.toLocaleDateString()}</h3>

      <div className="button-section">
        <Link to="/tips">
          <button className="space">Enter Tips</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <hr />

      <div className="earnings">
        <span>Total Earnings (All Time): ${sumOfTotalEarnings(tips)}</span>
        <p>Current Yearly Earnings: ${sumOfYearlyEarnings(tips)}</p>
        <p>Current Monthly Earnings: ${sumOfMonthyEarnings(tips)}</p>
        <p>Current Weekly Earnings: ${sumOfWeeklyEarnings(tips)}</p>
      </div>

      <hr />

      <div className="graphs">
        <select name="graphs" id="graphs">
          <option value="year">All Year Totals</option>
          <option value="month">Highest Earning Months</option>
          <option value="dates">Highest Earning Dates</option>
          <option value="days">Hightest Earning Days</option>
        </select>
      </div>

      {/* All Year Totals Chart */}

      {/* Highest Earning Months Chart */}

      {/* Highest Earning Dates Chart */}

      {/* Highest Earning Days Of The Week Chart */}

      <VictoryPie 
      colorScale={["auqamarine", "blueviolet", "blue", "burlywood", "chocolate", "chartreuse", "darkolivegreen", "darkslategrey", "floralwhite", "indianred", "lemonchiffon", "pink"]}
      data={monthData} 
      x="month" 
      y="sum" />
    </>
  );
}
