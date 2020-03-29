import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

const Signup = () => {
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
      await signup(email, password);
    } catch (error) {
      setFormState({ ...formState, error: error.message });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to <Link to="/">Fireact Chat</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
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
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
