import CartModel from '../../models/cartModel.js'
import ProductModel from '../../models/productsModel.js'

const add_to_cart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const userCart = await CartModel.findOne({ userId });
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (!userCart) {
            const newCart = new CartModel({
                userId,
                products: [
                    {
                        productId,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.imageUrls?.[0],
                    },
                ],
                totalAmt: product.price,
                totalQty: 1,
            });

            await newCart.save();
            return res.status(200).json({ success: true, cart: newCart });
        }

        // Check if the product already exists in the cart
        const existingProduct = userCart.products.find(
            (item) => item.productId.toString() === productId.toString()
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            userCart.products.push({
                productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.imageUrls?.[0],
            });
        }

        // Update total amount and quantity in a single iteration
        const totals = userCart.products.reduce(
            (acc, item) => {
                acc.totalAmt += item.price * item.quantity;
                acc.totalQty += item.quantity;
                return acc;
            },
            { totalAmt: 0, totalQty: 0 }
        );

        userCart.totalAmt = totals.totalAmt;
        userCart.totalQty = totals.totalQty;

        await userCart.save();
        return res.status(200).json({ success: true, cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const get_user_cart = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required!' });
      }
  
      // Find the cart based on userId
      const userCart = await CartModel.findOne({ userId: id });
  
      if (!userCart) {
        return res.status(400).json({ message: 'Cart not found!' });
      }
  
      // Respond with the user's cart data
      res.status(200).json(userCart);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const update_cart_qty = async (req, res) => {
    try {
        const { cartId, productId, type } = req.body;

        const userCart = await CartModel.findById(cartId);
        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = userCart.products.find((item) => 
            item?.productId.toString() === productId.toString()
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const existProduct = await ProductModel.findById(productId);
        if (!existProduct) {
            return res.status(404).json({ message: 'Product does not exist' });
        }

        let max =0

        if (type === "increment") {
            if (product.quantity >= existProduct.stock) {
                max++
                return res.status(400).json({ message: 'Maximum increase limit is reached' });
            }
            else if (product.quantity > max) {
                return res.status(400).json({ message: 'Maximum increase limit is reached' });
            }
            product.quantity += 1;
        } else if (type === "decrement") {
            if (product.quantity <= 1) {
                return res.status(400).json({ message: 'Minimum one product required' });
            }
            product.quantity -= 1;
        } else {
            return res.status(400).json({ message: 'Invalid type parameter' });
        }

        await userCart.save();

        res.status(200).json({ message: 'Quantity updated successfully', cart: userCart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

  


export {
    get_user_cart,
    add_to_cart,
    update_cart_qty
}