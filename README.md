# Bitki Bakım Rehberi

Tek sayfa demo uygulaması. Aşağıdaki adımlarla yerelde çalıştırabilirsiniz.

## Çalıştırma

Tarayıcıdan doğrudan açabilirsiniz:

- `index.html` dosyasını açın.

Veya yerel sunucu ile çalıştırmak isterseniz:

```bash
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` adresini açın.

## Özellikler

- Bitki bakım rehberi arama alanı
- Bitki türü ve hastalık tespiti için fotoğraf yükleme/çekme alanı
- Yönetim paneli giriş sistemi
- API anahtarları ve model seçimi
- Yedek API desteği ve günlük sorgu limiti
- Yeni bitki rehberi ekleme
- WhatsApp iletişim butonu
- Tek sayfa düzen

## Varsayılan yönetim bilgileri

- Kullanıcı adı: `admin`
- Şifre: `admin123`

## Not

Bu örnek, prototip amaçlıdır. Gerçek AI/API çağrıları için sunucu tarafında güvenli bir API katmanı eklenmesi gerekir.
