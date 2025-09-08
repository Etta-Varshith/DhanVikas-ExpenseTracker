import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  useToast,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const toast = useToast();

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Error fetching notifications',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [toast]);

  const handleClearNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/clear-notifications', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications([]);
      toast({
        title: 'Notifications cleared',
        description: 'All notifications have been cleared.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast({
        title: 'Error clearing notifications',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        Notifications
      </Heading>
      <VStack spacing={4} align="stretch">
        {notifications.map((notification: any, index: number) => (
          <Card key={index}>
            <CardBody>
              <Text color="gray.700">{notification.message}</Text>
              <Divider my={2} />
              <Text fontSize="sm" color="gray.500">
                {new Date(notification.date).toLocaleString()}
              </Text>
            </CardBody>
          </Card>
        ))}
        {notifications.length === 0 && <Text color="gray.600">No notifications</Text>}
        {notifications.length > 0 && (
          <Button colorScheme="blue" onClick={handleClearNotifications} mt={4}>
            Clear All Notifications
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default Notifications;