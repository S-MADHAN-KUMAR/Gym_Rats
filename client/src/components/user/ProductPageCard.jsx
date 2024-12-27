import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MdStar } from 'react-icons/md';
import { addToCart } from '../../pages/user/helpers/cart.js';

const ProductPageCard = ({ product }) => {
    const { currentUser } = useSelector((state) => state.user)

    const navigate = useNavigate()

    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    const images = Array.isArray(product.imageUrls) ? product.imageUrls : [];

    const getRandomImage = () => {
        if (images.length === 0) return 'fallback-image.jpg';
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const isHotProduct = (updatedAt, thresholdDays = 2) => {
        const currentDate = new Date();
        const productDate = new Date(updatedAt);
        const timeDifference = (currentDate - productDate) / (1000 * 3600 * 24);
        return timeDifference <= thresholdDays;
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(currentUser?._id, product?._id, setAdded);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    return (
        <div className="z-10 relative rounded-[16px] shadow-md sm:w-[220px] w-[180px] h-[290px] sm:h-[300px] bg-[#86aabb11] p-2 flex flex-col items-center">
            <Link to={`/products/${product._id}`}>
                <div className="md:w-[200px] md:h-[180px]">
                    <motion.img
                        src={hovered && images.length > 1 ? getRandomImage() : images[0] || 'fallback-image.jpg'}
                        alt={product.name}
                        className="p-5 object-contain w-full h-full cursor-pointer shadow rounded-[10px] bg-[#ffff]"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>
            </Link>

            <div className="mt-2 h-full px-1 justify-between flex flex-col w-full">
                <div className="flex mb-1 items-center justify-between">
                    <h1 className="font-Roboto text-sm sm:text-[17px] truncate">{product.name}</h1>
                    <FaRegHeart className="w-5 h-5 cursor-pointer hover:scale-110" />
                </div>

                <div className="flex justify-between items-center font-Roboto">
                    <p className="font-medium">₹ {product.price}</p>
                    <div className="text-yellow-300 flex">
                        {Array(5)
                            .fill(null)
                            .map((_, index) => (
                                <MdStar key={index} className="w-3 h-3 text-yellow-400" />
                            ))}
                        <p className="text-yellow-400 font-Roboto ms-1 text-xs font-medium">9.6</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <p className="line-through text-gray-500 text-xs">₹ {product.price + 2000}</p>
                    {added ? (
                        <button
                        onClick={()=>navigate('/cart')}
                            className="bg-green-600 rounded-lg text-white font-Roboto text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2 hover:scale-105 float-right"
                        >
                            <FaPlus /> Go to cart
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="bg-black rounded-lg text-white font-Roboto text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2 hover:scale-105 float-right"
                        >
                            <FaPlus /> Add to cart
                        </button>
                    )}
                </div>

                {isHotProduct(product.updatedAt) && (
                    <div className="cursor-pointer hover:scale-105 absolute -top-6 sm:-top-2 -right-3 bg-[#A3E81D] px-3 py-1 rounded-sm w-fit">
                        <p className="font-Roboto font-semibold text-xs">HOT</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPageCard;
