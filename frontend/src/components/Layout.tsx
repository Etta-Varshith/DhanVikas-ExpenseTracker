import React from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  useDisclosure,
  VStack,
  Collapse,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const logo = '/logo2.jpg';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem 2rem"
        bgGradient="linear(to-r, blue.500, purple.600)"
        color="white"
        boxShadow="md"
      >
        <Flex align="center" mr={5}>
          <Image src={logo} alt="Dhanvikas Logo" boxSize="50px" mr={3} borderRadius="full" />
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            Dhanvikas
          </Heading>
        </Flex>

        {/* Desktop Menu Links */}
        <Flex
          align="center"
          display={{ base: 'none', md: 'flex' }}
          gap={4}
          mr={4}
          fontWeight="semibold"
        >
          <Link as={RouterLink} to="/dashboard" _hover={{ color: 'teal.200' }}>
            Dashboard
          </Link>
          <Link as={RouterLink} to="/expense-tracker" _hover={{ color: 'teal.200' }}>
            Add Transaction
          </Link>
          <Link as={RouterLink} to="/specialized-trackers" _hover={{ color: 'teal.200' }}>
            Specialized Trackers
          </Link>
          <Link as={RouterLink} to="/monthly-report" _hover={{ color: 'teal.200' }}>
            Monthly Report
          </Link>
          <Link as={RouterLink} to="/goals" _hover={{ color: 'teal.200' }}>
            Goals
          </Link>
          <Link as={RouterLink} to="/notifications" _hover={{ color: 'teal.200' }}>
            Notifications
          </Link>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="white" color="teal.500">
              Profile
            </MenuButton>
            <MenuList bg="white">
              <MenuItem as={RouterLink} to="/profile" color="teal.700">
                View Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} color="teal.700">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Mobile Hamburger Menu Button */}
        <IconButton
          aria-label="Toggle menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: 'block', md: 'none' }}
          onClick={onToggle}
          bg="white"
          color="teal.500"
        />
      </Flex>

      {/* Mobile Menu Links (Collapse) */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          bgGradient="linear(to-r, blue.500, purple.600)"
          color="white"
          pb={4}
          px={4}
          display={{ md: 'none' }}
        >
          <VStack align="start" spacing={3} fontWeight="semibold">
            <Link as={RouterLink} to="/dashboard" onClick={onToggle} _hover={{ color: 'teal.200' }}>
              Dashboard
            </Link>
            <Link as={RouterLink} to="/expense-tracker" onClick={onToggle} _hover={{ color: 'teal.200' }}>
              Add Transaction
            </Link>
            <Link
              as={RouterLink}
              to="/specialized-trackers"
              onClick={onToggle}
              _hover={{ color: 'teal.200' }}
            >
              Specialized Trackers
            </Link>
            <Link
              as={RouterLink}
              to="/monthly-report"
              onClick={onToggle}
              _hover={{ color: 'teal.200' }}
            >
              Monthly Report
            </Link>
            <Link as={RouterLink} to="/goals" onClick={onToggle} _hover={{ color: 'teal.200' }}>
              Goals
            </Link>
            <Link
              as={RouterLink}
              to="/notifications"
              onClick={onToggle}
              _hover={{ color: 'teal.200' }}
            >
              Notifications
            </Link>
            {/* Profile Menu in Mobile */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="white" color="teal.500" width="100%">
                Profile
              </MenuButton>
              <MenuList bg="white" color="teal.700">
                <MenuItem as={RouterLink} to="/profile" onClick={onToggle}>
                  View Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onToggle();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </VStack>
        </Box>
      </Collapse>

      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default Layout;
