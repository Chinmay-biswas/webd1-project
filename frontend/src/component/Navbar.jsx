import { Button,Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
//import { PlusSquareIcon } from '@chakra-ui/icons'
import { FaCirclePlus } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const {colorMode , toggleColorMode} = useColorMode();
  return (
    <Container maxW ={"1140px" } p={4}  >
      <Flex 
      h={16} 
      alignItems="center" 
      justifyContent="space-between"
      flexDirection={{ base: 'column', sm: 'row' }}
      >


        <Text fontSize={{ base: '22px', sm: '28px' }}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        textAlign={"center"}
        bgGradient={'linear(to-r, cyan.400, blue.500)'}
        bgClip={'text'}>

          <Link to="/">Product store 🛒</Link>
          
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to="/create"><Button colorScheme="teal"><FaCirclePlus /></Button></Link>
          <Button onClick={toggleColorMode} colorScheme="teal">
            {colorMode === 'light' ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar