'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = { id: number; name: string; price: number; image: string };
type CartProduct = Product & { quantity: number };

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const fetchCart = async () => {
    const res = await fetch('http://localhost:4002/cart');
    const data: Product[] = await res.json();
    // Group by id and count quantity
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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const PLACEHOLDER_IMAGE = 'https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg?t=st=1753556697~exp=1753560297~hmac=c5d810136ed2b38f5ef3fe4c211d2a711b150fc02d3a3c376e19ed23d6fdea01&w=1380';

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 xl:px-32 lg:px-20">
      <h1 className="text-3xl font-bold mb-6">Sepetim</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mb-10 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Sepetteki Ürünler</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Sepetiniz boş.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500"></th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ürün Adı</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Fiyat</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Adet</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ara Toplam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <Image 
                      src={PLACEHOLDER_IMAGE} 
                      alt={item.name} 
                      width={56}
                      height={56}
                      className="object-cover rounded" 
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">{item.name}</td>
                  <td className="px-4 py-2">{item.price} TL</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.price * item.quantity} TL</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="px-4 py-2 text-right font-bold">Toplam</td>
                <td className="px-4 py-2 font-bold">{total} TL</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}
