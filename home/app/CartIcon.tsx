import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartIconProps = {
  cartItems: CartProduct[];
};

const CartIcon: React.FC<CartIconProps> = ({ cartItems }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    window.location.href = 'http://localhost:3001/cart';
  };

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
    <div className="fixed top-6 right-8 z-50 xl:px-32 lg:px-20" ref={cartIconRef}>
      <div
        className="relative cursor-pointer"
        onClick={handleCartClick}
        onMouseEnter={() => setCartOpen(true)}
        onMouseLeave={() => setCartOpen(false)}
      >
        {/* Sepet SVG ikonu */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#15235e" className="w-10 h-10 transition">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385m-1.7-6.385h13.45c.708 0 1.236.678 1.07 1.364l-1.272 5.09a1.125 1.125 0 01-1.07.836H6.634m0 0L5.25 19.125A1.125 1.125 0 006.375 20.25h11.25a1.125 1.125 0 001.125-1.125V17.25m-13.5 0h13.5" />
        </svg>
        {/* Badge */}
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white">
            {totalQuantity}
          </span>
        )}
        {/* Hover ile açılır sepet içeriği */}
        {cartOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fade-in z-50">
            <h3 className="font-bold mb-2">Sepetiniz</h3>
            {cartItems.length === 0 ? (
              <div className="text-gray-500">Sepetiniz boş.</div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center mb-2 last:mb-0">
                    <Image src={item.image} alt={item.name} width={40} height={40} className="rounded mr-2" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-gray-600">{item.price} TL x {item.quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartIcon; 