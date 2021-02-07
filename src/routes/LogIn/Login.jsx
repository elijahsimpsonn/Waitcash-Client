import React from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'

import TokenService from '../../services/tokenService';

function Login(props) {

    const handleLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/home';

        props.setUserId(jwt.decode(TokenService.getAuthToken()).userId);
        props.setUsername(jwt.decode(TokenService.getAuthToken()).username)
        history.push(destination);
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginForm 
                onLoginSuccess={handleLoginSuccess}
                setUserId={props.setUserId}
            />
            <Link to='/register'>No account? Register Here!</Link>
        </div>
    )
}

Login.defaultProps = {
    location: {},
    history: {
        push: () => {},
    },
};

export default Login
