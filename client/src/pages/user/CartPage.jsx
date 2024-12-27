import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { fetchUserCart } from './helpers/cart';
import { updateQty } from './helpers/cart';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const loadCart = async () => {
            try {
                if (currentUser) {
                    const fetchedCart = await fetchUserCart(currentUser?._id);
                    setCart(fetchedCart);
                }
            } catch (err) {
                setError(err.message || 'Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [currentUser]);

    const handleUpdateQty = async (productId, type) => {
        if (!cart) return;

        try {
            const message = await updateQty(productId, cart._id, type);
            alert(message);

            // Reload the cart after quantity update
            const updatedCart = await fetchUserCart(currentUser?._id);
            setCart(updatedCart);
        } catch (err) {
            alert(err.message || 'Failed to update quantity');
        }
    };

    if (loading) {
        return <div>Loading your cart...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {cart ? (
                <div className="overflow-x-hidden flex w-[100vw] h-[100vh] justify-center items-start p-12 flex-row gap-x-10">
                    <div className="w-2/4">
                        <div className="mb-4 flex justify-between">
                            <h1>Your Orders</h1>
                            <p>{cart?.totalQty}</p>
                        </div>
                        {cart?.products?.map((item, index) => (
                            <div key={index} className="border-b flex p-4 gap-x-4 items-center">
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-[80px] h-[80px] object-contain border p-1"
                                />
                                <div className="flex flex-col">
                                    <p>{item?.name}</p>
                                    <p>Price: ₹{item?.price}</p>
                                    <p>Quantity: {item?.quantity}</p>
                                </div>
                                <div className="flex items-center border h-fit rounded-lg ms-auto">
                                    <button
                                        className="px-4 py-0"
                                        onClick={() => handleUpdateQty(item.productId, 'decrement')}
                                    >
                                        -
                                    </button>
                                    <p className="px-4">{item?.quantity}</p>
                                    <button
                                        className="px-4 py-0"
                                        onClick={() => handleUpdateQty(item.productId, 'increment')}
                                    >
                                        +
                                    </button>
                                </div>
                                <MdDelete className="w-6 h-6 cursor-pointer" />
                            </div>
                        ))}
                    </div>

                    <div className="border w-1/4 p-4">
                        <h1>Subtotal: ₹{cart?.totalAmt}</h1>
                        <h1>Delivery Charge: ₹{import.meta.env.VITE_AMT}</h1>
                        <button className="h-fit py-2 mt-6">Go Checkout</button>
                    </div>
                </div>
            ) : (
                <p>No carts found!</p>
            )}
        </div>
    );
};

export default CartPage;
