import axios from 'axios';

const fetchProducts = async (setProducts,setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/get_all_products`);
    const products = response?.data

    console.log("API Response Products:", products);

    const listedProduct =  products.filter((element) => element?.status === true)

    console.log("Filtered Products:", listedProduct);

    setProducts(...listedProduct) ;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  } finally {
    setLoading(false);
  }
};

const fetchNewArrivals = async (setNewArrivals) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/new_arrivals`);
    if (response.status === 200) {
      const newArrivals = response?.data;
      setNewArrivals(newArrivals);
    }
  } catch (error) {
    console.error('Error fetching new arrivals:', error.message);
  }
};

const fetchProductDetail = async (setProduct, setMainImage, setImages, id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/products_details/${id}`);
    if (res.status === 200) {
      const product = res.data;
      setProduct(product);
      setMainImage(product?.imageUrls?.[0]);
      setImages(product?.imageUrls);
    }
  } catch (error) {
    console.log(error.message);
    throw new Error('Error fetching product details');
  }
};

const fetchRelatedProducts = async (setRelatedProducts, setError, id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/get_related_products/${id}`);
    if (res.status === 200) {
      const filteredProducts = res.data.relatedProducts.filter((product) => product.status === true);
      setRelatedProducts(filteredProducts);
    }
  } catch (error) {
    console.log(error.message);
    setError('Error fetching related products');
  }
};


export { 
  fetchProducts,
  fetchNewArrivals,
  fetchRelatedProducts,
  fetchProductDetail
 };
