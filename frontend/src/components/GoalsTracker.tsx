import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';

interface Goal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

const GoalsTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }
      const response = await axios.get('http://localhost:5000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('Failed to fetch goals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }
      await axios.post(
        'http://localhost:5000/api/goals',
        { name: newGoalName, targetAmount: parseFloat(newGoalTarget) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewGoalName('');
      setNewGoalTarget('');
      fetchGoals();
      toast({
        title: 'Goal added',
        description: 'Your new financial goal has been added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: 'Error adding goal',
        description: 'Failed to add the goal. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        return;
      }
      await axios.delete(`http://localhost:5000/api/goals/${goalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGoals();
      toast({
        title: 'Goal deleted',
        description: 'The goal has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: 'Error deleting goal',
        description: 'Failed to delete the goal. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Text>Loading goals...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        Financial Goals Tracker
      </Heading>
      <Card mb={6}>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Input
                placeholder="Goal name"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
              <Input
                placeholder="Target amount"
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
              />
              <Button colorScheme="teal" onClick={addGoal}>
                Add
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      <VStack spacing={4} align="stretch">
        {goals.map((goal) => (
          <Card key={goal._id}>
            <CardBody>
              <Text fontWeight="bold" color="gray.700">
                {goal.name}
              </Text>
              <Text color="gray.600">Target: Rs.{goal.targetAmount.toFixed(2)}</Text>
              <Button
                colorScheme="red"
                onClick={() => deleteGoal(goal._id)}
                mt={2}
              >
                Achieved the Goal
              </Button>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default GoalsTracker;