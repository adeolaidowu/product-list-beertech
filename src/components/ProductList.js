"use client"
import { useState } from 'react'
import Image from 'next/image'


export default function ProductList({ products }) {

    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return (
        <div className="product-list">

            <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />

            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>

            {sortedProducts.map(product => (
                <div key={product.id} className="product">
                    <div className="product-img">
                        <Image src={product.images[0]} width={200}
                            height={200}
                            alt="Picture of the product" />
                    </div>
                    <div className="product-details">
                        <h3>{product.title}</h3>
                        <p>Price: #{product.price}</p>
                    </div>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}
