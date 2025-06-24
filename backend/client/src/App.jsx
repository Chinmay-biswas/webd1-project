
import { Box , useColorModeValue } from '@chakra-ui/react';
import HomePage from './pages/homepage';
import CreatePage from './pages/createpage';
 // Assuming you have a Navbar component
import Navbar from '@/component/Navbar';
import { Routes, Route } from 'react-router-dom';
//



function App() {
  
  // Use useColorModeValue to set the background color based on the current color mode
  return (
    <Box minHeight="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
