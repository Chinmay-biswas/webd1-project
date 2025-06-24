import { Box,Heading,HStack,Image,Text, useColorModeValue,IconButton,useToast, Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, VStack,Input,Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { DeleteIcon} from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useState } from 'react';






    const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    const {onOpen , isOpen, onClose} = useDisclosure();
    const TextColor =useColorModeValue('gray.800', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');
    const { deleteProduct ,updateProduct } = useProductStore(); 
    const toast = useToast(); // Adjust the import path as necessary


    const handleDeleteProduct = async(pid) => {
        // Implement the delete functionality here
        const {success, message} = await deleteProduct(pid);
        if(!success) {
          toast({
            title: "Error",
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
        else {
          toast({
            title: "Success",
            description: message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
    };
    
    const handelUpdateProduct=async (pid, updatedProduct) =>{
     const {success,message}= await updateProduct(pid, updatedProduct);
      onClose();
      if(!success){
        toast({
            title: "Error",
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
      else {
          toast({
            title: "Success",
            description: "Product Updated Successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
    }
  return (
    <Box
    shadow={"md"}
    rounded={"lg"}
    overflow={"hidden"}
    transition='all 0.3s'
    _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    bg={bg}
    align='center'>
        <Image
          src={product.image}
          alt='Product.name'
          h='48'
          w='full'
          objectFit='cover'>

          </Image>
          <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
              {product.name}
            </Heading>
            <Text fontSize='xl' fontWeight={'bold'} mb={4} color={TextColor}>
              {product.price} $
            </Text>
            <HStack spacing={4}>
              <IconButton
                icon={<EditIcon/>}
                onClick={onOpen}
                colorScheme='blue'
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDeleteProduct(product._id)}
                colorScheme='red'
              />
            </HStack>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input placeholder="Product Name" name="name"
                  value={updatedProduct.name}
                  onChange={(e)=> setUpdatedProduct({...updatedProduct,name:e.target.value})}/>
                  <Input placeholder="Product Price" name="price"
                  value={updatedProduct.price}
                   onChange={(e)=> setUpdatedProduct({...updatedProduct,price:e.target.value})}/>
                  <Input placeholder="Product Image URL" name="image"
                  value={updatedProduct.image}
                   onChange={(e)=> setUpdatedProduct({...updatedProduct,image:e.target.value})}/>
                </VStack>
              </ModalBody>
               <ModalFooter>
            <Button colorScheme='blue' mr={3}
            onClick={()=>handelUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
          </ModalFooter>
            </ModalContent>
          </Modal>
    </Box>
    
  )
}

export default ProductCard