import React, { useState } from 'react';
import { makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { login } from '../../api'; // Import the login function from api.ts
import { Link } from 'react-router-dom';
import { User } from '../User/User'
import { handleNavigate } from '../../Utils';

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
  signUpLink: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

interface LoginProps {
  onLogin: (userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user: User = {user_id: "undefined", username: username, password: password}
      const response = await login(user);
      if (response.user_id !== null) {
        onLogin(response.user_id);
        console.log('Login successful');
        handleNavigate('/dashboard')
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.log('An error occurred during login');
    }
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
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
          Login
        </Button>
        <Link to="/signup" className={classes.signUpLink}>
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default Login;