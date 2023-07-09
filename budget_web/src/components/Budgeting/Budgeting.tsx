import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, Box, Typography, Button, Paper, Card, CardContent, IconButton, Tab, Tabs } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PieChartIcon from '@material-ui/icons/PieChart';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { fetchItems } from '../../api';

// Styling Constants
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    padding: theme.spacing(3),
  },
  card: {
    margin: 'auto',
    borderRadius: 12,
    padding: theme.spacing(3),
  },
  chartCard: {
    margin: theme.spacing(2, 0),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1c313a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#596164',
    },
  },
  chartContainer: {
    position: 'relative',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

// Chart Colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Component Interface
interface BudgetingProps {
    userId: string;
}

// Budgeting Component
const Budgeting: React.FC<BudgetingProps> = ({ userId }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Navigation Handlers
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };
  
// SavingsGoalsChart Component
const SavingsGoalsChart: React.FC<{ userId: string }> = ({ userId }) => {
  const classes = useStyles();
  const [savingsData, setSavingsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
          const savingGoals = await fetchItems(userId, "savings-goals");
          setSavingsData(savingGoals);
      };
      fetchData();
  }, [userId]);

  const handlePrev = () => setCurrentIndex(oldIndex => oldIndex > 0 ? oldIndex - 1 : savingsData.length - 1);
  const handleNext = () => setCurrentIndex(oldIndex => oldIndex + 1 < savingsData.length ? oldIndex + 1 : 0);

  return (
      <Box className={classes.chartCard}>
          <Typography variant="h5" align="center">Savings Goals</Typography>
          <Box className={classes.navigation}>
              <IconButton onClick={handlePrev}><ArrowBackIcon /></IconButton>
              <ResponsiveContainer width="80%" height={400}>
                  <BarChart data={[savingsData[currentIndex]]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 'dataMax']} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#8884d8" />
                      <Bar dataKey="target" fill="#82ca9d" />
                  </BarChart>
              </ResponsiveContainer>
              <IconButton onClick={handleNext}><ArrowForwardIcon /></IconButton>
          </Box>
      </Box>
  );
};

// TransactionsChart Component
const TransactionsChart: React.FC<{ userId: string }> = ({ userId }) => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const transactions = await fetchItems(userId, "transactions");
          setTransactionData(transactions);
      };
      fetchData();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  })
  return (
      <Box className={classes.chartCard}>
          <Typography variant="h5" align="center">Transactions</Typography>
          <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                  <Pie dataKey="amount" isAnimationActive={false} data={transactionData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {transactionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
              </PieChart>
          </ResponsiveContainer>
      </Box>
  );
};

// IncomeChart Component
const IncomeChart: React.FC<{ userId: string }> = ({ userId }) => {
  const [incomesData, setIncomesData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const incomes = await fetchItems(userId, "income");
          setIncomesData(incomes);
      };
      fetchData();
  }, [userId]);

  return (
      <Box className={classes.chartCard}>
          <Typography variant="h5" align="center">Income</Typography>
          <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                  <Pie dataKey="amount" isAnimationActive={false} data={incomesData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {incomesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
              </PieChart>
          </ResponsiveContainer>
      </Box>
  );
};


  return (
    <Box className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="budgeting tabs"
        >
          <Tab icon={<PieChartIcon />} label="Income" />
          <Tab icon={<PieChartIcon />} label="Transactions" />
          <Tab icon={<ShowChartIcon />} label="Savings Goals" />
        </Tabs>
      </Paper>

      <Box>
        <Paper>
          <Card className={classes.card}>
            <CardContent>
              <Box className={classes.header}>
                <Typography variant="h4">Budgeting</Typography>
                <Button variant="contained" className={classes.button} onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
        </Box>

        <Box className={classes.chartContainer}>
          {/* Conditional Rendering of the Charts */}
          {value === 0 && <IncomeChart userId={userId} />}
          {value === 1 && <TransactionsChart userId={userId} />}
          {value === 2 && <SavingsGoalsChart userId={userId} />}
        </Box>
      </CardContent>
    </Card>
  </Paper>
</Box>
    </Box>
  );
};

export default Budgeting;
