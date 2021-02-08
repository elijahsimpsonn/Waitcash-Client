import React, {useState} from 'react';
import TokenService from '../../services/tokenService';
import AuthApiServices from '../../services/authApiService';
import './LoginForm.css'

function LoginForm(props) {
    const [error, setError] = useState(null);

    const handleSubmitJwtAuth = (e) => {
        e.preventDefault();
        setError(null)
        const { username, password } = e.target;

        AuthApiServices.postLogin({
            user_name: username.value,
            user_password: password.value,
        })
            .then((res) => {
                if (!res.status === 200) {
                    return res.json().then((error) => Promise.rejest(error))
                }
                username.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                props.onLogInSuccess()
            })
            .catch((res) => {
                setError({ error: res.error })
            })
    };

    return (
        <>
            <form onSubmit={handleSubmitJwtAuth}>
                {error && <div>{error.error}</div>}
                <input required type="text" id='username' placeholder="username" aria-label="username" />
                <input required type="text" id='password' placeholder="password" aria-label="password"/>
                <br/>
                <button type="submit"> Login </button>
            </form>
        </>
    )
}

export default LoginForm
