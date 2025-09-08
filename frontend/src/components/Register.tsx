import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      toast({
        title: 'Registration successful',
        description: 'You can now log in with your new account.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'Please try again with different credentials.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8} p={4}>
      <Card boxShadow="md">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading color="gray.800">Register for Dhanvikas</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color="gray.700">Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="gray.700">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color="gray.700">Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mt={4} width="full">
                Register
              </Button>
            </form>
            <Text color="gray.600">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="blue.500">
                Login
              </Link>
            </Text>
            <Text color="gray.600">
              <Link as={RouterLink} to="/" color="blue.500">
                Back to Home
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Register;