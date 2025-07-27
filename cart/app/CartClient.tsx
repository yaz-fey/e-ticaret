'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    console.log('CART STORAGE:', stored);
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  if (cart === null) {
    return <div className="min-h-screen bg-gray-50 p-8">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Sepetim</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Sepetinizde ürün yok.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, idx) => (
            <li key={idx} className="bg-white rounded-lg shadow p-4 flex items-center">
              <Image 
                src={item.image} 
                alt={item.name} 
                width={64}
                height={64}
                className="object-cover rounded mr-4" 
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">{item.price} TL</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}