import ProductList from '@/components/ProductList';

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function Home() {
  const { products } = await getProducts()
  return <main className="max-w-7xl mx-auto">
    <ProductList products={products} />
  </main>
}
