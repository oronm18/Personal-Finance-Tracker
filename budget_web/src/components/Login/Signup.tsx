import React, { useState } from 'react';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { signup } from '../../api'; // Import the signup function from api.ts
import { Link } from 'react-router-dom';
import { User } from '../User/User';
import { handleRefreshNavigate } from '../../Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '300px',
  },
  button: {
    width: '200px',
    marginTop: theme.spacing(2),
  },
  loginLink: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

interface SignupProps {
    onSignup: (userId: string) => void;
  }  

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const user: User = {user_id: "undefined", username: username, password: password}
      const response = await signup(user);
      if (response.user_id !== null) {
        console.log('Signup successful');
        onSignup(response.user_id)
        handleRefreshNavigate('/dashboard');
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.log('An error occurred during signup');
    }
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
        <Link to="/login" className={classes.loginLink}>
          Already have an account? Login here
        </Link>
      </form>
    </div>
  );
};

export default Signup;
