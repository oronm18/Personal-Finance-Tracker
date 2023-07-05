// React Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI Imports
import { 
    Box, 
    Typography, 
    Button, 
    Card, 
    CardContent, 
    IconButton, 
    makeStyles 
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Recharts Imports
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

// API and Utilities Imports
import { fetchSavingsGoals, fetchTransactions } from '../../api';
import { handleRefreshNavigate } from '../../Utils';

// Styling Constants
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f4f6f8',
        minHeight: '100vh',
    },
    card: {
        margin: 'auto',
        borderRadius: 12,
        padding: theme.spacing(3),
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
    const [transactionData, setTransactionData] = useState([]);
    const [savingsData, setSavingsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch user data on mount and userId change
    useEffect(() => {
        if (!userId) {
          navigate('/login');
        }

        const fetchData = async () => {
            const transactions = await fetchTransactions(userId);
            setTransactionData(transactions);

            const savingGoals = await fetchSavingsGoals(userId);
            setSavingsData(savingGoals);
        };

        fetchData();
    }, [userId]);

    // Navigation Handlers
    const handleReturnToDashboard = () => {
      navigate('/dashboard');
    };

    const handlePrev = () => {
        setCurrentIndex(oldIndex => oldIndex > 0 ? oldIndex - 1 : savingsData.length - 1);
    };
  
    const handleNext = () => {
        setCurrentIndex(oldIndex => oldIndex + 1 < savingsData.length ? oldIndex + 1 : 0);
    };
  
  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Box className={classes.header}>
            <Typography variant="h4">
              Budgeting
            </Typography>
            <Button variant="contained" className={classes.button} onClick={handleReturnToDashboard}>
              Return to Dashboard
            </Button>
          </Box>
  
          <Box mb={5}>
            <Typography align="center" variant="h4">
              Transactions
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  isAnimationActive={false}
                  data={transactionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {transactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
  
          <Box mb={5}>
          <Typography align="center" variant="h4">
            Savings Goals
          </Typography>
          {savingsData.length > 0 && (
                            <Typography align="center" variant="h6" gutterBottom>
                                {savingsData[currentIndex]["name"]} Goal Progress
                            </Typography>
                        )}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handlePrev}>
              <ArrowBackIcon />
            </IconButton>
            <ResponsiveContainer width="80%" height={400}>
              <BarChart
                data={[savingsData[currentIndex]]}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#8884d8" />
                <Bar dataKey="target" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <IconButton onClick={handleNext}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>


        </CardContent>
      </Card>
    </Box>
  );
};

export default Budgeting;
