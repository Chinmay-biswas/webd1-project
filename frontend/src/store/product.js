import {create} from "zustand"
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
createProduct: async(newProduct)=>{
    if(!newProduct.name||!newProduct.image||!newProduct.price){
        return{success:false, message:"please fill the detail"}
    }
    const res = await fetch("/api/products",{method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  });
  const data = await res.json();
  
    if (data?.data) {
  set((state) => ({ products: [...state.products, data.data] }));
}

    return { success:true , message: "Product created successfully" };


},
fetchProducts: async () => {
  try {
    const res = await fetch("/api/products");

    if (!res.ok) {
      const text = await res.text(); // fallback if not JSON
      console.error("Fetch failed:", res.status, text);
      return;
    }

    const data = await res.json();
    set({ products: data.data || [] });
  } catch (err) {
    console.error("Error parsing response:", err);
  }
},
deleteProduct: async (pid) =>{
  const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
  const data = await res.json();
  if(!data.success){
    return {success:false, message: data.message || "Failed to delete product"};
    }
    // down code update the ui imidetily afteter delete the product
set((state) => ({ products: state.products.filter((p) => (p.id || p._id) !== pid) }));
  return { success: true, message: data.message || "Product deleted successfully" };
},
updateProduct: async (pid, updatedProduct) => {
const res = await fetch(`/api/products/${pid}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(updatedProduct)
});  
const data = await res.json();
if (!data.success) {
    return { success: false, message: data.message || "Failed to update product" };
  }
  // update ui immeditely without refresing
  set(state=>({
    products: state.products.map(product => product._id===pid?data.data : product)
  }))
  return {success:true, message:data.message};
}
}));
 