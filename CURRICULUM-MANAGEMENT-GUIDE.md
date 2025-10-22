# 📚 HƯỚNG DẪN QUẢN LÝ CHƯƠNG TRÌNH HỌC (CURRICULUM)

## 🎯 Tổng quan

Hệ thống quản lý curriculum cho phép admin tạo và quản lý nội dung chi tiết cho từng khóa học, bao gồm:
- **Modules (Chương)**: Nhóm các bài học theo chủ đề
- **Lessons (Bài học)**: Nội dung cụ thể của từng bài (video, tài liệu, quiz, v.v.)

---

## 🚀 Cách sử dụng

### **Bước 1: Tạo/Chỉnh sửa Khóa học**

1. Đăng nhập admin panel
2. Vào **Quản lý Khóa học**
3. Click **"Thêm Khóa học"** hoặc **"Sửa"** khóa học hiện có
4. Điền thông tin cơ bản (Tab 1-4)
5. **Lưu khóa học trước** để có thể thêm curriculum

---

### **Bước 2: Thêm Curriculum**

#### **A. Tạo Module (Chương)**

1. Sau khi lưu khóa học, chuyển sang **Tab "Chương trình học"**
2. Click **"Thêm Module"**
3. Điền thông tin:
   - **Tiêu đề Module**: Ví dụ "Module 1: Giới thiệu về Giao tiếp"
   - **Mô tả**: Mô tả ngắn về nội dung module
   - **Thứ tự hiển thị**: 0, 1, 2... (tự động tăng)
4. Click **"Tạo"**

#### **B. Thêm Bài học vào Module**

1. Tại module vừa tạo, click **"Thêm bài học"**
2. Điền thông tin bài học:

   **Thông tin cơ bản:**
   - **Tiêu đề**: "Bài 1: Giao tiếp là gì?"
   - **Mô tả**: Mô tả ngắn về bài học
   
   **Loại bài học:**
   - 📹 **VIDEO**: Video học tập
   - 📄 **DOCUMENT**: Tài liệu (PDF, DOC)
   - ❓ **QUIZ**: Bài kiểm tra
   - 📝 **ASSIGNMENT**: Bài tập thực hành
   - 🎥 **LIVE_SESSION**: Buổi học trực tiếp
   
   **Nội dung:**
   - **URL nội dung**: 
     - Video: `https://youtube.com/embed/VIDEO_ID`
     - Tài liệu: Link Google Drive hoặc file server
   - **Thời lượng**: Nhập số phút (VD: 30)
   
   **Cài đặt:**
   - ✅ **Xem trước**: Cho phép user xem mà không cần đăng ký
   - ✅ **Miễn phí**: Bài học free cho tất cả
   - **Thứ tự**: 0, 1, 2...

3. Click **"Tạo"**

---

## 📋 Cấu trúc Curriculum

```
Khóa học: "Kỹ năng Giao tiếp"
│
├── Module 1: Giới thiệu về Giao tiếp
│   ├── Bài 1: Giao tiếp là gì? [VIDEO, 30p, XEM TRƯỚC]
│   ├── Bài 2: Các yếu tố giao tiếp [VIDEO, 45p]
│   └── Bài 3: Quiz kiểm tra [QUIZ, 15p]
│
├── Module 2: Kỹ năng lắng nghe
│   ├── Bài 1: Lắng nghe tích cực [VIDEO, 40p]
│   ├── Bài 2: Tài liệu tham khảo [DOCUMENT, MIỄN PHÍ]
│   └── Bài 3: Bài tập thực hành [ASSIGNMENT, 60p]
│
└── Module 3: Thuyết trình hiệu quả
    ├── Bài 1: Chuẩn bị nội dung [VIDEO, 35p]
    ├── Bài 2: Kỹ thuật thuyết trình [VIDEO, 50p]
    └── Bài 3: Buổi học trực tiếp [LIVE_SESSION, 120p]
```

---

## ✨ Tính năng

### **1. Quản lý Module**
- ✅ Tạo, sửa, xóa module
- ✅ Sắp xếp thứ tự (drag-drop - tính năng tương lai)
- ✅ Xem/ẩn danh sách bài học
- ✅ Tự động tính tổng thời lượng

### **2. Quản lý Bài học**
- ✅ 5 loại bài học khác nhau
- ✅ Thêm URL video/tài liệu
- ✅ Đánh dấu "Xem trước" cho marketing
- ✅ Đánh dấu "Miễn phí" cho freemium
- ✅ Quản lý thời lượng từng bài

### **3. Hiển thị Public**
- ✅ User xem curriculum trên trang Course Detail
- ✅ Tab "Nội dung" hiển thị đầy đủ modules & lessons
- ✅ Expand/collapse từng module
- ✅ Icon phân biệt loại bài học
- ✅ Badge "Xem trước" / "Miễn phí"
- ✅ Button "Xem" cho preview lessons

---

## 🔄 Workflow hoàn chỉnh

```
┌─────────────────────────────────────────────┐
│  1. ADMIN: Tạo Khóa học                    │
│     - Thông tin cơ bản                      │
│     - Nội dung, giá, cài đặt               │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│  2. ADMIN: Thêm Curriculum                 │
│     - Tạo Modules                           │
│     - Thêm Lessons vào từng Module         │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│  3. ADMIN: Publish Course                  │
│     Status: DRAFT → PUBLISHED               │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│  4. USER: Xem Course Detail                │
│     - Tab "Nội dung" hiển thị curriculum   │
│     - Xem preview lessons                   │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│  5. USER: Đăng ký khóa học                 │
│     - Thanh toán (nếu có phí)              │
│     - Truy cập toàn bộ lessons             │
└─────────────────────────────────────────────┘
```

---

## 📝 Best Practices

### **Đặt tên Module:**
✅ **Tốt:**
- "Module 1: Giới thiệu về Giao tiếp"
- "Chương 2: Kỹ năng lắng nghe"
- "Phần 3: Thực hành nâng cao"

❌ **Không nên:**
- "Module 1" (không rõ nội dung)
- "asdasdasd" (không chuyên nghiệp)

### **Đặt tên Bài học:**
✅ **Tốt:**
- "Bài 1: Giao tiếp là gì?"
- "1.1 - Khái niệm cơ bản"
- "Video: Kỹ thuật lắng nghe tích cực"

❌ **Không nên:**
- "Video 1" (không mô tả)
- "Untitled" (thiếu thông tin)

### **Thứ tự hiển thị:**
- Module: 0, 1, 2, 3...
- Lesson: 0, 1, 2, 3... (trong mỗi module)
- Số càng nhỏ hiển thị càng trước

### **URL nội dung:**

**Video YouTube:**
```
Embed URL: https://www.youtube.com/embed/VIDEO_ID
Không dùng: https://www.youtube.com/watch?v=VIDEO_ID
```

**Video Vimeo:**
```
Embed URL: https://player.vimeo.com/video/VIDEO_ID
```

**Tài liệu Google Drive:**
```
Public link: https://drive.google.com/file/d/FILE_ID/view
```

### **Thời lượng:**
- Video: Nhập chính xác theo video thật
- Document: Ước tính thời gian đọc (VD: 10-15 phút)
- Quiz: Thời gian làm bài dự kiến
- Assignment: Thời gian hoàn thành dự kiến

### **Xem trước & Miễn phí:**
- **Xem trước**: Bài đầu tiên của module 1 (marketing)
- **Miễn phí**: Tài liệu tham khảo, slides
- Nên có 1-2 bài preview mỗi khóa học

---

## 🔒 Phân quyền

| Vai trò          | Tạo | Sửa | Xóa |
|------------------|-----|-----|-----|
| SUPER_ADMIN      | ✅  | ✅  | ✅  |
| ADMIN            | ✅  | ✅  | ✅  |
| CENTER_MANAGER   | ✅  | ✅  | ✅  |
| USER             | ❌  | ❌  | ❌  |

**Lưu ý:**
- CENTER_MANAGER chỉ quản lý courses thuộc center của mình
- User chỉ xem được curriculum của courses đã publish

---

## 🐛 Xử lý lỗi thường gặp

### **1. "Vui lòng lưu khóa học trước khi thêm chương trình học"**
- **Nguyên nhân**: Chưa tạo/lưu khóa học
- **Giải pháp**: Điền thông tin cơ bản → Click "Tạo" → Sau đó mới vào tab Curriculum

### **2. "Không thể tải nội dung khóa học"**
- **Nguyên nhân**: Lỗi API hoặc chưa chạy migration V3
- **Giải pháp**: 
  ```bash
  # Kiểm tra database có tables: course_modules, lessons chưa
  docker-compose -f docker-compose.prod.yml exec backend bash
  mysql -u root -p -D hpmekong -e "SHOW TABLES LIKE '%module%'"
  ```

### **3. Video không hiển thị**
- **Nguyên nhân**: URL sai format hoặc video private
- **Giải pháp**: 
  - Dùng embed URL: `youtube.com/embed/...`
  - Set video public/unlisted trên YouTube

### **4. "Lỗi lưu module/lesson"**
- **Nguyên nhân**: Thiếu required fields
- **Giải pháp**: Đảm bảo điền đủ:
  - Module: Title (bắt buộc)
  - Lesson: Title (bắt buộc)

---

## 📊 Thống kê tự động

Hệ thống tự động tính toán:
- ✅ **Tổng số module** của khóa học
- ✅ **Tổng số bài học** của khóa học
- ✅ **Tổng thời lượng** từng module (SUM lessons)
- ✅ **Tổng thời lượng** khóa học (SUM modules)

---

## 🎨 UI Components

### **Admin Panel:**
- Component: `CurriculumBuilder.jsx`
- Location: `src/components/admin/CurriculumBuilder.jsx`
- Props: `courseId`, `onUpdate`

### **Public View:**
- Page: `CourseDetail.jsx`
- Tab: "Nội dung" / "Curriculum"
- Auto-load khi click tab

---

## 🔗 API Endpoints

### **Public:**
```
GET /api/v1/courses/{courseId}/curriculum
```

### **Admin:**
```
POST   /api/v1/admin/courses/{courseId}/modules
PUT    /api/v1/admin/modules/{moduleId}
DELETE /api/v1/admin/modules/{moduleId}

POST   /api/v1/admin/modules/{moduleId}/lessons
PUT    /api/v1/admin/lessons/{lessonId}
DELETE /api/v1/admin/lessons/{lessonId}
```

---

## 📦 Database Schema

### **course_modules**
```sql
- id (PK)
- course_id (FK → courses)
- title (required)
- description
- display_order
- duration_minutes (auto-calculated)
- created_at, updated_at, deleted_at
```

### **lessons**
```sql
- id (PK)
- module_id (FK → course_modules)
- title (required)
- description
- type (VIDEO, DOCUMENT, QUIZ, ASSIGNMENT, LIVE_SESSION)
- content_url
- duration_minutes
- display_order
- is_preview (boolean)
- is_free (boolean)
- created_at, updated_at, deleted_at
```

---

## 🚧 Tính năng tương lai (Roadmap)

- [ ] **Drag & Drop reordering** modules và lessons
- [ ] **Bulk import** từ Excel/CSV
- [ ] **Clone module** sang course khác
- [ ] **Preview video** trực tiếp trong admin
- [ ] **Progress tracking** chi tiết từng lesson
- [ ] **Quiz builder** với câu hỏi trắc nghiệm
- [ ] **Assignment submission** & grading
- [ ] **Live session scheduling** tích hợp Zoom/Google Meet
- [ ] **Certificate auto-generation** khi hoàn thành

---

## ❓ FAQ

**Q: Có thể thêm bài học không thuộc module nào không?**
A: Không. Mỗi lesson phải thuộc 1 module. Nếu cần, tạo module "Bài học khác" hoặc "Tổng hợp".

**Q: Xóa module có xóa luôn các bài học không?**
A: Có. Cascade delete. Nên cẩn thận khi xóa module.

**Q: User chưa đăng ký có xem được curriculum không?**
A: Có. User xem được danh sách modules & lessons, nhưng chỉ xem được nội dung của bài "Preview" hoặc "Free".

**Q: Có giới hạn số lượng module/lesson không?**
A: Không. Nhưng nên keep module từ 5-10, mỗi module 3-7 lessons để UX tốt.

**Q: Có thể đổi thứ tự sau khi tạo không?**
A: Có. Edit module/lesson → Thay đổi `displayOrder` → Save.

---

## 📞 Support

Nếu gặp vấn đề khi sử dụng curriculum management, liên hệ:
- **Technical Issue**: Check backend logs `docker-compose logs backend`
- **Database Issue**: Check migration `V3__create_curriculum_tables.sql`
- **Frontend Issue**: Check browser console (F12)

---

**Cập nhật:** 2025-10-22  
**Version:** 1.0.0
