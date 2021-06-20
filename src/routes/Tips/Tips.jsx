import React, { useState, useEffect } from "react";
import appApiService from "../../services/appApiService";
import { Link } from "react-router-dom";
import "./Tips.css";

export default function Tips(props) {
  const [tips, setTips] = useState([]);
  const [tipTotal, setTipTotal] = useState("");
  const [refresh, setRefresh] = useState(false)
  const currentDate = new Date();

  useEffect(() => {
    appApiService.getAllTips().then((tips) => {
      setTips(tips);
    });
  }, [refresh]);
 
  const handleSubmitTip = async (e) => {
    e.preventDefault();
    if (tipTotal === "") {
      alert("Must enter a tip total");
    }
    else if (tipTotal > 150) {
      alert("Max tip per entry is $150")
    }
    else {
    await appApiService.postTip(tipTotal);
    setRefresh(!refresh)
    setTipTotal("")
    }
  };

  const sumOfDailyTips = (tips) => {
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {  
      let tipDateInfo = new Date(tips[i].tip_date);        
      if (tipDateInfo.toLocaleDateString() === currentDate.toLocaleDateString()) {
        let curr = parseFloat(tips[i].tip_total);
        sum = sum + curr;
      }
    }
    return sum.toFixed(2);
  };

  const avgTipTotal = (tips) => {
    let arrOfTips = [0];
    for (let i = 0; i < tips.length; i++) {
      let tipDateInfo = new Date(tips[i].tip_date);
      if (tipDateInfo.toLocaleDateString() === currentDate.toLocaleDateString()) {
        let curr = parseFloat(tips[i].tip_total);
        arrOfTips.push(curr);
      }
    }
    const tipAvg = arrOfTips.reduce((a, b) => a + b, 0) / arrOfTips.length;
    return tipAvg.toFixed(2);
  };

  const mealCount = (tips) => {
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
      let tipDateInfo = new Date(tips[i].tip_date);
      if (tipDateInfo.toLocaleDateString() === currentDate.toLocaleDateString()) {
        sum = sum + 1;
      }
    }
    return sum;
  };

  return (
    <div className="tips">
      <div className="tip-box">
        <h3>Tip Information</h3>
        <form action="submit">
          <label htmlFor="tipInfo">Tip Total: </label>
          <input
            type="text"
            name="tipInfo"
            id="tipInfo"
            value={tipTotal}
            onChange={(e) => setTipTotal(e.target.value)}
          />
          <br></br>
          <button aria-label="Submit" onClick={handleSubmitTip}>
            Submit
          </button>
        </form>
      </div>

      <div className="earnings-box">
        <h3>Shift Earnings</h3>
        <span>${sumOfDailyTips(tips)}</span>
        <hr></hr>
        <p>Meal Count: {mealCount(tips)}</p>
        <p>Average Tip Per Meal: ${avgTipTotal(tips)}</p>
      </div>
      <Link to="/dashboard">
        <button className="endshift">Dashboard</button>
      </Link>
    </div>
  );
}
