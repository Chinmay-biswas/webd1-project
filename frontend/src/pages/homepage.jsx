import { Container,VStack,Text, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '@/store/product'; // Update the path as needed
import ProductCard from '@/component/ProductCard'; // Update the path as needed

const HomePage  = () => {

  const {fetchProducts,products} = useProductStore();
  useEffect(() => {fetchProducts()} , [fetchProducts]);
  console.log(products);
  return (
    <Container maxW="Container.xl" py={12}>
      <VStack spacing={8} >
        <Text as="h1" fontSize="30" fontWeight="bold" textAlign="center" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text">
          Current Products 
        </Text> 

<SimpleGrid
    columns={{ base: 1, sm: 2, md: 3}}
    spacing={10}
    w={"80%"}>
    {products.map((product) => (
    (<ProductCard key={product._id || product.id} product={product} />)
  ))}
</SimpleGrid>

        <Text fontSize="xl" textAlign="center"  fontWeight={'bold'}>
          No Product Found😢{" "}
          <Link to= {"/create"}>
          <Text as="span"   color="blue.400" _hover={{ textDecoration: 'underline' }}> 
          create a new product </Text>
        </Link>
        </Text>
        
      </VStack>
    </Container>
  )
}

export default HomePage 