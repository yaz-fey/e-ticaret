'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { products } from './products/productsData';

type Product = { id: number; name: string; price: number; image: string };

type CartProduct = Product & { quantity: number };

export default function HomePage() {
  const [toast, setToast] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);

  // Sepeti API'dan çek
  const fetchCart = async () => {
    const res = await fetch('http://localhost:4002/cart');
    const data: Product[] = await res.json();
    // Aynı ürünleri grupla
    const grouped: Record<number, CartProduct> = {};
    data.forEach((item) => {
      if (grouped[item.id]) {
        grouped[item.id].quantity += 1;
      } else {
        grouped[item.id] = { ...item, quantity: 1 };
      }
    });
    setCartItems(Object.values(grouped));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    await fetch('http://localhost:4002/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    setToast(`${product.name} sepete eklendi!`);
    setTimeout(() => setToast(null), 2000);
    fetchCart();
  };

  // Sepet açılır kutusunu kapatmak için
  useEffect(() => {
    if (!cartOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (cartIconRef.current && !cartIconRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative xl:px-32 lg:px-20">
      {/* Sağ üstte sepet ikonu */}
      <CartIcon cartItems={cartItems} />
      {/* Ürünler */}
      <h1 className="text-3xl font-bold mb-6 xl:pl-8 lg:pl-5">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <Link href={`/products/${product.id}`} className="block w-auto group w-full">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={200}
                height={200}
                className="object-cover mb-4 rounded cursor-pointer group-hover:opacity-80 transition w-full" 
              />
              <h2 className="text-xl font-semibold mb-2 text-center cursor-pointer group-hover:text-blue-600 transition">{product.name}</h2>
              <p className="text-gray-700 mb-4 text-center cursor-pointer group-hover:text-blue-600 transition">{product.price} TL</p>
            </Link>
            <button
              className="w-full px-4 py-2 rounded transition border"
              style={{
                color: '#15235e',
                backgroundColor: '#fff',
                borderColor: '#15235e',
                borderWidth: '2px',
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#15235e';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#15235e';
              }}
              onClick={() => addToCart(product)}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-bounce z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
