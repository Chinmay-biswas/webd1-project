import { Heading, Input, VStack ,useColorModeValue,Box,Button,Container,useToast } from '@chakra-ui/react';
import {useState} from 'react';
import { useProductStore } from '@/store/product'; // Adjust the import path as necessary

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '', 
    image: ''
  })
  const toast = useToast();
    // Function to handle adding a new product
    const {createProduct} = useProductStore();
    // This function can be used to call the createProduct function from the store
    const handelAddProduct = async() => {
        const {success,message} = await createProduct(newProduct);
        
      if(!success){
        // Reset the form after adding the product
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
        setNewProduct({name: '',price: '',image: ''});
    }

  return (
    <Container maxW="Container.sm" >
        <VStack spacing={8}>
        <Heading as={'h1'} size="2xl" textAlign="center" mb={8}>Create New Product</Heading>

        <Box
        w="100%"
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        rounded="lg"
        boxShadow="md"> 

        <VStack spacing={4} >
            <Input 
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}    
            />
            <Input 
            placeholder="Product Price"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}    
            />
            <Input
            placeholder="Product Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}    
            />
            <Button colorScheme="teal" width="full"
            onClick={() => {handelAddProduct(newProduct)}}>Add Product</Button>
        </VStack>

        </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage