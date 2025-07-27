"use client";
import { useState, useEffect } from 'react';
import CartIcon from '../../CartIcon';

type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartIconWrapper() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  useEffect(() => {
    fetch('http://localhost:4002/cart')
      .then(res => res.json())
      .then((data) => {
        const grouped: Record<number, CartProduct> = {};
        data.forEach((item: CartProduct) => {
          if (grouped[item.id]) {
            grouped[item.id].quantity += 1;
          } else {
            grouped[item.id] = { ...item, quantity: 1 };
          }
        });
        setCartItems(Object.values(grouped));
      });
  }, []);
  return <CartIcon cartItems={cartItems} />;
} 