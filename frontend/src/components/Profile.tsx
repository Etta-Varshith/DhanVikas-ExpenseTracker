import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Input,
  useToast,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [budget, setBudget] = useState('');
  const toast = useToast();

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setBudget(response.data.budget.toString());
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: 'Error fetching profile',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleBudgetUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/budget',
        { budget: parseFloat(budget) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: 'Budget updated',
        description: 'Your monthly budget has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUserProfile();
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        title: 'Error updating budget',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        User Profile
      </Heading>
      <VStack spacing={4} align="stretch">
        <Card>
          <CardBody>
            <Text color="gray.700">
              <strong>Username:</strong> {user.username}
            </Text>
            <Divider my={2} />
            <Text color="gray.700">
              <strong>Email:</strong> {user.email}
            </Text>
            <Divider my={2} />
            <Text color="gray.700">
              <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text mb={2} color="gray.700">
              <strong>Monthly Budget:</strong>
            </Text>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Set your monthly budget"
              color="gray.700"
            />
            <Button mt={2} colorScheme="blue" onClick={handleBudgetUpdate}>
              Update Budget
            </Button>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default Profile;