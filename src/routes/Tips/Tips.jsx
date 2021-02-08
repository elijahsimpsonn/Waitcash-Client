import React, { useState, useEffect } from 'react'
import appApiService from '../../services/appApiService'
import { Link } from 'react-router-dom';
import './Tips.css'

export default function Tips(props) {

    const [tips, setTips] = useState([])
    //TIP BOX
        //Input/button which post tips to DB
        
    //EARNINGS BOX
        //Show earnings of current day, the number of tips for the day, and the average tip earned today

    





    return (
        <div className='tips'>

            <div className="tip-box">
                <h3>Tip Information</h3>
                <form action="submit">
                    <label htmlFor="tipInfo">Tip Total: </label>
                    <input type="text" name="tipInfo" id="tipInfo"/>
                    <br></br>
                    <button>Submit</button>
                </form>
            </div>

            <div className="earnings">
                <h3>Shift Earnings</h3>
                <span>$</span>
                <hr></hr>
                <p>Meal Count: </p>
                <p>Average Tip Per Meal:</p>
            </div>
            <button className="endshift">End Shift</button>
        </div>
    )
}
