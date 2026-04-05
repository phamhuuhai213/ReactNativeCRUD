# React Native Smart CRUD App ✨

Một ứng dụng di động quản lý sản phẩm hiện đại được xây dựng bằng React Native (Expo) và Firebase. Ứng dụng nổi bật với việc tích hợp trí tuệ nhân tạo (AI Vision) thông qua OpenRouter để tự động hoá điền thông tin sản phẩm từ hình ảnh.

## 🚀 Tính năng nổi bật

- **Kiến trúc Clean Architecture:** Tách biệt rõ ràng UI (Components/Screens), Logic (Hooks), và Backend (Services), giúp dễ dàng bảo trì và mở rộng.
- **Xác thực người dùng:** Đăng nhập an toàn với Firebase Authentication.
- **Quản lý sản phẩm (CRUD):** Thêm, sửa, xem, và theo dõi danh sách sản phẩm thời gian thực (Real-time update) với Firebase Firestore.
- **Tích hợp tính năng AI Vision (Mới):** Tự động nhận diện hình ảnh của sản phẩm tải lên và sử dụng các AI Model tiên tiến nhất qua cổng OpenRouter. AI sẽ tự động phân tích và trích xuất Tên, Giá, Danh mục... để điền ngay lập tức vào form.

## 🛠 Công nghệ sử dụng

- **Frontend:** React Native, Expo Router (File-based Routing), React Native Reanimated.
- **Backend (BaaS):** Firebase (Firestore Database, Firebase Auth).
- **AI Integration:** Xử lý qua OpenRouter API.
- **Language:** TypeScript.

## 📂 Cấu trúc thư mục

- `app/` - Các màn hình giao diện dựa trên file-based routing của Expo.
- `components/` - Các UI component dùng lại được (chẳng hạn như `ProductCard`, `FormInput`, `ImageUploadArea`).
- `hooks/` - Chứa logic xử lý của các màn hình nhằm giảm tải cho UI (như `useProducts`, `useProductForm`).
- `services/` - Chịu trách nhiệm tương tác với bên ngoài như database, bộ nhớ thiết bị, máy ảnh, kết nối AI (`authService.ts`, `productService.ts`, `imageService.ts`, `aiService.ts`).
- `constants/` - Các file quy chuẩn dùng chung tĩnh (themes, màu sắc gốc, các mảng danh mục - Categories).

## ⚙️ Hướng dẫn cài đặt

### 1. Cài đặt thư viện phụ thuộc
Sau khi tải mã nguồn về, hãy cài đặt các gói cần thiết:
```bash
npm install
```

### 2. Thiết lập cấu hình hệ thống
1. **Thiết lập Firebase Database:** 
   - Đảm bảo bạn đã dán chính xác file và cấu hình thông số Firebase của mình nội trong file `firebaseConfig.ts`.
2. **Thiết lập AI OpenRouter:** 
   - Nếu bạn muốn sử dụng tính năng AI Scan mạnh mẽ: Truy cập [OpenRouter.ai](https://openrouter.ai/), tạo một tài khoản và lấy mã API Key miễn phí.
   - Mở file `services/aiService.ts`, tìm dòng khai báo biến `OPENROUTER_API_KEY` và thay key của bạn vào.

### 3. Khởi động ứng dụng
```bash
npx expo start
```
Thực hiện quét mã QR xuất hiện trên màn hình terminal bằng ứng dụng **Expo Go** trên thiết bị điện thoại (Android / iOS).

## Nhiệm vụ
Phát triển bởi bạn và trợ lý Antigravity AI. Đảm bảo chạy ổn định trên các nền tảng di động khác nhau.
