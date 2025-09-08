import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';

const trackerTypes = [
  'Subscription',
  'Grocery',
  'Event',
  'Health and Education',
  'Budget',
  'Bill',
  'Debt Repayment',
  'Savings',
  'Investment',
  'Other/Custom',
];

const SpecializedTrackers = () => {
  const [trackers, setTrackers] = useState([]);
  const [selectedTracker, setSelectedTracker] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [activeTrackerId, setActiveTrackerId] = useState(''); // State to track the active tracker
  const toast = useToast();

  useEffect(() => {
    fetchTrackers();
  }, []);

  const fetchTrackers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/trackers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrackers(response.data);
    } catch (error) {
      console.error('Error fetching trackers:', error);
      toast({
        title: 'Error fetching trackers',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateTracker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/trackers',
        { name: selectedTracker, type: selectedTracker },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrackers();
      setSelectedTracker('');
      toast({
        title: 'Tracker created',
        description: 'Your new tracker has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating tracker:', error);
      toast({
        title: 'Error creating tracker',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddItem = async (trackerId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/trackers/${trackerId}/items`,
        { name, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrackers();
      setName('');
      setAmount('');
      toast({
        title: 'Item added',
        description: 'Your item has been added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding item to tracker:', error);
      toast({
        title: 'Error adding item',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTracker = async (trackerId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/trackers/${trackerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTrackers();
      toast({
        title: 'Tracker deleted',
        description: 'Your tracker has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting tracker:', error);
      toast({
        title: 'Error deleting tracker',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteItem = async (trackerId: string, itemId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/trackers/${trackerId}/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTrackers();
      toast({
        title: 'Item deleted',
        description: 'Your item has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error deleting item',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} bg="gray.50">
      <Heading mb={6} color="gray.800">
        Specialized Trackers
      </Heading>
      <VStack spacing={4} align="stretch">
        <form onSubmit={handleCreateTracker}>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel color="gray.700">Create New Tracker</FormLabel>
              <Select
                value={selectedTracker}
                onChange={(e) => setSelectedTracker(e.target.value)}
                placeholder="Select tracker type"
                color="gray.700"
              >
                {trackerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={8}>
              Create Tracker
            </Button>
          </HStack>
        </form>
      </VStack>
      <Tabs mt={8} isFitted variant="enclosed" onChange={(index) => setActiveTrackerId(trackers[index]._i)}>
        <TabList>
          {trackers.map((tracker: any) => (
            <Tab key={tracker._id} color="gray.700" _selected={{ bg: 'blue.100' }}>
              {tracker.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {trackers.map((tracker: any) => (
            <TabPanel key={tracker._id}>
              <VStack spacing={4} align="stretch">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddItem(tracker._id);
                  }}
                >
                  <HStack spacing={4}>
                    <FormControl>
                      <FormLabel color="gray.700">Name</FormLabel>
                      <Input value={name} onChange={(e) => setName(e.target.value)} required color="gray.700"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel color="gray.700">Amount</FormLabel>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        color="gray.700"
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" mt={10}>
                      Add
                    </Button>
                  </HStack>
                </form>
              </VStack>
              <Card mt={4}>
                <CardBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="gray.700">Name</Th>
                        <Th color="gray.700">Amount</Th>
                        <Th color="gray.700">Date</Th>
                        <Th color="gray.700">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tracker.items.map((item: any) => (
                        <Tr key={item._id}>
                          <Td color="gray.600">{item.name}</Td>
                          <Td color="gray.600">Rs.{item.amount.toFixed(2)}</Td>
                          <Td color="gray.600">{new Date(item.date).toLocaleDateString()}</Td>
                          <Td>
                            <Button
                              onClick={() => handleDeleteItem(tracker._id, item._id)}
                              colorScheme="red"
                              size="sm"
                            >
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Divider my={4} />
                  <Button
                    onClick={() => handleDeleteTracker(tracker._id)}
                    colorScheme="red"
                    mt={4}
                  >
                    Delete Tracker
                  </Button>
                </CardBody>
              </Card>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SpecializedTrackers;