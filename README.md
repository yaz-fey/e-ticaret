# E-Ticaret Mikro-Frontend Projesi

Bu proje, Next.js MultiZone mimarisi ile mikro-frontend yaklaşımını ve ortak bir backend API ile sepet paylaşımını örnekler. Üç bağımsız servis içerir:

- **home**: Ürün listeleme ve sepete ekleme uygulaması (Next.js, port 3000)
- **cart**: Sepetteki ürünleri gösteren uygulama (Next.js, port 3001)
- **cart-api**: Sepet bilgisini tutan backend API (Express.js, port 4002)

## Özellikler

### 🚀 Mikro-Frontend Mimarisi
- **MultiZone Architecture**: Route bazlı ayrım ile iki uygulama tek domain altında
- **Bağımsız Geliştirme**: Her uygulama kendi build sürecine sahip
- **Docker Containerization**: Her servis ayrı container'da çalışır

### ⚡ SSR/ISR Desteği
- **Incremental Static Regeneration**: Ürün detay sayfaları ISR ile optimize edildi
- **Static Generation**: `generateStaticParams` ile önceden build edilen sayfalar
- **API Routes**: Dinamik veri sağlayan API endpoint'leri
- **Performance**: Hızlı sayfa yükleme ve SEO optimizasyonu

### 🔄 State Yönetimi (Redux Toolkit)
- **RTK (Redux Toolkit)**: Modern Redux state yönetimi
- **Async Thunks**: API çağrıları için async action'lar
- **Slice Pattern**: Modüler state yönetimi
- **TypeScript Support**: Tam tip güvenliği

### 🎨 Modern UI/UX
- **Tailwind CSS**: Responsive ve modern tasarım
- **Component Architecture**: Yeniden kullanılabilir bileşenler
- **Toast Notifications**: Kullanıcı geri bildirimi
- **Loading States**: Kullanıcı deneyimi iyileştirmeleri

### 🚀 CI/CD Pipeline
- **GitHub Actions**: Otomatik build ve test
- **Docker Image Building**: Otomatik Docker image oluşturma
- **Production Deployment**: Nginx ile reverse proxy
- **Multi-stage Pipeline**: Test → Build → Deploy

## Gereksinimler
- Node.js 18+
- npm
- Docker & Docker Compose

## Kurulum ve Çalıştırma

### Geliştirme Ortamı

#### 1. cart-api (Backend API)
```
cd cart-api
npm install
npm start
```
API `http://localhost:4002` adresinde çalışır.

#### 2. home (Ana Uygulama)
```
cd home
npm install
npm run dev
```
Uygulama `http://localhost:3000` adresinde çalışır.

#### 3. cart (Sepet Uygulaması)
```
cd cart
npm install
npm run dev
```
Uygulama `http://localhost:3001` adresinde çalışır.

#### 4. Docker ile Tüm Servisleri Başlat
```bash
docker compose up --build
```

### Production Ortamı

#### Docker Compose Production
```bash
export DOCKER_USERNAME=your-username
docker compose -f docker-compose.prod.yml up -d
```

#### Nginx ile Reverse Proxy
Production ortamında Nginx reverse proxy kullanılır:
- Ana uygulama: `http://localhost`
- Sepet: `http://localhost/cart`
- API: `http://localhost/api/cart`

## MultiZone Mimarisi
- **home** uygulamasında `/cart` rotasına gidildiğinde, istekler otomatik olarak cart uygulamasına yönlendirilir.
- home ve cart uygulamaları birbirinden bağımsızdır, sadece route forwarding ile tek domain altında birleşir.
- Sepet verisi, her iki uygulama tarafından da `cart-api` üzerinden paylaşılır.

## SSR/ISR Özellikleri

### Ürün Detay Sayfaları
- `/products/[id]` rotaları ISR ile optimize edildi
- `generateStaticParams` ile önceden build edilen sayfalar
- Dinamik veri güncelleme desteği

### API Routes
- `/api/products` - Tüm ürünleri listeler
- `/api/products/[id]` - Tekil ürün detayları
- Mock veri ile gerçek API simülasyonu

## State Yönetimi (Redux Toolkit)

### Store Yapısı
- **cartSlice**: Sepet state'i ve async thunk'lar
- **uiSlice**: Toast notifications ve loading states
- **Async Thunks**: API çağrıları için

### Kullanım
```typescript
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from './store/slices/cartSlice';

// Component içinde
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);

// Sepete ekleme
dispatch(addToCart(product));
```

## CI/CD Pipeline

### GitHub Actions Workflow
1. **Test Job**: Lint ve build testleri
2. **Build Job**: Docker image'ları oluşturma
3. **Deploy Job**: Production'a deployment

### Otomatik Tetikleyiciler
- `main` branch'e push → Production deployment
- `develop` branch'e push → Test ve build
- Pull Request → Test ve lint kontrolü

## Kullanım
1. `http://localhost:3000` adresine gidin.
2. Ürünleri sepete ekleyin.
3. Ürün detayları için ürün kartlarına tıklayın.
4. `/cart` rotasında sepetinizi görüntüleyin.

## Notlar
- Tüm projeler aynı anda çalışmalıdır.
- Sepet verisi, backend API'da (cart-api) memory'de tutulur (her restart'ta sıfırlanır).
- Tasarımlar Tailwind CSS ile responsive ve moderndir.
- ISR sayesinde sayfalar hızlı yüklenir ve SEO dostudur.
- RTK ile state yönetimi merkezi ve tip güvenli.

## Teknik Detaylar
- **Next.js 15.4.4** App Router kullanımı
- **TypeScript** desteği
- **Redux Toolkit** state yönetimi
- **Docker Compose** ile orchestration
- **MultiZone** ile route forwarding
- **ISR** ile performans optimizasyonu
- **GitHub Actions** CI/CD pipeline
- **Nginx** reverse proxy 