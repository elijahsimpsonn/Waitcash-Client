import React from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'
import './Login.css'

import TokenService from '../../services/tokenService';

function Login(props) {

    const handleLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/dashboard';

        props.setUserId(jwt.decode(TokenService.getAuthToken()).userId);
        props.setUsername(jwt.decode(TokenService.getAuthToken()).username)
        history.push(destination);
    }

    return (
        <>
            <h2>Login</h2>
            <LoginForm 
                onLoginSuccess={handleLoginSuccess}
                setUserId={props.setUserId}
            />
            <div className="links">
            <p><Link to='/register'>No account? Register Here!</Link></p>
            <p><Link to='/'>Want to head back to the Landing Page?</Link></p>
            </div>
        </>
    )
}

Login.defaultProps = {
    location: {},
    history: {
        push: () => {},
    },
};

export default Login
