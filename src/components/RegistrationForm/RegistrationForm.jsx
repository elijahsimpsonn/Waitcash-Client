import { useState, useReducer } from "react";
import AuthApiService from "../../services/authApiService";

const initialFormState = {
  regUsername: "",
  regPassword: "",
  confirmPass: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const RegistrationForm = (props) => {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const { regUsername, regPassword, confirmPass } = state;

    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (regPassword !== confirmPass) {
      setError("Passwords must match");
      return;
    }
    const newUser = {
      user_name: regUsername,
      user_password: regPassword,
    };
    AuthApiService.postUser(newUser)
      .then((res) => props.onRegSuccess())
      .catch((res) => setError({ error: res.error }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>{error && <p>{error.error}</p>}</div>
        <input
          aria-label="username"
          placeholder="username"
          id="regUsername"
          name="regUsername"
          required
          type="text"
          onChange={onChange}
        ></input>
        <input
          aria-label="password"
          placeholder="password"
          id="regPassword"
          name="regPassword"
          type="password"
          required
          onChange={onChange}
        />
        <input
          aria-label="confirm password"
          placeholder="confirm password"
          id="confirmPass"
          name="confirmPass"
          type="password"
          required
          onChange={onChange}
        />
      </form>
      <button type="submit" onClick={handleSubmit}> Register </button>
    </>
  );
};

export default RegistrationForm;
