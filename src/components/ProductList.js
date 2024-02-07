"use client"
import { useState } from 'react'
import Image from 'next/image'

//icons
import { BsCart4 } from 'react-icons/bs'


export default function ProductList({ products }) {
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [cartItems, setCartItems] = useState([]);

    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
        product.stock--;
    };

    return (
        <div className="min-h-screen">
            <h1 className="header">Product List</h1>
            <div className="filters-container">
                <div className="filters ">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md mr-2 mb-2 sm:mb-0 sm:mr-4 focus:outline-none"
                    />
                    <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none"
                    >
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
                <div className="relative">
                    <div className="cart ">
                        <BsCart4 />
                    </div>
                    {cartItems.length > 0 && (
                        <div className="cart-items">
                            {cartItems.length}
                        </div>
                    )}
                </div>
            </div>
            <div className="product-list-container">
                {sortedProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-img">
                            <Image
                                src={product.images[0]}
                                width={200}
                                height={200}
                                alt="Picture of the product"
                            />
                        </div>
                        <div className="product-details ">
                            <h3 className="text-lg font-semibold">{product.title}</h3>
                            <p className="text-gray-600">Price: ₦{product.price}</p>
                            <p className="text-gray-600">Stock: {product.stock}</p>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="cta-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}