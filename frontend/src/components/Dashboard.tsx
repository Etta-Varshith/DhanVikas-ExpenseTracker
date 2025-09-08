import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Progress,
  Flex,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in again.');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/expenses/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error fetching dashboard data. Please try again later.');
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!dashboardData) {
    return <Box p={8}>Loading...</Box>;
  }

  const totalBudget = dashboardData.totalIncome;
  const spentPercentage = (dashboardData.totalExpense / totalBudget) * 100;

  const pieChartData = {
    labels: Object.keys(dashboardData.categoryTotals),
    datasets: [
      {
        data: Object.values(dashboardData.categoryTotals),
        backgroundColor: [
          '#63B3ED', // Blue
          '#F6AD55', // Orange
          '#68D391', // Green
          '#90CDF4', // Light Blue
          '#D6BCFA', // Purple
          '#FC8181', // Red
          '#4FD1C5', // Teal
          '#ED8936', // Dark Orange
          '#A0AEC0', // Gray
        ],
        hoverBackgroundColor: [
          '#4299E1',
          '#EB8F34',
          '#48BB78',
          '#63B3ED',
          '#B794F4',
          '#E53E3E',
          '#38B2AC',
          '#DD6B20',
          '#718096',
        ],
      },
    ],
  };

  return (
    <Box p={8} bg="gray.50">
      <Text fontSize="2xl" mb={4} color="gray.700">
        Hey {dashboardData.username}, Welcome to Dhanvikas Expense tracker
      </Text>
      <Heading mb={6} color="gray.800">
        {dashboardData.username}'s Personal Financial Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Total Income</StatLabel>
              <StatNumber color="green.600">Rs.{dashboardData.totalIncome.toFixed(2)}</StatNumber>
            </Stat>
            <Divider my={4} />
            <Stat>
              <StatLabel color="gray.600">Total Expenses</StatLabel>
              <StatNumber color="red.600">Rs.{dashboardData.totalExpense.toFixed(2)}</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.700">
              Budget Overview
            </Heading>
            <Text mb={2} color="gray.600">
              Total Budget: Rs.{totalBudget.toFixed(2)}
            </Text>
            <Progress
              value={spentPercentage}
              colorScheme={spentPercentage > 75 ? 'red' : 'green'}
              size="lg"
            />
            <Text mt={2} color="gray.600">
              {spentPercentage > 100
                ? "You've exceeded your budget!"
                : `${spentPercentage.toFixed(2)}% of budget spent`}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.700">
              Balance
            </Heading>
            <Stat>
              <StatNumber
                fontSize="4xl"
                color={dashboardData.totalIncome - dashboardData.totalExpense > 0 ? 'green.600' : 'red.600'}
              >
                Rs.{(dashboardData.totalIncome - dashboardData.totalExpense).toFixed(2)}
              </StatNumber>
              <StatLabel color="gray.600">
                {dashboardData.totalIncome - dashboardData.totalExpense > 0 ? 'Surplus' : 'Deficit'}
              </StatLabel>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={10}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.700">
              Expense Breakdown
            </Heading>
            <Box height="300px">
              <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.700">
              Expense Details
            </Heading>
            <VStack align="stretch" spacing={3}>
              {Object.entries(dashboardData.categoryTotals).map(([category, amount]: [string, any]) => (
                <Box key={category}>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" color="gray.700">
                      {category}
                    </Text>
                    <Text color="gray.600">Rs.{amount.toFixed(2)}</Text>
                  </Flex>
                  <Progress
                    value={(amount / dashboardData.totalExpense) * 100}
                    size="sm"
                    colorScheme="blue"
                    mt={1}
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;