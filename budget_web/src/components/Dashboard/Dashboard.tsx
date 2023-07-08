// Importing necessary modules
import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid, Typography, Card, CardContent, Button, AppBar, Tabs, Tab, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../Table/GenericTable';
import { fetchItems } from '../../api';
import { incomeFields } from '../Table/IncomeFields';
import { transactionFields } from '../Table/TransactionFields';
import { savingsGoalFields } from '../Table/SavingsGoalFields';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShowChartIcon from '@material-ui/icons/ShowChart';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

// TabPanel component for the different tables
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Defining the properties for the Dashboard component
interface DashboardProps {
  currentUserId: string;
}

// Defining the classes for the styling of the Dashboard component
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 800,
    padding: theme.spacing(2),
  },
}));

// Defining the Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ currentUserId }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Initializing necessary states and objects
  const tables = [
    { name: 'Income', itemType: 'income', fields: incomeFields },
    { name: 'Transactions', itemType: 'transactions', fields: transactionFields },
    { name: 'Savings Goals', itemType: 'savings-goals', fields: savingsGoalFields },
  ];
  const initialTotals = tables.reduce((acc, curr) => ({ ...acc, [curr.itemType]: 0 }), {});
  const [totals, setTotals] = useState<{ [key: string]: number }>(initialTotals);

  // Fetching data when the component is mounted
  useEffect(() => {
    fetchItemsCounts();
  }, []);

  useEffect(() => {
    // Checking if the user is authenticated
    if (!currentUserId) {
      navigate('/login');
    }
  });

  // Method to fetch items count for each type
  const fetchItemsCounts = async () => {
    const counts = { ...totals };
    for (let key of Object.keys(totals)) {
      counts[key] = await fetchItemCount(key);
    }
    setTotals(counts);
  };

  // Method to fetch a specific item's count
  const fetchItemCount = async (itemType: string) => {
    const items = await fetchItems(currentUserId, itemType);
    return items.length;
  };

  // Rendering the Dashboard component
  return (
    <Box className={classes.root}>
      <Typography align="center" variant="h5">
        <DashboardIcon /> Dashboard
      </Typography>
      <Box mt={3}>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="dashboard tabs"
          >
            {tables.map((table, index) => (
              <Tab key={index} label={`Total ${table.name} ${totals[table.itemType]}`} />
            ))}
          </Tabs>
        </Paper>
        {tables.map((table, index) => (
          <TabPanel value={value} index={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography align="center" variant="h5">{table.name}</Typography>
                <GenericTable
                  fields={table.fields}
                  currentUserId={currentUserId}
                  setTotal={(count: number) => {
                    setTotals((prev) => ({ ...prev, [table.itemType]: count }));
                  }}
                  itemType={table.itemType}
                />
              </CardContent>
            </Card>
          </TabPanel>
        ))}
      </Box>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShowChartIcon />}
          onClick={() => navigate('/budgeting')}
        >
          View Stats
        </Button>
      </Box>
    </Box>
  );
};

// Exporting the Dashboard component
export default Dashboard;