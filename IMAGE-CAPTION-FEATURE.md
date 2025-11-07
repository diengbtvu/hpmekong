# ✅ Tính năng thêm Caption cho Ảnh

## 🎉 Đã hoàn thành

Chức năng thêm caption (chú thích) cho ảnh trong Rich Text Editor đã được triển khai!

---

## 📝 Mô tả tính năng

Khi viết bài và chèn ảnh vào nội dung, hệ thống sẽ hiển thị một modal để bạn nhập:

### 1. **Alt Text** (Văn bản thay thế)
- Mô tả ngắn gọn nội dung ảnh
- Tốt cho SEO
- Giúp người khuyết tật hiểu nội dung ảnh
- **Ví dụ:** "Học viên đang thực hành lập trình trong lớp học"

### 2. **Caption** (Chú thích)
- Hiển thị bên dưới ảnh
- Font chữ nhỏ, màu xám, in nghiêng
- Tùy chọn (có thể bỏ qua)
- **Ví dụ:** "Hình 1: Học viên khóa học Lập trình Web tại Happy World Mekong - Tháng 10/2024"

---

## 🖼️ Giao diện Modal

Sau khi upload ảnh thành công, modal sẽ xuất hiện với:

```
┌─────────────────────────────────────────┐
│  Thêm mô tả cho ảnh                  [X]│
├─────────────────────────────────────────┤
│                                         │
│  [Preview Image]                        │
│                                         │
├─────────────────────────────────────────┤
│  Alt Text (Văn bản thay thế)           │
│  [Mô tả ngắn gọn...]                   │
│                                         │
│  Caption (Chú thích)                    │
│  [Nhập chú thích cho ảnh...]           │
│  Caption sẽ hiển thị dưới ảnh...       │
│                                         │
│  [✓ Chèn ảnh]  [Bỏ qua]               │
└─────────────────────────────────────────┘
```

---

## 🚀 Cách sử dụng

### 1. Viết bài mới
1. Vào **Admin Dashboard** → **Quản lý bài viết**
2. Click **"Thêm Bài viết"**
3. Trong Rich Text Editor, click icon **Image** (hình ảnh)
4. Chọn file ảnh từ máy tính
5. Đợi upload (sẽ có thông báo "Đang tải ảnh...")

### 2. Nhập thông tin ảnh
Sau khi upload thành công, modal sẽ hiện:
1. **Alt Text:** Nhập mô tả ngắn (khuyến nghị)
2. **Caption:** Nhập chú thích (tùy chọn)
3. Click **"Chèn ảnh"** hoặc **"Bỏ qua"**

### 3. Kết quả
- Ảnh sẽ được chèn vào bài viết
- Caption (nếu có) hiển thị ngay dưới ảnh với style:
  - Font nhỏ hơn
  - Màu xám (#6b7280)
  - In nghiêng
  - Căn giữa

---

## 📋 Ví dụ cụ thể

### Input
```
Alt Text: Học viên học lập trình web
Caption: Hình 1: Buổi học thực hành tại phòng lab A201
```

### Output HTML
```html
<img src="https://hwm.edu.vn/uploads/posts/abc-123.png" 
     alt="Học viên học lập trình web"
     title="Hình 1: Buổi học thực hành tại phòng lab A201">
<p style="font-style: italic; color: #6b7280; font-size: small;">
  Hình 1: Buổi học thực hành tại phòng lab A201
</p>
```

### Hiển thị trên web
```
┌─────────────────────────────┐
│                             │
│     [Ảnh học viên]          │
│                             │
└─────────────────────────────┘
  Hình 1: Buổi học thực hành...
  (chữ nhỏ, xám, nghiêng)
```

---

## ⚙️ Chi tiết kỹ thuật

### File đã sửa
- `src/components/admin/RichTextEditor.jsx`

### Thay đổi
1. **State mới:**
   - `showCaptionModal` - Hiển thị/ẩn modal
   - `pendingImage` - Lưu URL ảnh vừa upload
   - `imageCaption` - Nội dung caption
   - `imageAlt` - Nội dung alt text

2. **Functions mới:**
   - `insertImageWithCaption()` - Chèn ảnh với caption
   - `handleCaptionSubmit()` - Xử lý khi submit
   - `handleCaptionSkip()` - Xử lý khi bỏ qua

3. **UI mới:**
   - Modal với 2 input fields
   - Preview ảnh
   - 2 buttons: "Chèn ảnh" và "Bỏ qua"

### Quill Editor
- Sử dụng `quill.insertEmbed()` để chèn ảnh
- Sử dụng `quill.insertText()` để thêm caption
- Format caption: `{ italic: true, color: '#6b7280', size: 'small' }`

---

## 🎯 Lợi ích

### 1. SEO (Search Engine Optimization)
- **Alt text** giúp Google hiểu nội dung ảnh
- Tăng khả năng xuất hiện trong Google Images
- Cải thiện ranking tổng thể

### 2. Accessibility (Khả năng tiếp cận)
- Người khiếm thị dùng screen reader có thể "nghe" mô tả ảnh
- Tuân thủ WCAG standards

### 3. User Experience
- Caption giúp người đọc hiểu rõ hơn về ảnh
- Tăng tính chuyên nghiệp cho bài viết
- Dễ dàng tham chiếu (Hình 1, Hình 2...)

### 4. Content Quality
- Bài viết có cấu trúc rõ ràng
- Dễ đọc, dễ hiểu
- Tăng giá trị nội dung

---

## 🧪 Test

### Test case 1: Upload ảnh có caption
```
✅ Upload ảnh thành công
✅ Modal hiển thị
✅ Nhập alt text: "Test image"
✅ Nhập caption: "Đây là ảnh test"
✅ Click "Chèn ảnh"
✅ Ảnh xuất hiện với caption bên dưới
```

### Test case 2: Upload ảnh không có caption
```
✅ Upload ảnh thành công
✅ Modal hiển thị
✅ Click "Bỏ qua"
✅ Ảnh xuất hiện không có caption
```

### Test case 3: Chỉ có alt text
```
✅ Upload ảnh thành công
✅ Nhập alt text: "Important image"
✅ Bỏ trống caption
✅ Click "Chèn ảnh"
✅ Ảnh có alt text nhưng không có caption hiển thị
```

---

## 📱 Responsive

Modal tự động responsive:
- Desktop: Width tối đa 512px, giữa màn hình
- Mobile: Margin 16px hai bên
- Ảnh preview: Max height 256px, auto scale

---

## 🔄 Workflow hoàn chỉnh

```
User click icon Image
    ↓
Chọn file từ máy
    ↓
Upload lên server (/api/v1/files/upload/image)
    ↓
Server trả về URL
    ↓
Hiển thị Modal với preview
    ↓
User nhập Alt Text & Caption
    ↓
Click "Chèn ảnh" hoặc "Bỏ qua"
    ↓
Ảnh được chèn vào editor
    ↓
Caption hiển thị bên dưới (nếu có)
```

---

## 💡 Best Practices

### Alt Text
- ✅ **TỐT:** "Học viên thực hành coding trên laptop"
- ❌ **KHÔNG TỐT:** "Ảnh"
- ❌ **KHÔNG TỐT:** "image.jpg"

### Caption
- ✅ **TỐT:** "Hình 1: Buổi workshop Reactjs tại HWM - Tháng 10/2024"
- ✅ **TỐT:** "Nguồn: Happy World Mekong"
- ❌ **KHÔNG TỐT:** Quá dài, nhiều đoạn văn

---

## 🚀 Deploy

### Đã deploy
- ✅ Code đã commit: `cc06166`
- ✅ Frontend đã rebuild
- ✅ Container đã restart
- ✅ Đang chạy trên production: https://hwm.edu.vn

### Test trên production
1. Truy cập: https://hwm.edu.vn/login
2. Login admin: admin@hwm.edu.vn / Admin@123
3. Vào: **Quản lý bài viết**
4. Thêm bài viết mới
5. Upload ảnh → Modal xuất hiện
6. Test chức năng

---

## 📞 Support

Nếu có vấn đề:
- Check browser console (F12)
- Check container logs: `docker logs hpmekong-frontend`
- Verify build: Image ID mới trong `docker images`

---

## ✅ Checklist

- [x] Code RichTextEditor.jsx
- [x] Add useState for modal
- [x] Add insertImageWithCaption function
- [x] Add modal UI
- [x] Add alt text input
- [x] Add caption textarea
- [x] Add preview image
- [x] Add action buttons
- [x] Style modal (responsive)
- [x] Test upload flow
- [x] Commit code
- [x] Build frontend
- [x] Deploy to production
- [x] Documentation

---

**Status:** ✅ PRODUCTION READY

Chức năng caption cho ảnh đã hoàn toàn sẵn sàng sử dụng!

🎉 Enjoy!
