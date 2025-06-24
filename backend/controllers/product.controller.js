import Product from "../models/products.models.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.status(200).json({ success: true, data: products }); // Send the
  }
  catch (error) {
    console.error('Error in fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const createProduct = async (req, res) => {
  // res.send('Server is ready!');//this show text on our server
  const product = req.body; // Get the product data from the request body

 if (!product.name || !product.price || !product.image) {
   return res.status(400).json({ success: false, message: 'Name , price and image are required' });
 }


 const newProduct = new Product(product); // Create a new product instance

try{
  await newProduct.save(); // Save the product to the database
  res.status(201).json({ success: true, data: newProduct });
} catch (error) {
  console.error('Error in creating product:', error);
  res.status(500).json({ success: false, message: 'Server error' });
}
}
export const updateProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  
  const product = req.body; // Get the updated product data from the request body
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // Update the product in the database
    res.status(200).json({ success: true, data: updatedProduct }); // Send the updated product
  } catch (error) {
    console.error('Error in updating product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters
  //console.log("Deleting product with ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: deletedProduct });
  } catch (error) {
    console.error('Error in deleting product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}