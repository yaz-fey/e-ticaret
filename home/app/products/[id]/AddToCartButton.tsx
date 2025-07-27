'use client';
import { useState } from 'react';
import { Product } from '../productsData';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const addToCart = async () => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:4002/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      setToast(`${product.name} sepete eklendi!`);
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast('Bir hata oluştu. Lütfen tekrar deneyin.');
      setTimeout(() => setToast(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={addToCart}
        disabled={isLoading}
      >
        {isLoading ? 'Ekleniyor...' : 'Sepete Ekle'}
      </button>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-bounce z-50">
          {toast}
        </div>
      )}
    </>
  );
} 