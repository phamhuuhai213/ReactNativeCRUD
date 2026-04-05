# Hướng Dẫn Kiến Trúc & Luồng Hoạt Động Của Ứng Dụng

Ứng dụng của bạn là một app Quản lý Sản phẩm (Admin Portal) được xây dựng rất hiện đại theo chuẩn kiến trúc **Tách biệt mối quan tâm (Separation of Concerns)**. 

Dưới đây là bức tranh toàn cảnh để bạn dễ dàng nắm bắt và tự tin sửa code sau này:

---

## 🚀 1. Ứng dụng dùng gì để chạy?
- **Frontend Core:** `React Native` kết hợp với nền tảng `Expo` (giúp bạn build gốc app và test trên iOS/Android siêu nhanh qua app Expo Go).
- **Navigation (Điều hướng):** `Expo Router` (Định tuyến dựa trên cấu trúc file - File-based Routing giống như hệ thống Next.js danh tiếng).
- **Backend (Dữ liệu & Xác thực):** `Firebase` (Cụ thể là dùng *Firebase Authenication* để lo vụ user đăng nhập, và *Firestore* để lưu trữ danh sách sản phẩm dạng cơ sở dữ liệu thời gian thực).

---

## 🔄 2. Luồng hoạt động (Mở app lên thì luồng chạy như thế nào?)

Mọi thứ bắt đầu từ điểm vào: **`app/_layout.tsx`** (Đây là cổng chính của toàn bộ app).

### Bước 1: Khởi tạo và Kiểm tra Đăng nhập chặn cửa
- Ngay khi bạn vừa mở app, `app/_layout.tsx` sẽ bọc toàn bộ màn hình bằng một Provider xác thực (tên là `<AuthProvider>`). 
- Nơi cấu hình Provider này là file `components/AuthContext.tsx`. Nó sẽ lập tức gọi lệnh `subscribeAuthChange` (nằm trong `services/authService.ts`) xuống cloud Firebase nhằm kiểm tra xem trên máy bạn đã có sẵn thông tin đăng nhập chưa.
- **Nếu CHƯA có token đăng nhập**: Hàm `useEffect` dưới Root sẽ phát hiện và ngay lập tức đá (redirect) người dùng văng về màn hình Đăng nhập (file `app/login.tsx`).
- **Nếu ĐÃ đăng nhập từ trước**: Nó sẽ đóng cổng đăng nhập để người dùng lọt vào khu vực chính luôn là nhánh `app/(admin)`.

### Bước 2: Nhánh (admin) - Nơi làm việc chính của bạn
Tại thư mục nhánh `app/(admin)`, bạn có:
- **`_layout.tsx`**: Trách nhiệm của file này chỉ là thiết kế Thanh Tab có chứa Nút (Bottom Tabs) dưới đáy màn hình.
- **`index.tsx`**: Đây là màn hình **Trang chủ Danh sách sản phẩm**.
  - Nó không tự lấy data đâu, mà vừa mở ra nó sẽ gọi 1 bạn trợ lý là Hook `useProducts.ts` (ở trong thư mục `hooks/`).
  - Trợ lý này lại đi đập cửa kho dữ liệu `services/productService.ts` nhờ gọi API `subscribeProducts()` kết nối thẳng tới Firebase để lấy toàn bộ danh sách sản phẩm.
  - Nhờ có cơ chế Realtime (thời gian thực), lúc nào Firebase báo có sự thay đổi là màn hình này tự cập nhật. Tính năng lọc Tìm kiếm cũng được gánh hết bởi trợ lý này!
- **`profile.tsx`**: Màn hình cài đặt/đổi pass (Cơ chế tương tự, giao diện không có logic trực tiếp mà phụ thuộc gọi xuống `services/authService.ts`).

### Bước 3: Thêm / Sửa sản phẩm
Khi bạn bấm nút CỘNG hoặc icon EDIT, ứng dụng sẽ ra lệnh điều hướng: `router.push('/add-product')`:
- File màn hình `app/add-product.tsx` sẽ trượt từ dưới lên dạng model.
- Khúc này logic rất rườm rà (tạo biến, gọi album ảnh, xử lý bấm nút), nên mình đã vứt hết trọn gói logic đó vào tay trợ lý **`hooks/useProductForm.ts`**. Màn hình chỉ việc "Alo trợ lý, tao đang ở màn hình form đây, lo giùm"!!
- Nếu người dùng bấm vô ảnh ➡️ Trợ lý sẽ gọi `pickImageFromLibrary` trong `services/imageService.ts` để lấy base64 của bức hình.
- Nếu bấm Xong/Lưu ➡️ Trợ lý sẽ gói cục data đẩy thẳng vô hàm `addProduct` hoặc `updateProduct` của máy chủ DB `services/productService.ts`. Thành công thì tắt Form rồi cho về lại Home.

---

## 🛠 3. Bỏ túi nguyên tắc: Hỏng góc nào, Vút góc đó!

Cấu trúc trên được gọi là *Clean Architecture*. Với thiết kế 3 tầng này, khi muốn sửa tính năng gì, thay vì cuống cuồng đọc hết code từ trên xuống dưới, bạn chỉ áp dụng quy tắc: **"Sửa cái gì thì vào đúng phòng cái đó"**:

**Ví dụ 1: Bạn muốn sửa màu chữ, khoảng cách, đổi font hay thay icon? (Chạm vào Tầng Màn Hình / UI)**
👉  Chỉ tìm ở thư mục `components/` (sửa FormInput, đổi màu cục thẻ ProductCard...) hoặc mở trực tiếp màn hình đó khu vực Render & CSS dưới cùng (vd `app/add-product.tsx`). Không phải rớ tới tầng API!

**Ví dụ 2: Lúc bấm "Lưu sản phẩm", tôi muốn báo lỗi nếu user không nhập Giá? (Chạm vào Tầng Logic Điều Khiển)**
👉  Đi tìm ngay cái tay Trợ lý của cái Màn hình đấy. Chính là thư mục `hooks/`. Bạn chạy rẹt vào `hooks/useProductForm.ts`, kiếm cái hàm `saveProduct()` rồi vã lệnh if-else bắt buộc phải điền form ở đó. Thấy rõ ràng không, giao diện màn hình sẽ không bị phình to code ra!

**Ví dụ 3: Bạn muốn đổi thư viện chọn ảnh khác, hoặc lấy ảnh lên xịn hơn nét hơn? (Chạm vào Tầng Service Trực Tiếp)**
👉  Bất cứ cái gì chạm vào việc cấu hình Máy ảnh điện thoại, Data Firebase thì tìm ngay đến thư mục `services/`. Dính dáng cái Ảnh thì qua `services/imageService.ts` đổi tỷ lệ `quality` thôi! Giả sử 1 ngày sếp đòi vứt kho Firebase, đổi sang API viết bằng Node.js của phòng ban khác? Đơn giản luôn, vô folder services thay cái logic Firebase ra và kết nối fetch JSON cực sạch sẽ!

**Ví dụ 4: Bạn muốn trỏ Data Firebase sang một nick Github/Tài khoản Firebase khác hoàn toàn?**
👉  Thực hiện ngay ở file cấu hình tổng quan duy nhất: `firebaseConfig.js`.

> 💡 **Khẩu quyết cho Dev Native:** Đừng bao giờ làm code giao diện lại đi biết cách xử lý lỗi mạng hay chọc thẳng vào Database nữa. Giao tiếp luôn theo 1 chiều: `Giao diện (app/, components/)` 🗣️ ↔️ `Trợ lý (hooks/)` 🗣️ ↔️ `Database (services/)`. 
Chúc bạn hiểu rõ tường tận app của mình!
