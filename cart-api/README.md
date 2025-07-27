# cart-api

Bu servis, mikro-frontend uygulamalarınız arasında sepet (cart) bilgisini paylaşmak için basit bir backend API sağlar.

## Kullanım

1. Bağımlılıkları yükleyin:
   ```
   npm install
   ```
2. API'yı başlatın:
   ```
   npm start
   ```
   API, `http://localhost:4002` adresinde çalışacaktır.

## Endpointler
- `GET /cart`   : Sepetteki ürünleri getirir
- `POST /cart`  : Sepete ürün ekler (JSON body ile)
- `DELETE /cart`: Sepeti temizler 