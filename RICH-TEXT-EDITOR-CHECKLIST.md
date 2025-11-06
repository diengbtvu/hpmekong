# ✅ CHECKLIST: KIỂM TRA HỆ THỐNG RICH TEXT EDITOR

## 🎯 Mục tiêu
Đảm bảo hệ thống upload ảnh, định dạng văn bản và hiển thị content hoạt động hoàn hảo.

---

## 📋 CHECKLIST KIỂM TRA

### ✅ 1. Frontend - Rich Text Editor (Quill)

#### A. Component RichTextEditor.jsx
- [x] Import ReactQuill và CSS
- [x] Image upload handler được cấu hình
- [x] API endpoint đúng: `/files/upload/image`
- [x] Toolbar đầy đủ tính năng
- [x] Custom styling cho editor

**Kiểm tra:**
```bash
# File tồn tại
ls -la src/components/admin/RichTextEditor.jsx

# CSS Quill được import
grep "react-quill/dist/quill.snow.css" src/components/admin/RichTextEditor.jsx
```

#### B. PostManagement.jsx
- [x] Import RichTextEditor
- [x] Thay thế FormInput bằng RichTextEditor
- [x] Modal size = "2xl"
- [x] Content field sử dụng RichTextEditor

**Kiểm tra:**
```javascript
// Phải có dòng này
import RichTextEditor from '../../components/admin/RichTextEditor'

// Content field
<RichTextEditor
  label={`${t('content')} *`}
  value={formData.content}
  onChange={(content) => setFormData({...formData, content: content})}
  height={500}
/>
```

---

### ✅ 2. Backend - Upload API

#### A. FileUploadController.java
- [x] Endpoint: `POST /api/v1/files/upload/image`
- [x] Nhận params: file, folder
- [x] Security: @PreAuthorize("isAuthenticated()")
- [x] Return URL trong format đúng

**Test API:**
```bash
# Với token hợp lệ
curl -X POST https://hwm.edu.vn/api/v1/files/upload/image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@test.png" \
  -F "folder=posts"

# Expected response:
{
  "success": true,
  "data": {
    "url": "https://hwm.edu.vn/uploads/posts/UUID.png",
    "filename": "test.png"
  },
  "message": "Upload hình ảnh thành công"
}
```

#### B. StorageService.java
- [x] uploadImage() resize ảnh nếu > maxWidth
- [x] Tạo unique filename với UUID
- [x] Lưu vào thư mục: `{uploadPath}/{folder}/`
- [x] Return full URL

**Kiểm tra:**
```bash
# Check upload path config
grep "file.upload.path" backend/src/main/resources/application-prod.yml

# Check uploads folder exists
ls -la /root/hpmekong/uploads/
```

---

### ✅ 3. Storage & File System

#### A. Cấu trúc thư mục
```
/root/hpmekong/uploads/
├── banners/
├── posts/        ← Ảnh từ editor lưu ở đây
├── avatars/
└── courses/
```

**Kiểm tra:**
```bash
# Check folders
ls -la /root/hpmekong/uploads/

# Check posts folder
ls -lh /root/hpmekong/uploads/posts/

# Check permissions
stat /root/hpmekong/uploads/posts/
```

#### B. Docker Volume Mount
```yaml
# docker-compose.prod.yml
services:
  backend:
    volumes:
      - ./uploads:/app/uploads
```

**Kiểm tra:**
```bash
# Check mount in container
docker exec hpmekong-backend ls -la /app/uploads/

# Check if same as host
ls -la /root/hpmekong/uploads/
```

---

### ✅ 4. Frontend - Display Content

#### A. NewsDetail.jsx
- [x] Sử dụng dangerouslySetInnerHTML
- [x] Class "prose prose-lg" cho styling
- [x] Render HTML content từ post.content

**Code check:**
```jsx
<div 
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

#### B. CSS Styling (index.css)
- [x] .prose classes định nghĩa
- [x] Heading styles (h1-h6)
- [x] List styles (ul, ol)
- [x] Image styles (rounded, shadow)
- [x] Link, code, blockquote styles
- [x] Table styles

**Kiểm tra:**
```bash
# Check prose styles
grep -A 5 "\.prose img" src/assets/css/index.css
grep -A 5 "\.prose h1" src/assets/css/index.css
```

---

### ✅ 5. Package Dependencies

#### A. Frontend packages
- [x] react-quill: ^2.0.0
- [x] Không còn TinyMCE dependencies

**Kiểm tra:**
```bash
grep "react-quill" package.json
grep -v "tinymce" package.json  # Không có TinyMCE
```

#### B. Build successful
```bash
# Frontend build không lỗi
docker logs hpmekong-frontend 2>&1 | grep "built in"
```

---

## 🧪 TEST CASES

### Test 1: Upload ảnh trong editor
```
1. Truy cập: https://hwm.edu.vn/admin/posts
2. Đăng nhập với admin account
3. Click "Thêm Bài viết"
4. Trong editor, click icon "Image"
5. Chọn file ảnh (PNG/JPG)
6. Chờ loading...
7. ✅ Ảnh xuất hiện trong editor
8. ✅ Toast "Tải ảnh lên thành công!"
```

### Test 2: Định dạng văn bản
```
1. Nhập text trong editor
2. Bold: Ctrl+B hoặc click "B"
3. Italic: Ctrl+I hoặc click "I"
4. Chọn màu chữ từ color picker
5. Chọn màu nền từ background picker
6. Tạo heading: Select text → Dropdown → H1/H2/H3
7. Tạo list: Click icon bullet/number
8. ✅ Tất cả format hiển thị đúng trong editor
```

### Test 3: Lưu và hiển thị bài viết
```
1. Tạo bài viết với:
   - Heading (H1, H2)
   - Bold, italic text
   - Màu chữ khác nhau
   - Hình ảnh
   - List
   - Blockquote
2. Lưu bài viết (Status: Published)
3. Truy cập: https://esj.vn/news/{slug}
4. ✅ Content hiển thị đúng format
5. ✅ Hình ảnh load được
6. ✅ Màu sắc, font size đúng
7. ✅ CSS styling đẹp
```

### Test 4: Kiểm tra file upload
```bash
# Sau khi upload ảnh trong test 1
ls -lh /root/hpmekong/uploads/posts/

# Phải thấy file mới với format:
# UUID.png (ví dụ: 5094bdfa-6c06-4c04-bbba-dce6b2693d91.png)

# Kiểm tra file size (đã resize nếu quá lớn)
du -h /root/hpmekong/uploads/posts/*

# Test URL public
curl -I https://hwm.edu.vn/uploads/posts/FILENAME.png
# Expected: HTTP 200 OK
```

---

## 🐛 TROUBLESHOOTING

### Issue 1: "Cannot find module react-quill"
**Fix:**
```bash
cd /root/hpmekong
docker-compose -f docker-compose.prod.yml build frontend --no-cache
```

### Issue 2: Upload ảnh lỗi 403 Forbidden
**Nguyên nhân:** Chưa đăng nhập hoặc token hết hạn
**Fix:** Login lại admin account

### Issue 3: Upload ảnh lỗi 500 Server Error
**Check:**
```bash
# Backend logs
docker logs hpmekong-backend --tail 50

# Check uploads folder permission
ls -la /root/hpmekong/uploads/
chmod 755 /root/hpmekong/uploads/posts/
```

### Issue 4: Ảnh không hiển thị trên NewsDetail
**Check:**
1. URL ảnh có đúng format: `https://esj.vn/uploads/posts/...`?
2. File tồn tại: `ls /root/hpmekong/uploads/posts/FILE`
3. NGINX serve static files: Check nginx.conf
4. CORS headers đúng không

### Issue 5: CSS styling không apply
**Check:**
```bash
# Verify prose classes trong CSS
grep "\.prose" src/assets/css/index.css

# Rebuild frontend
docker-compose -f docker-compose.prod.yml build frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

---

## 📊 EXPECTED OUTPUT

### Editor trong Admin:
```
┌─────────────────────────────────────────────┐
│ Toolbar: [B][I][U][Color][H1-H6][Image]... │
├─────────────────────────────────────────────┤
│                                             │
│  Content với format:                        │
│  - Bold, italic text                        │
│  - Màu sắc                                  │
│  - [Hình ảnh hiển thị]                      │
│  - Lists                                    │
│                                             │
└─────────────────────────────────────────────┘
```

### HTML Output trong Database:
```html
<h1>Tiêu đề chính</h1>
<p>Đoạn văn với <strong>chữ đậm</strong> và 
<em>chữ nghiêng</em>, 
<span style="color: rgb(255, 0, 0);">màu đỏ</span></p>

<img src="https://hwm.edu.vn/uploads/posts/UUID.png" alt="">

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<blockquote>Trích dẫn quan trọng</blockquote>
```

### Display trên NewsDetail:
```
Tiêu đề chính (h1, 3xl font)

Đoạn văn với chữ đậm và chữ nghiêng, màu đỏ

[Hình ảnh đẹp với shadow và rounded]

• Item 1
• Item 2

│ Trích dẫn quan trọng (với border xanh)
```

---

## ✅ FINAL CHECKLIST

Trước khi bàn giao:

- [ ] Upload 1 ảnh test trong editor → Thành công
- [ ] Tạo bài viết với đầy đủ format → Lưu được
- [ ] Xem bài viết trên /news/:slug → Hiển thị đẹp
- [ ] Ảnh load nhanh, không lỗi 404
- [ ] CSS styling đúng và đẹp mắt
- [ ] Responsive trên mobile
- [ ] Không có lỗi console trong browser
- [ ] Backend logs không có error

---

## 📝 NOTES

1. **Quill vs TinyMCE:**
   - Quill: Mã nguồn mở 100%, không cần API key
   - Nhẹ hơn (~43KB vs ~500KB)
   - UI hiện đại hơn

2. **File Upload Security:**
   - Chỉ cho phép authenticated users
   - Validate file type và size
   - Auto resize ảnh quá lớn
   - UUID filename để tránh conflict

3. **Performance:**
   - Ảnh được resize tự động
   - Static files served by NGINX
   - Cache 30 days cho uploads

4. **Future Improvements:**
   - Drag & drop ảnh vào editor
   - Paste ảnh từ clipboard
   - Image gallery picker
   - Video embed từ YouTube
   - Auto-save draft

---

**Người kiểm tra:** _________________  
**Ngày:** _________________  
**Kết quả:** ☐ Pass ☐ Fail  
**Ghi chú:** _________________
