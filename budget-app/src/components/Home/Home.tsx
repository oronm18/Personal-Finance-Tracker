import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Container, Switch, useMediaQuery, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import TransactionImage from '../../assets/transaction.jpg';
import SavingsGoalImage from '../../assets/saving.jpg';
import './Home.css';

const features = [
  { title: 'Manage Your Budget', description: 'Keep track of your income and expenses in one place.', image: TransactionImage },
  { title: 'Set Savings Goals', description: 'Set and track progress towards your savings goals.', image: SavingsGoalImage },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate('/login');
  };

  return (
    <Box>
      <Container>
        <Typography variant="h2" className="Home-title">
            Welcome to Budget Tracker!
        </Typography>
        <Grid container spacing={4} justify="center">
          {features.map((feature, index) => (
            
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="Feature-card">
                <CardMedia
                  component="img"
                  alt={feature.title}
                  height="140"
                  image={feature.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" className="Home-cta-container">
  <Button
    variant="contained"
    color="primary"
    size="large"
    className="Home-cta"
    onClick={navigateToDashboard}
  >
    Get Started
  </Button>
</Box>
      </Container>
    </Box>
  );
};

export default Home;
