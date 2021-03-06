import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    error: null
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setFormState({ ...formState, error: null });

    try {
      const { email, password } = formState;
      await signin(email, password);
    } catch (error) {
      setFormState({ ...formState, error: error.message });
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>
          Login to <Link to="/">Fireact Chat</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formState.email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formState.password}
            type="password"
          ></input>
        </div>
        <div>
          {formState.error ? <p>{formState.error}</p> : null}
          <button type="submit">Login up</button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
