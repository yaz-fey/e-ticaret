export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Ürün 1',
    price: 100,
    image: 'https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg?t=st=1753556697~exp=1753560297~hmac=c5d810136ed2b38f5ef3fe4c211d2a711b150fc02d3a3c376e19ed23d6fdea01&w=1380',
    description: 'Bu ürün hakkında detaylı açıklama. Yüksek kaliteli malzeme ve uzun ömürlü kullanım.'
  },
  {
    id: 2,
    name: 'Ürün 2',
    price: 200,
    image: 'https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg?t=st=1753556697~exp=1753560297~hmac=c5d810136ed2b38f5ef3fe4c211d2a711b150fc02d3a3c376e19ed23d6fdea01&w=1380',
    description: 'İkinci ürünümüzün detaylı açıklaması. Modern tasarım ve kullanıcı dostu özellikler.'
  },
  {
    id: 3,
    name: 'Ürün 3',
    price: 300,
    image: 'https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg?t=st=1753556697~exp=1753560297~hmac=c5d810136ed2b38f5ef3fe4c211d2a711b150fc02d3a3c376e19ed23d6fdea01&w=1380',
    description: 'Üçüncü ürünümüzün kapsamlı açıklaması. Dayanıklı yapı ve estetik görünüm.'
  },
  {
    id: 4,
    name: 'Ürün 4',
    price: 400,
    image: 'https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg?t=st=1753556697~exp=1753560297~hmac=c5d810136ed2b38f5ef3fe4c211d2a711b150fc02d3a3c376e19ed23d6fdea01&w=1380',
    description: 'Dördüncü ürünümüzün açıklaması. Fiyat/performans ürünü.'
  }
]; 