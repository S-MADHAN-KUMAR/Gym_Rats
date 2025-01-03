import axios from "axios"

const fetchUserCart = async (id) => {
  try {
    if (!id) {
      throw new Error('User ID is missing.');
    }

    const res = await axios.get(`http://localhost:3000/user/get_user_cart/${id}`);
    if (res.status === 200) {
      return res?.data || []
    } else {
      throw new Error('Failed to fetch cart data');
    }
  } catch (error) {
    console.error(error.message)
    throw error;
  }
};


const addToCart = async (userId, productId, setAdded) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/add_to_cart`, {
            userId,
            productId,
        });

        if (res.status === 200) {
            setAdded(true);
        } else {
            console.error('Failed to add product to cart:', res.data.message);
        }
    } catch (error) {
        console.error('Error adding to cart:', error.message);
    }
};

const updateQty = async (productId, cartId, type) => {
  try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}user/update_cart_qty`, {
          cartId,
          productId,
          type
      });

      if (res.status === 200) {
          return res.data.message;
      } else {
          return res.data.message || 'An error occurred.';
      }
  } catch (error) {
      console.error('Error updating cart quantity:', error.message);
      return 'Failed to update cart quantity.';
  }
};


export {
    fetchUserCart,
    addToCart,
    updateQty
}