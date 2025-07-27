import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import CartIconWrapper from './CartIconWrapper';
import { products, Product } from '../productsData';
import { notFound } from 'next/navigation';

// Generate static params for ISR
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Get product data with ISR
async function getProduct(id: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const product = products.find(p => p.id.toString() === id);
  if (!product) {
    notFound();
  }
  return product;
}

// Server Component
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product = await getProduct(id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Sağ üstte sepet ikonu */}
      <CartIconWrapper />
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Ana Sayfa
          </Link>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="text-2xl font-semibold text-blue-600 mb-6">
                {product.price} TL
              </div>

              {product.description && (
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Add to Cart Button */}
              <AddToCartButton product={product} />

              {/* Product Features */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Özellikler</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Yüksek kaliteli malzeme</li>
                  <li>✓ Uzun ömürlü kullanım</li>
                  <li>✓ Modern tasarım</li>
                  <li>✓ Kullanıcı dostu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 