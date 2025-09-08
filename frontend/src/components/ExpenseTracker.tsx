import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  Text,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  useToast,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Added states for year and month filters
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const toast = useToast();

  const fetchExpenses = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Error fetching expenses. Please try again later.');
      toast({
        title: 'Error fetching expenses',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }
      await axios.post(
        'http://localhost:5000/api/expenses',
        { amount: parseFloat(amount), category, description, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExpenses();
      setAmount('');
      setCategory('');
      setDescription('');
      toast({
        title: 'Expense added',
        description: 'Your expense has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: 'Error adding expense',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
      toast({
        title: 'Expense deleted',
        description: 'Your expense has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({
        title: 'Error deleting expense',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map((expense: any) => [
        new Date(expense.date).toLocaleDateString(),
        expense.type,
        expense.category,
        expense.description,
        expense.amount.toFixed(2),
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'expenses.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Get years dynamically from expenses for the year dropdown
  const years = Array.from(
    new Set(expenses.map((exp: any) => new Date(exp.date).getFullYear()))
  ).sort((a, b) => b - a);

  // Filter expenses by search, year, and month
  const filteredExpenses = expenses.filter((expense: any) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1;

    const matchesSearch =
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedYear !== 'all' && expenseYear !== Number(selectedYear)) return false;

    if (selectedMonth !== 'all' && expenseMonth !== Number(selectedMonth)) return false;

    return true;
  });

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        Expense Tracker
      </Heading>
      <Card mb={6}>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <form onSubmit={handleSubmit}>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel color="gray.700">Amount</FormLabel>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </FormControl>
                <FormControl>
                  <FormLabel color="gray.700">Category</FormLabel>
                  <Input value={category} onChange={(e) => setCategory(e.target.value)} required />
                </FormControl>
                <FormControl>
                  <FormLabel color="gray.700">Description</FormLabel>
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel color="gray.700">Type</FormLabel>
                  <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </Select>
                </FormControl>
              </HStack>
              <Button type="submit" colorScheme="teal" mt={4}>
                Add Transaction
              </Button>
            </form>
          </VStack>
        </CardBody>
      </Card>

      {/* Search, Year, Month Filters and Export Button */}
      <HStack justify="space-between" mt={8} mb={4} flexWrap="wrap" gap={4}>
        <InputGroup maxWidth="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Select
          maxWidth="120px"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Select Year"
        >
          <option value="all">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <Select
          maxWidth="150px"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          placeholder="Select Month"
        >
          <option value="all">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Select>

        <Button onClick={exportToCSV} colorScheme="blue" minWidth="120px">
          Export to CSV
        </Button>
      </HStack>

      <Card>
        <CardBody>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th color="gray.700">Date</Th>
                <Th color="gray.700">Type</Th>
                <Th color="gray.700">Category</Th>
                <Th color="gray.700">Description</Th>
                <Th isNumeric color="gray.700">Amount</Th>
                <Th color="gray.700">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredExpenses.map((expense: any) => (
                <Tr key={expense._id}>
                  <Td color="gray.600">{new Date(expense.date).toLocaleDateString()}</Td>
                  <Td color="gray.600">{expense.type}</Td>
                  <Td color="gray.600">{expense.category}</Td>
                  <Td color="gray.600">{expense.description}</Td>
                  <Td isNumeric color="gray.600">Rs.{expense.amount.toFixed(2)}</Td>
                  <Td>
                    <Button onClick={() => handleDelete(expense._id)} colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ExpenseTracker;
