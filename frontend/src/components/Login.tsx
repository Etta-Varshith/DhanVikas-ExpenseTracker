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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
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
            <Heading color="gray.800">Login to Dhanvikas</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl>
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
                Login
              </Button>
            </form>
            <Text color="gray.600">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="blue.500">
                Register
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

export default Login;