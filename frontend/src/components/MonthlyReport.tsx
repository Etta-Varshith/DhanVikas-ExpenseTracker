import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Select,
  HStack,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyReport = () => {
  const [report, setReport] = useState<any>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const toast = useToast();

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/users/monthly-report?month=${month}&year=${year}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching monthly report:', error);
        toast({
          title: 'Error fetching monthly report',
          description: 'Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchMonthlyReport();
  }, [month, year, toast]);

  const pieChartData = {
    labels: report ? Object.keys(report.categoryTotals) : [],
    datasets: [
      {
        data: report ? Object.values(report.categoryTotals) : [],
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
      },
    ],
  };

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        Monthly Report
      </Heading>
      <HStack spacing={4} mb={6}>
        <Select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          color="gray.700"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </Select>
        <Select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          color="gray.700"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </Select>
      </HStack>
      {report && (
        <VStack spacing={6} align="stretch">
          <Card>
            <CardBody>
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                Total Transactions (Income+Expenses): Rs.{report.totalExpense.toFixed(2)}
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Box height="300px">
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading size="md" mb={2} color="gray.800">
                Transaction Breakdown
              </Heading>
              {Object.entries(report.categoryTotals).map(([category, amount]: [string, any]) => (
                <Text key={category} color="gray.600">
                  {category}: Rs. {amount.toFixed(2)}
                </Text>
              ))}
            </CardBody>
          </Card>
        </VStack>
      )}
    </Box>
  );
};

export default MonthlyReport;