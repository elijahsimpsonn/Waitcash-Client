import React, { useState, useEffect } from "react";
import WeekUtils from "week-utils";
import { Link } from "react-router-dom";
import { VictoryLabel, VictoryPie } from "victory";
import FadeIn from 'react-fade-in';

import TokenService from "../../services/tokenService";
import appApiService from "../../services/appApiService";

import "./Dashboard.css";

export default function Dashboard(props) {
  // GLOBAL STATE & VARIABLES //

  const [tips, setTips] = useState([]);
  const currentDate = new Date();
  // weekUtils is a package that makes it easy to work with weeks inside dates. Read more here: https://www.npmjs.com/package/week-utils
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
    return sum.toFixed(2);
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
    return sum.toFixed(2);
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
    return sum.toFixed(2);
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
    return sum.toFixed(2);
  };

  // FUNCTIONS FOR GRAPH DATA //

  const getMonthData = (tips) => {
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

  const arrangeMonthData = () => {
    const data = getMonthData(tips);
    for (let i = 0; i < data.length; i++) {
      if (data[i].sum <= 0) {
        delete data[i];
      }
    }
    return data;
  };

  // DATA SETS FOR GRAPHS //

  const monthData = arrangeMonthData();

  // BUTTON FUNCTIONS //

  const handleLogout = () => {
    TokenService.clearAuthToken();
    props.setUserId(null);
  };

  // RETURN //

  return (
    <div>
      <h3 className="date">{currentDate.toLocaleDateString()}</h3>

      <div className="button-section">
        <Link to="/tips">
          <button className="space">Enter Tips</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <hr />

<FadeIn delay="400">
      <div className="earnings">
        <span>Total Earnings (All Time): ${sumOfTotalEarnings(tips)}</span>
        <p>Current Yearly Earnings: ${sumOfYearlyEarnings(tips)}</p>
        <p>Current Monthly Earnings: ${sumOfMonthyEarnings(tips)}</p>
        <p>Current Weekly Earnings: ${sumOfWeeklyEarnings(tips)}</p>
      </div>
      </FadeIn>

      <hr />
      <h4>Earnings Chart</h4>

<FadeIn delay="800">
      <div className="month-pie-chart">
        <VictoryPie
          data={monthData}
          x="month"
          y="sum"
          colorScale={[
            "#ccd4bf",
            "#e7cba9",
            "#eebab2",
            "#f5f3e7",
            "#f5e2e4",
            "#f5bfd2",
            "#a1cdce",
            "#e5db9c",
            "#beb4c5",
            "#e6a57e",
            "#98d4bb",
            "#c6c9d0",
          ]}
          labelPlacement="perpendicular"
          labelComponent={<VictoryLabel style={[{ fill: "#cad2c5" }]} />}
        />
      </div>
      </FadeIn>
    </div>
  );
}

// {<VictoryLabel style={[{ fill: "#cad2c5" }]}/>}
