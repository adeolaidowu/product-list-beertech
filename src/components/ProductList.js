import Image from 'next/image'

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function ProductList() {
    const products = await getProducts()
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product">
                    <div className="product-img">
                        <Image src={product.image} width={500}
                            height={500}
                            alt="Picture of the product" />
                    </div>
                    <div className="product-details">
                        <h3>{product.title}</h3>
                        <p>Price: N{product.price}</p>
                    </div>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}
