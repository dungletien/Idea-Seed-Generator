# 💡 Idea Seed Generator - Hướng Dẫn Cài Đặt

## 🚀 Bắt Đầu Nhanh

### 1. Cài đặt dependencies

Mở terminal và chạy lệnh:

```bash
npm install
```

### 2. Chạy ứng dụng

```bash
npm run dev
```

### 3. Mở trình duyệt

Truy cập: [http://localhost:3000](http://localhost:3000)

### 4. Kết nối ví IOTA

Để sử dụng ứng dụng, bạn cần:

1. **Cài đặt ví IOTA** (một trong các ví sau):
   - IOTA Wallet Extension (Chrome/Firefox)
   - Ethos Wallet
   - Suiet Wallet

2. **Kết nối ví**:
   - Click vào nút **"Connect Wallet"** trên giao diện
   - Chọn ví bạn đã cài đặt
   - Xác nhận kết nối

### 5. Sử dụng ứng dụng

**Đề xuất Ý tưởng mới:**
1. Nhập tiêu đề ý tưởng
2. Chọn danh mục (Technology, Art, Social Impact, v.v.)
3. Mô tả chi tiết ý tưởng của bạn
4. Click "🌱 Propose Idea"

**Hỗ trợ Ý tưởng:**
1. Xem danh sách ý tưởng từ cộng đồng
2. Click "💧 Water This Idea" để hỗ trợ
3. Mỗi lần hỗ trợ sẽ tăng điểm phát triển cho ý tưởng

## 🔧 Khắc Phục Sự Cố

### Không kết nối được ví?

**Giải pháp:**

1. **Kiểm tra đã cài đặt ví chưa:**
   - Vào trang Extensions của trình duyệt
   - Tìm IOTA Wallet, Ethos, hoặc Suiet
   - Nếu chưa có, tải về và cài đặt

2. **Kiểm tra network:**
   - Ứng dụng đang dùng **testnet**
   - Đảm bảo ví của bạn cũng đang ở testnet

3. **Xóa cache và thử lại:**
   ```bash
   # Dừng ứng dụng (Ctrl+C)
   # Xóa cache
   rm -rf .next
   # Chạy lại
   npm run dev
   ```

4. **Kiểm tra dependencies:**
   ```bash
   npm install --force
   ```

### Lỗi khi đề xuất ý tưởng?

**Nguyên nhân:** Package ID chưa được cấu hình hoặc contract chưa deploy.

**Giải pháp:**
- Hiện tại ứng dụng đang ở chế độ demo
- Bạn có thể deploy contract riêng bằng lệnh:
  ```bash
  npm run iota-deploy
  ```
- Sau đó cập nhật Package ID trong file `lib/config.ts`

## 📝 Cấu Trúc Dự Án

```
iota_project/
├── app/                          # Next.js app
│   ├── page.tsx                 # Trang chủ
│   └── layout.tsx               # Layout chính
├── components/                   # Components React
│   ├── IdeaSeedIntegration.tsx # Giao diện chính
│   ├── Provider.tsx             # Provider cho IOTA
│   └── Wallet-connect.tsx       # Kết nối ví
├── contract/                     # Smart contract
│   └── idea_seed/
│       └── sources/
│           └── idea_seed.move   # Contract Move
├── hooks/                        # Custom hooks
│   └── useContract.ts           # Logic tương tác contract
└── lib/                          # Utilities
    └── config.ts                # Cấu hình network
```

## 🌟 Tính Năng

- ✅ Đề xuất ý tưởng mới
- ✅ Hỗ trợ ý tưởng của người khác
- ✅ Theo dõi mức độ phát triển
- ✅ Lưu trữ trên blockchain IOTA
- ✅ Kết nối ví an toàn

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** Next.js 16, React 19, TypeScript
- **Blockchain:** IOTA, Move language
- **UI:** Radix UI, Tailwind CSS
- **Ví:** IOTA dApp Kit

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra lại các bước cài đặt
2. Xem phần "Khắc Phục Sự Cố" ở trên
3. Mở issue trên GitHub

---

**Được xây dựng với ❤️ trên IOTA blockchain**
