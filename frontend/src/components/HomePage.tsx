import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  Container,
  Flex,
  Link,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem 2rem"
        bgGradient="linear(to-r, blue.500, purple.600)"
        color="white"
        boxShadow="md"
      >
        <Flex align="center" mr={5}>
          <Image src="/logo2.jpg" alt="Dhanvikas" boxSize="50px" mr={3} borderRadius="full" />
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Dhanvikas - A Personal Expense Tracker
          </Heading>
        </Flex>
        <Box>
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="whiteAlpha"
            variant="solid"
            mr={3}
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Login
          </Button>
          <Button
            as={RouterLink}
            to="/register"
            colorScheme="whiteAlpha"
            variant="solid"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Register
          </Button>
        </Box>
      </Flex>

      <Container maxW="container.xl" py={20}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <VStack align="start" spacing={8} maxW="lg">
            <Heading as="h2" size="2xl" color="gray.800">
              Empower Your Financial Journey
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Dhanvikas is your all-in-one expense tracker, designed to help you track expenses,
              set goals, and achieve financial freedom.
            </Text>
            <Text fontSize="l" color="gray.600">
              To achieve financial freedom, spend what is left after saving. 
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="blue"
              _hover={{ bg: 'blue.600' }}
            >
              Start Managing Now
            </Button>
          </VStack>
          <Box mt={{ base: 10, md: 0 }}>
            <Image
              src="/logo2.jpg"
              alt="Logo"
              maxW="450px"
              borderRadius="lg"
              boxShadow="2xl"
            />
          </Box>
        </Flex>
      </Container>

      <Box bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading as="h3" size="xl" textAlign="center" color="gray.800">
              Why Dhanvikas Stands Out ? 
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="start" w="full">
              <Card maxW="sm" p={5} boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                <CardBody>
                  <Heading as="h4" size="md" color="blue.600">
                    Simplified Tracking
                  </Heading>
                  <Text color="gray.700">
                    Effortlessly monitor your income and expenses with our user-friendly interface.
                  </Text>
                </CardBody>
              </Card>

              <Card maxW="sm" p={5} boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                <CardBody>
                  <Heading as="h4" size="md" color="blue.600">
                    Data Accessibility
                  </Heading>
                  <Text color="gray.700">Export your financial data in CSV format for offline analysis.</Text>
                </CardBody>
              </Card>

              <Card maxW="sm" p={5} boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                <CardBody>
                  <Heading as="h4" size="md" color="blue.600">
                    Actionable Insights
                  </Heading>
                  <Text color="gray.700">
                    Gain a deeper understanding of your spending patterns with our intuitive analytics.
                  </Text>
                </CardBody>
              </Card>
            </Flex>
          </VStack>
        </Container>
      </Box>

      <Box as="footer" bgGradient="linear(to-r, purple.600, blue.500)" color="white" py={8}>
        <Container maxW="container.xl">
          <Text textAlign="center" fontSize="sm">
            &copy; 2024 Dhanvikas. All rights reserved.
          </Text>
          <Text textAlign="center" fontSize="sm">
            Contact Us:{' '}
            <Link href="mailto:varshithetta@gmail.com" color="white" _hover={{ textDecoration: 'underline' }}>
              varshithetta@gmail.com
            </Link>
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;