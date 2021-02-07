import React from 'react';
import TokenService from '../../services/tokenService';
import authApiService from '../../services/authApiService';
import jwt from 'jsonwebtoken'

function LandingPage(props) {

    const handleLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/dashboard';

        props.setUserId(jwt.decode(TokenService.getAuthToken()).userId)
        props.setUsername(jwt.decode(TokenService.getAuthToken()).username)

        history.push(destination)
    }

    const handleDemoClick = (e) => {
        e.preventDefault();
        authApiService.postLogin({
            user_name: 'admin',
            user_password: 'testtest123!'
        })
        .then((res) => {
            if (!res.status === 200) {
                return res.json().then((err) => Promise.reject(err));
            }
            TokenService.saveAuthToken(res.authToken);
            handleLoginSuccess()
        })
        .catch((res) => {})
    }

    return (
        <div>
            <h3>Landing Page</h3>

            <button onClick={handleDemoClick}>
                Launch Demo
            </button>
        </div>
    )
}

export default LandingPage
