# TODO: XÂY DỰNG TRANG WEB HAPPY WORLD MEKONG

## 📋 TỔNG QUAN DỰ ÁN

### Thông tin website
- **Tên**: Happy World Mekong
- **Domain**: happyworldmekong.com (dự kiến)
- **Mô tả**: Nền tảng du lịch và văn hóa vùng Đồng bằng sông Cửu Long - Kết nối du khách với trải nghiệm độc đáo miền Tây Nam Bộ
- **Tham khảo thiết kế**: NovaEdu.vn structure

---

## 🎨 PHÂN TÍCH THIẾT KẾ & MÀU SẮC

### Bảng màu chính (Brand Colors)
```css
/* Màu chủ đạo */
--color-primary-blue: #0057B8;    /* Xanh dương chủ đạo - CMYK(91-56-10-0) */
--color-primary-orange: #FF8C00;  /* Cam phụ - CMYK(0-55-100-0) */
--color-primary-green: #3E8E41;   /* Xanh lá - CMYK(73-23-88-10) */
--text-color-title: #1C274C;      /* Xanh đậm tiêu đề */
--text-color-p: #666666;          /* Xám văn bản */

/* Màu phụ */
--color-white: #FFF;
--color-black: #000;
--color-blue-light: #4A90E2;
--color-orange-light: #FFB84D;
--color-green-light: #5CB85C;
```

### Gradient sử dụng
```css
/* Gradient xanh dương */
linear-gradient(180deg, #0057B8 0%, #003D82 100%)

/* Gradient cam */
linear-gradient(180deg, #FF8C00 0%, #FF6B00 100%)

/* Gradient xanh lá */
linear-gradient(180deg, #3E8E41 0%, #2D6A2F 100%)

/* Gradient background */
linear-gradient(135deg, rgba(255, 255, 255, 0.00) 23.22%, rgba(0, 87, 184, 0.07) 38.09%, rgba(255, 140, 0, 0.07) 54.12%, rgba(62, 142, 65, 0.15) 76.48%)
```

### Typography
- **Font chính**: Montserrat (sans-serif)
- **Font phụ**: Quicksand
- **Font size tiêu đề**: 
  - H1: 40-90px
  - H2: 25-35px
  - H3: 20-25px
  - Body: 14-16px
  - Small: 12-13px

### Hiệu ứng & Animation
- Box shadow: `0 0 10px rgba(0,0,0,0.2)`
- Border radius: 10px, 15px, 20px, 25px
- Transition: `all 0.3s ease`, `transform 0.3s`
- Hover effects: `transform: scale(1.1)`, `translateY(-5px)`
- Scroll animations: fade in, slide up

---

## 🏗️ CẤU TRÚC TRANG WEB

### 1. Trang chủ (Home Page)

#### 1.1. Header / Navigation
- [ ] **Logo**: Happy World Mekong logo với 3 màu chủ đạo
- [ ] **Menu chính**: Sticky menu với các mục:
  - 🏠 Trang chủ (Home)
  - ℹ️ Giới thiệu (About Us)
  - 🌐 Hệ sinh thái (Ecosystem) - Dropdown 9 Trung tâm
  - 📚 Khóa học (Courses)
  - 👨‍🏫 Giảng viên (Lecturers)
  - 📰 Tin tức (News) - Dropdown: Hoạt động, Tuyển dụng
  - 📖 Sách (Books) - Link external
  - 🖼️ Thư viện (Library) - Dropdown: Hình ảnh, Videos, Tài liệu
  - 📞 Liên hệ (Contact)
- [ ] **Language switcher**: VI / EN (flag icons)
- [ ] **Search**: Dropdown search (tìm khóa học, tin tức)
- [ ] **CTA button**: "Đăng ký ngay" (màu cam, nổi bật)
- [ ] **Mobile menu**: Hamburger menu responsive với animation
- [ ] **User menu** (if logged in): Avatar dropdown

#### 1.2. Hero Banner Section
- [ ] **Hero Banner**: 
  - Badge nhỏ: "🎓 Giáo dục từ miền Tây"
  - Tiêu đề lớn: "HAPPY WORLD MEKONG" (màu xanh dương)
  - Slogan: "Phát triển nguồn nhân lực Đồng bằng sông Cửu Long"
  - Mô tả: "Chuyên cung cấp các giải pháp đào tạo kỹ năng, định hướng nghề nghiệp và hỗ trợ khởi nghiệp"
  - Image background: Sinh viên, lớp học, graduation
  - CTA Button: "Khám phá khóa học" (màu xanh dương)
  - Secondary button: "Đăng ký tư vấn" (màu cam outline)
  - Background gradient động
- [ ] **Featured Courses Slider**: Swiper cards với khóa học nổi bật (4-5 courses)
  - Hình ảnh khóa học
  - Tên khóa học
  - Giảng viên
  - Giá, thời lượng
  - Rating sao + số học viên
  - Nút "Đăng ký ngay"
  - Auto-play 6s

#### 1.3. Hệ sinh thái 9 Trung tâm đào tạo
- [ ] **Grid layout**: 9 Trung tâm chuyên biệt (3x3)
  - **Mekong Skills Pro** - Đào tạo kỹ năng
  - **Mekong Career Guide** - Hướng nghiệp online
  - **Mekong Boss** - Doanh nhân & Khởi nghiệp
  - **Mekong Teen** - Giáo dục học sinh
  - **Mekong Book** - Xuất bản sách & tài liệu
  - **Mekong Job** - Kết nối việc làm
  - **Mekong Space** - Không gian học tập
  - **Mekong Agri Academy** - Đào tạo nông nghiệp
  - **Mekong Innovation Hub** - Startup & Innovation
- [ ] Mỗi center card:
  - Logo/Icon Trung tâm (màu đặc trưng)
  - Tên Trung tâm
  - Slogan ngắn
  - Mô tả 2-3 dòng
  - Link "Tìm hiểu thêm"
  - Hover effect: scale(1.05) + shadow stronger

#### 1.4. Về Happy World Mekong
- [ ] **2 cột layout**:
  - Cột trái: Video giới thiệu (CEO hoặc brand video)
  - Cột phải: Nội dung giới thiệu
- [ ] **3 feature blocks** với icons:
  - 👁️ **Tầm nhìn**: Trở thành tổ chức giáo dục hàng đầu ĐBSCL
  - 🎯 **Sứ mệnh**: Phát triển nguồn nhân lực chất lượng cao
  - ⚡ **Giá trị cốt lõi**: Tâm đắc - Kiên trì - Sáng tạo - Triệt để - Thần tốc
- [ ] **Animation**: Reveal on scroll, fade in từ bottom

#### 1.5. Số liệu nổi bật
- [ ] **4 counter boxes** (màu xen kẽ):
  - 100,000+ Học viên đã đào tạo
  - 150+ Khóa học chất lượng
  - 200+ Giảng viên & Chuyên gia
  - 50+ Đối tác (Trường ĐH, Doanh nghiệp)
- [ ] **Counter animation**: Đếm lên khi scroll vào view
- [ ] **Background**: Gradient with wave pattern
- [ ] **Icons**: Custom icons cho từng số liệu

#### 1.6. Thành tựu Happy World Mekong
- [ ] **Slick slider**: Auto-play carousel
  - Giải thưởng, bằng khen
  - Hợp tác với các trường ĐH
  - Chứng nhận chất lượng
  - Thành tựu học viên
  - 4-5 items hiển thị
  - Navigation arrows
  - Lightbox khi click
- [ ] **Title**: "Thành tựu của Happy World Mekong"

#### 1.7. Video & Truyền thông
- [ ] **Bootstrap carousel**: 2 slides
  - Video giới thiệu các khóa học
  - Phỏng vấn học viên thành công
  - Hoạt động đào tạo tại các trường
  - Sự kiện, workshop
  - Mỗi slide: 4 video items
  - Thumbnail + title
  - Ngày đăng
  - Link xem chi tiết
- [ ] **Navigation**: Custom arrows + indicators

#### 1.8. Tin tức & Hoạt động
- [ ] **3 cards layout**:
  - Tin hoạt động đào tạo
  - Sự kiện khai giảng
  - Workshop, talkshow
  - Hợp tác với trường ĐH
  - Hình ảnh tin
  - Ngày đăng + tác giả
  - Tiêu đề (max 2 lines)
  - Mô tả (max 3 lines)
  - Link "Xem thêm"
- [ ] **Shadow effect**: Hover animation

#### 1.9. Đối tác chiến lược
- [ ] **Grid logos**: Hiển thị logo các trường ĐH, tổ chức ĐBSCL
  - Đại học Cần Thơ
  - Đại học An Giang
  - Đại học Đồng Tháp
  - Đại học Tiền Giang
  - Các trường Cao đẳng nghề
  - Sở GD&ĐT 13 tỉnh
  - Doanh nghiệp địa phương
- [ ] **Background gradient**
- [ ] **Hover effect**: Logo scale + tooltip tên

#### 1.10. Footer
- [ ] **4 cột layout**:
  - **Cột 1**: Logo + thông tin công ty
    - Địa chỉ văn phòng
    - Email: info@happyworldmekong.com
    - Hotline: 1900-xxxx
    - Social media: Facebook, Instagram, YouTube, TikTok
  - **Cột 2**: Hệ sinh thái Trung tâm
    - Links đến 9 Trung tâm
  - **Cột 3**: Dịch vụ
    - Đặt tour
    - Tư vấn lịch trình
    - Booking homestay
    - Cho thuê xe
  - **Cột 4**: Liên kết nhanh
    - Chính sách
    - Điều khoản
    - FAQs
    - Tuyển dụng
- [ ] **Copyright bar**: "2025 All Rights Reserved by Happy World Mekong"
- [ ] **Scroll to top button**: Fixed bottom-right
- [ ] **Chat widget**: Zalo, Messenger

---

### 2. Trang Giới thiệu (About)

#### 2.1. Hero Banner
- [ ] **Background**: Video cảnh đẹp Đồng bằng sông Cửu Long
- [ ] **Breadcrumb**: Home > About Us

#### 2.2. Về Happy World Mekong
- [ ] **Vision section**: Tầm nhìn
  - Icon compass
  - Nội dung tầm nhìn
- [ ] **Mission section**: Sứ mệnh
  - Icon target
  - Cam kết mang lại trải nghiệm
- [ ] **Values section**: Giá trị cốt lõi
  - Chân thực - Bền vững - Trải nghiệm - Kết nối

#### 2.3. Lịch sử hình thành
- [ ] **Timeline**: Dòng thời gian phát triển
  - Các mốc quan trọng
  - Hình ảnh minh họa
  - Scroll animation

#### 2.4. Hệ sinh thái 9 Trung tâm
- [ ] **Interactive map**: Bản đồ tương tác
  - Click vào từng Trung tâm
  - Hiển thị thông tin chi tiết
  - Animation khi hover
- [ ] **Center showcase**: Grid 3x3
  - Logo + tên Trung tâm
  - Mô tả ngắn
  - CTA button
  - Modal xem chi tiết

#### 2.5. Đội ngũ lãnh đạo
- [ ] **Leadership team**: Card profiles
  - Ảnh đại diện
  - Tên, chức vụ
  - Kinh nghiệm
  - Modal biography

---

### 3. Trang Hệ sinh thái (Ecosystem)

#### 3.1. Hero Section
- [ ] **Banner**: "Hệ sinh thái Giáo dục toàn diện"
- [ ] **Subtitle**: "9 Trung tâm chuyên biệt phục vụ mọi nhu cầu đào tạo"

#### 3.2. Chi tiết từng Trung tâm

**1. Mekong Skills Pro** - Đào tạo kỹ năng
- [ ] Logo màu xanh dương chính
- [ ] **Dịch vụ**: 
  - Kỹ năng mềm (Giao tiếp, Làm việc nhóm, Thuyết trình)
  - Kỹ năng lãnh đạo và quản trị
  - Kỹ năng bán hàng, marketing, sales
  - Chứng chỉ kỹ năng quốc tế
- [ ] **Đối tượng**: Sinh viên, người đi làm, quản lý
- [ ] **Highlight**: "Rút ngắn con đường thành công 5-7 năm"
- [ ] Gallery ảnh lớp học
- [ ] Link trang riêng

**2. Mekong Career Guide** - Hướng nghiệp
- [ ] Logo màu cam
- [ ] **Dịch vụ**:
  - Định hướng nghề nghiệp cho học sinh THPT
  - Tư vấn chọn ngành, chọn trường ĐH
  - Trắc nghiệm tính cách, nghề nghiệp
  - Kết nối với các trường ĐH miền Tây
- [ ] **Đối tượng**: Học sinh lớp 10, 11, 12
- [ ] **Highlight**: "Chọn đúng nghề - Thành công sớm"
- [ ] Công cụ test online

**3. Mekong Boss** - Doanh nhân & Khởi nghiệp
- [ ] Logo màu vàng đồng
- [ ] **Dịch vụ**:
  - Đào tạo CEO, lãnh đạo doanh nghiệp
  - Khóa học khởi nghiệp trong kỷ nguyên số
  - Hỗ trợ xây dựng business plan
  - Kết nối nhà đầu tư, mentor
  - Triển khai đề án khởi nghiệp (tương tự đề án 1665)
- [ ] **Đối tượng**: Doanh nhân, founder, startup
- [ ] **Highlight**: "Từ ý tưởng đến doanh nghiệp"

**4. Mekong Teen** - Giáo dục học sinh
- [ ] Logo màu hồng/tím
- [ ] **Dịch vụ**:
  - Kỹ năng sống cho học sinh THCS, THPT
  - Định hướng nghề nghiệp sớm
  - Phát triển tư duy logic, sáng tạo
  - Camp hè, hoạt động ngoại khóa
- [ ] **Đối tượng**: Học sinh cấp 2, cấp 3
- [ ] **Highlight**: "Phát triển toàn diện từ sớm"

**5. Mekong Book** - Xuất bản
- [ ] Logo màu đỏ
- [ ] **Dịch vụ**:
  - Sách kỹ năng, sách kinh doanh
  - Tài liệu đào tạo chuyên môn
  - E-book platform
  - Audiobook, podcast giáo dục
- [ ] **Đối tượng**: Mọi đối tượng học tập
- [ ] **Highlight**: "Tri thức trong tầm tay"
- [ ] Online bookstore

**6. Mekong Job** - Kết nối việc làm
- [ ] Logo màu xanh lá
- [ ] **Dịch vụ**:
  - Kết nối sinh viên với doanh nghiệp ĐBSCL
  - Tuyển dụng nhân sự chất lượng cao
  - Tư vấn CV, phỏng vấn
  - Job fair, career day tại các trường
- [ ] **Đối tượng**: Sinh viên, người tìm việc, DN tuyển dụng
- [ ] **Highlight**: "Cầu nối nhân tài miền Tây"

**7. Mekong Space** - Không gian học tập
- [ ] Logo màu nâu/be
- [ ] **Dịch vụ**:
  - Coworking space cho startup
  - Phòng đào tạo, workshop
  - Thư viện, không gian self-study
  - Tổ chức sự kiện, networking
- [ ] **Đối tượng**: Sinh viên, startup, freelancer
- [ ] **Highlight**: "Nơi kết nối cộng đồng"

**8. Mekong Agri Academy** - Nông nghiệp
- [ ] Logo màu xanh lá nhạt
- [ ] **Dịch vụ**:
  - Đào tạo nông nghiệp công nghệ cao
  - Kỹ thuật canh tác hiện đại, VietGAP
  - Khởi nghiệp nông nghiệp
  - Chuyển đổi số trong nông nghiệp
- [ ] **Đối tượng**: Nông dân, HTX, doanh nghiệp nông nghiệp
- [ ] **Highlight**: "Nông nghiệp thông minh"

**9. Mekong Innovation Hub** - Đổi mới sáng tạo
- [ ] Logo gradient 3 màu
- [ ] **Dịch vụ**:
  - Inkubator cho startup miền Tây
  - Mentoring, coaching doanh nghiệp
  - Pitch training, investor matching
  - Demo day, funding events
- [ ] **Đối tượng**: Startup, SMEs, innovators
- [ ] **Highlight**: "Nơi ý tưởng thành hiện thực"
- [ ] Startup directory

#### 3.3. Cơ hội hợp tác
- [ ] **Partnership program**
- [ ] **Affiliate program**
- [ ] **Form đăng ký**

---

### 4. Trang Khóa học (courses.html)

#### 4.1. Banner khóa học
- [ ] **Hero section**: "Khám phá các khóa học chất lượng cao"
- [ ] **Search bar**: Tìm kiếm khóa học theo tên, giảng viên, lĩnh vực
- [ ] **Quick filters**: Buttons nhanh (Online, Offline, Miễn phí, Bestseller)

#### 4.2. Filters & Categories
- [ ] **Sidebar filters**:
  - **Theo Trung tâm**: (9 centers - checkbox)
  - **Theo cấp độ**: Học sinh, Sinh viên, Người đi làm, Doanh nhân
  - **Theo loại hình**: Online, Offline, Hybrid
  - **Theo thời lượng**: 1 ngày, 1 tuần, 1 tháng, 3 tháng+
  - **Theo giá**: Free, < 1tr, 1-3tr, 3-5tr, > 5tr
  - **Theo lĩnh vực**: Kỹ năng mềm, Marketing, Lãnh đạo, Khởi nghiệp...
- [ ] **Sort dropdown**:
  - Mới nhất
  - Phổ biến nhất
  - Giá thấp → cao
  - Giá cao → thấp
  - Đánh giá cao nhất
- [ ] **Clear all filters button**

#### 4.3. Danh sách khóa học
- [ ] **Grid layout**: 3 columns (responsive 1-2-3)
  - **Card design**:
    - Hình ảnh khóa học (16:9 ratio)
    - Badge góc (Hot/New/Bestseller/Free)
    - Tên khóa học (H3, max 2 lines)
    - Giảng viên (avatar nhỏ + tên)
    - Rating: ⭐⭐⭐⭐⭐ (4.8) + (520 đánh giá)
    - Stats bar: 1,245 học viên | 8 tuần | 24 bài
    - Giá: ~~3,000,000đ~~ **2,100,000đ** (-30%)
    - Icon indicators: 📱 Online | 📜 Chứng chỉ | 🎯 Việc làm
    - Button "Đăng ký ngay" (Blue gradient)
    - Wishlist icon (heart)
- [ ] **Hover effect**: Card lift + shadow stronger
- [ ] **Loading**: Skeleton screens while loading
- [ ] **Empty state**: Nếu không tìm thấy

#### 4.4. Featured courses
- [ ] **Hero slider**: 3-5 khóa đặc biệt ở đầu trang
  - Full-width cards
  - Larger images
  - More info visible
  - Auto-play 6s

#### 4.5. Pagination
- [ ] **Style 1**: Load more button (infinite scroll)
- [ ] **Style 2**: Numbered pagination (1 2 3 ... 10)
- [ ] **Items per page**: 12, 24, 48 options

---

### 5. Trang Chi tiết khóa học (courses/[slug].html)

#### 5.1. Course Hero Section
- [ ] **Full-width hero**:
  - Background với overlay
  - Video preview hoặc image
  - Play button overlay (nếu video)
  - Breadcrumb

#### 5.2. Course Header Info
- [ ] **Main info bar**:
  - Tên khóa học (H1)
  - Tagline/Subtitle
  - Rating: ⭐⭐⭐⭐⭐ 4.8 (1,234 đánh giá)
  - Số học viên: 5,678 đang học
  - Badges: Bestseller, Certificate, Job Support
  - Last updated: 15/10/2025

#### 5.3. Main Content Area (2 columns)

**Left Column (70%):**

- [ ] **Course Nav Tabs**:
  - 📋 Tổng quan
  - 📚 Nội dung khóa học
  - 👨‍🏫 Giảng viên
  - ⭐ Đánh giá (1,234)
  - ❓ FAQs
  
- [ ] **Tab 1: Tổng quan**:
  - Mô tả chi tiết khóa học
  - Video giới thiệu
  - Bạn sẽ học được gì (outcomes list with icons)
  - Yêu cầu trước khóa học
  - Phù hợp với ai
  
- [ ] **Tab 2: Nội dung khóa học**:
  - Accordion sections:
    ```
    Module 1: Tên module (2h 30p)
      ├── Bài 1.1: Tên bài (15p) 🔓 Preview
      ├── Bài 1.2: Tên bài (20p) 🔒
      ├── Bài 1.3: Quiz (10p) 🔒
      └── ...
    Module 2: ...
    ```
  - Tổng thời lượng hiển thị
  - Số bài đã hoàn thành (nếu user đăng nhập)
  
- [ ] **Tab 3: Giảng viên**:
  - Avatar + cover
  - Tên, học hàm học vị
  - Tiểu sử
  - Chuyên môn
  - Thành tích
  - Các khóa học khác
  - Social links
  
- [ ] **Tab 4: Đánh giá**:
  - Overall rating summary
  - Rating breakdown (5★ = 80%, 4★ = 15%...)
  - Review list với avatar, name, rating, comment
  - Helpful buttons (Có ích / Không có ích)
  - Load more reviews
  - Write review button (nếu đã mua)
  
- [ ] **Tab 5: FAQs**:
  - Accordion Q&A
  - Search trong FAQs
  - "Không tìm thấy câu trả lời?" → Contact form

**Right Column (30% - Sticky Sidebar):**

- [ ] **Pricing Card** (fixed khi scroll):
  - Preview image/video
  - Giá gốc ~~3,000,000đ~~
  - Giá sale **2,100,000đ** (size lớn)
  - Badge: "-30% Kết thúc sau 2d 5h 30p" (countdown)
  - Course includes:
    - ✅ 8 tuần học
    - ✅ 42 bài giảng
    - ✅ 120+ tài liệu
    - ✅ Chứng chỉ hoàn thành
    - ✅ Hỗ trợ sau khóa học
    - ✅ Truy cập trọn đời
    - ✅ Học lại miễn phí
  - **CTA Buttons** (full-width):
    - "Đăng ký ngay" (Primary Blue - nổi bật)
    - "Thêm vào giỏ" (Secondary Orange)
    - "Tư vấn miễn phí" (Outline)
  - Guarantee badges:
    - 🛡️ Hoàn tiền 30 ngày
    - ✅ Cam kết chất lượng
    - 📱 Học trên mọi thiết bị
  - Share buttons: FB, Zalo, Copy
  - Wishlist icon
  
- [ ] **Promotions** (if available):
  - Mua chung với khóa X giảm 20%
  - Gift voucher
  - Group discount

#### 5.4. Related Sections (Full-width)

- [ ] **Học viên nói gì**:
  - Slider testimonials với ảnh
  - Video reviews
  - Success stories
  
- [ ] **Khóa học liên quan**:
  - 4-6 courses carousel
  - Quick view on hover
  
- [ ] **Khóa học của giảng viên này**:
  - Other courses by same instructor

---

### 6. Trang Giảng viên/Chuyên gia (lecturers.html)

#### 6.1. Banner
- [ ] **Blue gradient background**
- [ ] **Title**: "Đội ngũ giảng viên & chuyên gia"
- [ ] **Subtitle**: "Những người dẫn đầu trong lĩnh vực đào tạo"

#### 6.2. Danh sách giảng viên
- [ ] **Grid layout**: 4 columns (responsive)
  - Ảnh đại diện chuyên nghiệp
  - Tên + học hàm, học vị
  - Chuyên môn
  - Kinh nghiệm (năm)
  - Badge (Giảng viên chính, Khách mời, CEO...)
- [ ] **Filters**: 
  - Theo chuyên môn
  - Theo Trung tâm
- [ ] **Modal popup** khi click:
  - Ảnh lớn
  - Tên, học hàm học vị
  - Tiểu sử chi tiết
  - Trình độ chuyên môn
  - Các khóa học đang giảng dạy
  - Thành tựu, giải thưởng
  - Close button (X)

#### 6.3. Pagination
- [ ] **Custom pagination**: Rounded buttons
- [ ] **Active state**: Blue gradient background

---

### 7. Trang Tin tức (news.html)

#### 7.1. Banner tin tức
- [ ] **Blue gradient background**
- [ ] **Breadcrumb**: Home > News
- [ ] **Categories tabs**: Tất cả, Hoạt động, Tuyển dụng, Sự kiện

#### 7.2. Danh sách bài viết
- [ ] **Grid layout**: 3 columns responsive
  - Hình đại diện (220px height)
  - Category badge (màu theo loại)
  - Ngày đăng + tác giả
  - Tiêu đề (max 2 lines, ellipsis)
  - Mô tả (max 3 lines)
  - Tags (if any)
  - Button "Đọc tiếp"
- [ ] **Pagination**: Custom design với blue gradient
- [ ] **Sorting**: Mới nhất, Xem nhiều, Nổi bật

#### 7.3. Sidebar
- [ ] **Tin nổi bật**: 5 bài với thumbnail nhỏ
- [ ] **Tin mới nhất**: 5 bài
- [ ] **Search box**: Tìm kiếm tin
- [ ] **Categories**: Filter theo danh mục
- [ ] **Newsletter signup**: Form đăng ký nhận tin

---

### 8. Trang Chi tiết tin tức (news/[slug].html)

#### 8.1. Header bài viết
- [ ] **Breadcrumb**: Home > Tin tức > [Category] > Tiêu đề
- [ ] **Category badge**: Màu theo danh mục
- [ ] **Title**: H1 với typography đẹp
- [ ] **Meta info**: 
  - Ngày đăng
  - Tác giả (có avatar)
  - Thời gian đọc (ước tính)
  - Lượt xem
- [ ] **Share buttons**: 
  - Facebook
  - Zalo
  - Copy link
  - LinkedIn

#### 8.2. Nội dung bài viết
- [ ] **Rich content area**:
  - Hình ảnh responsive với caption
  - Text formatting (bold, italic, list...)
  - Videos embed (YouTube, Vimeo)
  - Tables responsive
  - Blockquote styling
  - Code snippet (if needed)
- [ ] **Typography**: 
  - Line height 1.8
  - Font size 16-18px
  - Paragraph spacing
- [ ] **Table of contents**: Nếu bài dài
  - Smooth scroll to sections
  - Sticky sidebar

#### 8.3. Sidebar
- [ ] **Author card**: 
  - Avatar
  - Tên, chức vụ
  - Bio ngắn
- [ ] **Tin liên quan**: 5 bài
  - Thumbnail
  - Tiêu đề
  - Ngày đăng
- [ ] **Tin cùng chuyên mục**: 5 bài
- [ ] **Newsletter**: Form đăng ký

#### 8.4. Comments (Optional)
- [ ] **Comment section**: Facebook Comments hoặc custom
- [ ] **Moderation**: Admin approve

---

### 9. Trang Thư viện

#### 9.1. Hình ảnh (photos.html)
- [ ] **Albums grid**: Danh sách album
  - Thumbnail album
  - Tên album
  - Số lượng ảnh
- [ ] **Gallery modal**: Lightbox
  - Navigation
  - Zoom
  - Close

#### 9.2. Videos (video-clip.html)
- [ ] **Video grid**: 3-4 columns
  - Thumbnail
  - Tiêu đề
  - Thời lượng
  - Ngày đăng
- [ ] **Video player modal**: 
  - YouTube/Video embed
  - Related videos

#### 9.3. Tài liệu (tai-lieu-tham-khao.html)
- [ ] **List view**:
  - Icon file type
  - Tên tài liệu
  - Kích thước
  - Download button
- [ ] **Categories**: Filter by type

---

### 10. Trang Liên hệ (contact.html)

#### 10.1. Banner
- [ ] **Gradient xanh đậm**: Navy gradient
- [ ] **Title + intro text**: Màu trắng

#### 10.2. 2 columns layout

**Cột trái**: Google Maps
- [ ] **Iframe embed**: Location HQ
- [ ] **Border radius**: 15px

**Cột phải**: Contact form
- [ ] **Form fields**:
  - Chủ đề quan tâm (select)
  - Họ và tên
  - Email
  - Điện thoại
  - Nội dung (textarea)
  - reCAPTCHA
- [ ] **Validation**:
  - Client-side: jQuery
  - Error messages
  - Success/Error alerts
- [ ] **Submit button**: Gradient cam

#### 10.3. Error/Success alerts
- [ ] **Alert component**: 
  - Success: Green gradient
  - Error: Red gradient
  - Auto-hide after 3s
  - Close button

---

## 💻 CÔNG NGHỆ SỬ DỤNG

### Frontend Framework & Libraries
- [ ] **Framework**: React.js hoặc Vue.js hoặc Next.js
- [ ] **UI Library**: 
  - Tailwind CSS hoặc Material-UI
  - Bootstrap 5 (tùy chọn)
  - Framer Motion (animations)
- [ ] **JavaScript/TypeScript**:
  - React/Vue Router
  - Axios (HTTP client)
  - Swiper.js (slider)
  - React-Slick hoặc Vue-Slick (carousel)
  - Lightbox library
  - AOS (Animate On Scroll)

### Backend Framework & Technologies
- [ ] **Framework**: Spring Boot 3.x
- [ ] **ORM**: Hibernate / Spring Data JPA
- [ ] **Database**: MySQL/PostgreSQL
- [ ] **Security**: Spring Security + JWT
- [ ] **API**: RESTful API
- [ ] **Documentation**: Swagger/OpenAPI
- [ ] **Build Tool**: Maven/Gradle

### Icons & Fonts
- [ ] **Font Awesome 6.4.2**: Icons
- [ ] **Google Fonts**:
  - Montserrat (main font)
  - Quicksand (heading font)
- [ ] **Icomoon**: Custom icon font

### External Services
- [ ] **Google Tag Manager**: GTM-N69F5H7D
- [ ] **Google reCAPTCHA**: Form protection
- [ ] **Facebook SDK**: Social integration
- [ ] **Zalo SDK**: Chat widget
- [ ] **Google Maps API**: Location embed
- [ ] **YouTube API**: Video embeds

### Responsive Design
- [ ] **Breakpoints**:
  - Desktop: > 1200px
  - Tablet: 768px - 1199px
  - Mobile: < 767px
  - Small mobile: < 480px
- [ ] **Mobile menu**: Hamburger + slide-in
- [ ] **Touch events**: Swipe, tap

---

## 🗂️ CẤU TRÚC THỨ MỤC DỰ ÁN MỚI

```
happyworldmekong/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── happyworld/
│   │   │   │           └── mekong/
│   │   │   │               ├── config/
│   │   │   │               ├── controller/
│   │   │   │               ├── dto/
│   │   │   │               ├── entity/
│   │   │   │               ├── repository/
│   │   │   │               ├── service/
│   │   │   │               ├── security/
│   │   │   │               └── MekongApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   ├── pom.xml (hoặc build.gradle)
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── style.css
│   │   ├── linh.css
│   │   ├── dung.css
│   │   ├── animation.css
│   │   ├── home-banner.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── jquery-3.3.1.min.js
│   │   ├── bootstrap.min.js
│   │   ├── swiper-bundle.min.js
│   │   ├── slick.min.js
│   │   ├── fslightbox.js
│   │   ├── jquery.sticky.js
│   │   ├── main.js
│   │   └── custom.js
│   │
│   ├── fonts/
│   │   └── icomoon/
│   │
│   ├── images/
│   │   ├── logo_ver_new.png
│   │   ├── home/
│   │   ├── about/
│   │   └── icons/
│   │
│   └── uploads/
│       ├── news/
│       ├── photos/
│       ├── videos/
│       ├── partners/
│       └── brands/
│
├── pages/
│   ├── index.html
│   ├── gioi-thieu.html
│   ├── hoptac.html
│   ├── giang-vien.html
│   ├── tin-hoat-dong.html
│   ├── tin-tuyen-dung.html
│   ├── photos.html
│   ├── video-clip.html
│   ├── tai-lieu-tham-khao.html
│   └── contact.html
│
├── components/
│   ├── header.html
│   ├── footer.html
│   ├── navigation.html
│   └── sidebar.html
│
├── backend/ (nếu có)
│   ├── api/
│   ├── controllers/
│   ├── models/
│   └── views/
│
└── docs/
    ├── TODO.md
    ├── DESIGN.md
    └── API.md
```

---

## 📝 DANH SÁCH CÔNG VIỆC CHI TIẾT

### GIAI ĐOẠN 1: SETUP DỰ ÁN (2-3 ngày)

#### 1.1. Chuẩn bị môi trường
- [ ] **Khởi tạo Git repository**
  - Create repo on GitHub/GitLab
  - Initial commit
  - Setup .gitignore
- [ ] **Cài đặt dependencies**
  - Node.js & npm (nếu dùng build tools)
  - Package.json
  - Install Bootstrap
  - Install jQuery & plugins
- [ ] **Setup folder structure**
  - Tạo các thư mục theo cấu trúc
  - Copy assets từ site gốc
  - Organize images

#### 1.2. Chuẩn bị design assets
- [ ] **Export/download images**
  - Logo (PNG, SVG)
  - Icons
  - Background images
  - Partner logos
  - Brand logos
- [ ] **Setup fonts**
  - Download Google Fonts
  - Icomoon font files
- [ ] **Create color palette file**
  - Variables CSS/SCSS
  - Document màu sắc

#### 1.3. Base template
- [ ] **HTML5 boilerplate**
  - DOCTYPE, meta tags
  - SEO meta tags
  - Open Graph tags
  - Favicon
- [ ] **CSS reset/normalize**
  - Bootstrap integration
  - Custom reset
- [ ] **JavaScript setup**
  - jQuery CDN/local
  - Plugin initialization

---

### GIAI ĐOẠN 2: XÂY DỰNG COMPONENTS (5-7 ngày)

#### 2.1. Header Component
- [ ] **Logo section**
  - SVG/PNG logo
  - Link to homepage
  - Alt text
- [ ] **Main navigation**
  - Desktop menu
  - Dropdown menus
  - Hover effects
  - Active states
- [ ] **Hệ sinh thái menu**
  - Secondary menu bar
  - Links to sub-brands
  - Responsive hide/show
- [ ] **Search button**
  - Dropdown search box
  - Search form
  - Submit handler
- [ ] **Mobile menu**
  - Hamburger icon
  - Slide-in menu
  - Close button
  - Touch events
- [ ] **Sticky header**
  - Scroll listener
  - Add/remove sticky class
  - Smooth transition

#### 2.2. Footer Component
- [ ] **3-column layout**
  - Company info column
  - Description column
  - Map column
- [ ] **Social icons**
  - Facebook, YouTube, TikTok
  - Hover effects
  - External links
- [ ] **Google Maps embed**
  - API key
  - Custom styling
  - Responsive
- [ ] **Copyright bar**
  - Text center
  - Year auto-update
- [ ] **Scroll to top button**
  - Fixed position
  - Show/hide on scroll
  - Smooth scroll effect

#### 2.3. Card Components
- [ ] **News card**
  - Image thumbnail
  - Date/author meta
  - Title (2-line clamp)
  - Description (3-line clamp)
  - Read more button
  - Hover effect
- [ ] **Expert card**
  - Avatar image
  - Name + title
  - Brief description
  - Modal trigger
- [ ] **Partner card**
  - Logo image
  - Company name
  - Link
  - Hover scale

#### 2.4. Modal Components
- [ ] **Expert detail modal**
  - Image + info layout
  - Close button
  - Backdrop
  - Keyboard events (ESC)
- [ ] **Video modal**
  - YouTube iframe
  - Responsive embed
  - Close button
- [ ] **Lightbox gallery**
  - Image viewer
  - Navigation arrows
  - Thumbnails
  - Zoom

#### 2.5. Form Components
- [ ] **Contact form**
  - Input fields styling
  - Select dropdown
  - Textarea
  - reCAPTCHA
  - Submit button
- [ ] **Search form**
  - Input styling
  - Search icon
  - Submit handler
- [ ] **Validation**
  - Email validation
  - Phone validation
  - Required fields
  - Error messages

---

### GIAI ĐOẠN 3: XÂY DỰNG TRANG (10-14 ngày)

#### 3.1. Homepage (3-4 ngày)
- [ ] **Day 1: Banner section**
  - Hero banner HTML
  - Gradient background
  - Title styling
  - Image placement
  - Swiper slider setup
  - News cards integration
  - Auto-play config
  - Responsive adjustments
  
- [ ] **Day 2: Hệ sinh thái & Giới thiệu**
  - Brand grid layout
  - Brand cards
  - Hover effects
  - About section layout
  - Video embed
  - Feature blocks
  - Icons integration
  
- [ ] **Day 3: Counters & Achievements**
  - Counter boxes HTML/CSS
  - Counter animation JS
  - Scroll trigger
  - Achievement slider
  - Slick config
  - Lightbox integration
  - Navigation arrows
  
- [ ] **Day 4: News & Partners**
  - News section layout
  - News cards grid
  - Partner section
  - Partner logos grid
  - Final touches
  - Testing
  - Bug fixes

#### 3.2. Giới thiệu (2 ngày)
- [ ] **Day 1: Structure & Content**
  - Banner section
  - Breadcrumb
  - Video section
  - Value boxes (Vision, Mission, Values)
  - Tab navigation
  - Timeline slider
  
- [ ] **Day 2: Animations & Polish**
  - Scroll animations
  - Tab switching JS
  - Timeline slider config
  - Scroll carousel
  - Infinite loop
  - Testing

#### 3.3. Hợp tác (1-2 ngày)
- [ ] **Partner grid**
  - Layout structure
  - Partner cards
  - Pagination
- [ ] **Form integration**
  - Form fields
  - Validation
  - Submit handler
  - Success/error alerts

#### 3.4. Chuyên gia (1-2 ngày)
- [ ] **Grid layout**
  - Expert cards
  - Responsive columns
  - Hover effects
- [ ] **Modal system**
  - Modal HTML
  - Open/close JS
  - Data binding
  - Keyboard events

#### 3.5. Tin tức (2-3 ngày)
- [ ] **News listing page**
  - Grid layout
  - News cards
  - Filters (if any)
  - Pagination
- [ ] **News detail page**
  - Article template
  - Rich content styling
  - Share buttons
  - Related posts
  - Sidebar

#### 3.6. Thư viện (2-3 ngày)
- [ ] **Photo gallery**
  - Album grid
  - Album detail
  - Lightbox gallery
  - Navigation
- [ ] **Video library**
  - Video grid
  - Video modal
  - YouTube embed
- [ ] **Documents**
  - List layout
  - File icons
  - Download links
  - Categories

#### 3.7. Liên hệ (1 ngày)
- [ ] **Form section**
  - 2-column layout
  - Google Maps
  - Contact form
  - Validation
  - reCAPTCHA
  - Submit handler
- [ ] **Alerts**
  - Success alert
  - Error alert
  - Animation

---

### GIAI ĐOẠN 4: RESPONSIVE & CROSS-BROWSER (3-4 ngày)

#### 4.1. Mobile optimization (2 ngày)
- [ ] **Mobile menu**
  - Hamburger functionality
  - Slide-in animation
  - Touch events
- [ ] **Responsive layouts**
  - Grid adjustments
  - Image scaling
  - Font sizing
  - Spacing
- [ ] **Mobile-specific**
  - Touch-friendly buttons
  - Swipe gestures
  - Mobile nav
- [ ] **Testing devices**
  - iPhone (Safari)
  - Android (Chrome)
  - iPad (Safari)

#### 4.2. Tablet optimization (1 ngày)
- [ ] **Medium breakpoint**
  - Layout adjustments
  - Navigation
  - Grid columns
- [ ] **Testing**
  - iPad landscape/portrait
  - Android tablets

#### 4.3. Cross-browser testing (1 ngày)
- [ ] **Chrome**: Desktop + Mobile
- [ ] **Firefox**: Desktop + Mobile
- [ ] **Safari**: Desktop + iOS
- [ ] **Edge**: Desktop
- [ ] **Fix browser-specific issues**
  - CSS prefixes
  - JS polyfills
  - Layout bugs

---

### GIAI ĐOẠN 5: PERFORMANCE & SEO (2-3 ngày)

#### 5.1. Performance optimization
- [ ] **Image optimization**
  - Compress images
  - WebP format
  - Lazy loading
  - Responsive images (srcset)
- [ ] **CSS optimization**
  - Minify CSS
  - Remove unused CSS
  - Critical CSS
  - Combine files
- [ ] **JavaScript optimization**
  - Minify JS
  - Defer non-critical JS
  - Async loading
  - Bundle optimization
- [ ] **Caching**
  - Browser caching headers
  - Service worker (PWA)
  - CDN setup

#### 5.2. SEO optimization
- [ ] **Meta tags**
  - Title tags (unique per page)
  - Meta descriptions
  - Keywords
  - Canonical URLs
- [ ] **Open Graph**
  - OG image
  - OG title
  - OG description
  - Twitter cards
- [ ] **Structured data**
  - Schema.org markup
  - Organization
  - BreadcrumbList
  - Article (for news)
- [ ] **Technical SEO**
  - Sitemap.xml
  - Robots.txt
  - 404 page
  - 301 redirects
- [ ] **Accessibility**
  - Alt texts
  - ARIA labels
  - Keyboard navigation
  - Color contrast
  - Screen reader testing

---

### GIAI ĐOẠN 6: TESTING & QA (2-3 ngày)

#### 6.1. Functional testing
- [ ] **Navigation**
  - All menu links work
  - Dropdown menus
  - Breadcrumbs
  - Internal links
- [ ] **Forms**
  - Contact form submission
  - Search functionality
  - Validation works
  - Error handling
- [ ] **Interactive elements**
  - Sliders/Carousels
  - Modals
  - Lightbox
  - Accordions
  - Tabs

#### 6.2. Visual testing
- [ ] **Design consistency**
  - Colors match
  - Fonts correct
  - Spacing consistent
  - Alignment
- [ ] **Responsive**
  - All breakpoints
  - No overflow
  - Images scale
  - Text readable
- [ ] **Animations**
  - Smooth transitions
  - No jank
  - Performance OK

#### 6.3. User testing
- [ ] **User flow testing**
  - Homepage → Detail page
  - Search → Results
  - Contact form → Submit
- [ ] **Usability**
  - Easy to navigate
  - Clear CTAs
  - Fast loading
- [ ] **Bug fixes**
  - Create issue list
  - Prioritize
  - Fix critical bugs
  - Re-test

---

### GIAI ĐOẠN 7: DEPLOYMENT (1-2 ngày)

#### 7.1. Pre-deployment
- [ ] **Final checks**
  - All pages working
  - No console errors
  - Links verified
  - Forms tested
- [ ] **Backup**
  - Backup old site
  - Export database
  - Document configs
- [ ] **Setup production**
  - Domain setup
  - SSL certificate
  - Server config
  - Database setup

#### 7.2. Deployment
- [ ] **Upload files**
  - FTP/SFTP
  - Or Git deploy
  - Check permissions
- [ ] **Configure server**
  - .htaccess
  - Redirects
  - Caching
  - Compression
- [ ] **DNS update**
  - Point domain
  - Wait for propagation
- [ ] **Post-deploy testing**
  - Test on live server
  - All pages
  - Forms
  - Search
  - Performance

#### 7.3. Monitoring
- [ ] **Setup analytics**
  - Google Analytics
  - Google Tag Manager
  - Search Console
- [ ] **Error monitoring**
  - JavaScript errors
  - 404s
  - Form errors
- [ ] **Performance monitoring**
  - Page speed
  - Uptime
  - Server response

---

### GIAI ĐOẠN 8: DOCUMENTATION & HANDOVER (1 ngày)

#### 8.1. Documentation
- [ ] **Technical docs**
  - Code structure
  - Setup guide
  - Dependencies
  - Build process
- [ ] **User guide**
  - How to update content
  - How to add news
  - How to manage partners
- [ ] **Maintenance guide**
  - Backup procedure
  - Update procedure
  - Troubleshooting

#### 8.2. Handover
- [ ] **Client training**
  - Content management
  - Basic updates
  - Contact form
- [ ] **Access handover**
  - Server credentials
  - CMS login
  - Analytics access
- [ ] **Support plan**
  - Bug fix period
  - Maintenance contract
  - Contact info

---

## 🎯 ĐIỂM QUAN TRỌNG CẦN LƯU Ý

### Design Elements
1. **Màu sắc**: Giữ chính xác màu cam #F37435 (Nova) và xanh lá #70B54B (Edu)
2. **Gradient**: Sử dụng nhiều gradient, đặc biệt ở background sections
3. **Border radius**: Nhiều elements có border-radius lớn (15-25px)
4. **Shadow**: Box shadow mềm mại, không quá đậm
5. **Animations**: Smooth transitions, reveal on scroll

### Technical Details
1. **Responsive**: Mobile-first approach
2. **Performance**: Lazy load images, minify assets
3. **SEO**: Proper meta tags, structured data
4. **Accessibility**: Keyboard nav, screen readers
5. **Cross-browser**: Test trên tất cả browsers phổ biến

### Content Management
1. **Dynamic content**: Chuẩn bị cho CMS integration
2. **News system**: Có thể thêm/sửa/xóa tin tức
3. **Partner management**: Quản lý đối tác
4. **Expert profiles**: Quản lý chuyên gia
5. **Gallery**: Upload/manage photos & videos

### Third-party Integrations
1. **Google Tag Manager**: GTM-N69F5H7D
2. **reCAPTCHA**: Form protection
3. **Facebook SDK**: Social integration
4. **Zalo**: Chat widget
5. **Google Maps**: Location embed

---

## 📊 TIMELINE DỰ KIẾN

| Giai đoạn | Thời gian | Chi tiết |
|-----------|-----------|----------|
| **1. Setup** | 2-3 ngày | Môi trường, assets, base template |
| **2. Components** | 5-7 ngày | Header, footer, cards, modals, forms |
| **3. Pages** | 10-14 ngày | All pages (homepage, about, contact, etc.) |
| **4. Responsive** | 3-4 ngày | Mobile, tablet, cross-browser |
| **5. Performance & SEO** | 2-3 ngày | Optimization, SEO setup |
| **6. Testing & QA** | 2-3 ngày | Functional, visual, user testing |
| **7. Deployment** | 1-2 ngày | Server setup, deploy, monitoring |
| **8. Documentation** | 1 ngày | Docs, handover, training |
| **TỔNG CỘNG** | **26-37 ngày** | **≈ 5-7 tuần** |

---

## 🔧 TOOLS & RESOURCES

### Development Tools
- **Code Editor**: VS Code, Sublime Text
- **Version Control**: Git, GitHub/GitLab
- **Browser DevTools**: Chrome DevTools, Firefox DevTools
- **Task Runner**: Gulp/Webpack (optional)
- **Package Manager**: npm, yarn

### Design Tools
- **Figma/Sketch**: Design reference
- **Photoshop**: Image editing
- **ImageOptim**: Image compression
- **ColorZilla**: Color picker

### Testing Tools
- **BrowserStack**: Cross-browser testing
- **Lighthouse**: Performance audit
- **Google PageSpeed**: Speed testing
- **W3C Validator**: HTML/CSS validation
- **WAVE**: Accessibility testing

### SEO Tools
- **Google Search Console**: Indexing, errors
- **Google Analytics**: Traffic analytics
- **Screaming Frog**: SEO crawler
- **Yoast**: SEO analysis

---

## 📚 TÀI LIỆU THAM KHẢO

### Bootstrap Documentation
- https://getbootstrap.com/docs/

### jQuery Plugins
- **Swiper**: https://swiperjs.com/
- **Slick**: https://kenwheeler.github.io/slick/
- **fslightbox**: https://fslightbox.com/

### Google Services
- **Google Fonts**: https://fonts.google.com/
- **reCAPTCHA**: https://www.google.com/recaptcha/
- **Google Maps**: https://developers.google.com/maps/

### Web Performance
- **Web.dev**: https://web.dev/
- **MDN Web Docs**: https://developer.mozilla.org/

---

## ✅ CHECKLIST HOÀN THÀNH

### Pre-launch Checklist
- [ ] All pages load correctly
- [ ] No JavaScript errors in console
- [ ] All images have alt text
- [ ] All links work (internal & external)
- [ ] Forms submit successfully
- [ ] Mobile menu works
- [ ] Search functionality works
- [ ] All sliders/carousels work
- [ ] Modals open/close correctly
- [ ] Responsive on all devices
- [ ] Cross-browser compatible
- [ ] SEO meta tags present
- [ ] Google Analytics installed
- [ ] SSL certificate installed
- [ ] 404 page exists
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Performance score > 80
- [ ] Accessibility score > 90

### Post-launch Checklist
- [ ] Monitor server uptime
- [ ] Check analytics data
- [ ] Monitor form submissions
- [ ] Check for 404 errors
- [ ] Monitor page speed
- [ ] Collect user feedback
- [ ] Address any bugs
- [ ] Plan content updates
- [ ] Schedule backups
- [ ] Document issues

---

## 📞 HỖ TRỢ & LIÊN HỆ

Nếu cần hỗ trợ trong quá trình phát triển:

### Resources
- **Bootstrap Forum**: https://stackoverflow.com/questions/tagged/bootstrap
- **jQuery Forum**: https://forum.jquery.com/
- **Web Development**: https://stackoverflow.com/

### Documentation
- Tất cả documentation nên được lưu trong `/docs` folder
- Update TODO.md thường xuyên
- Log issues trong GitHub Issues

---

## 🎉 KẾT LUẬN

Dự án xây dựng lại website NovaEdu là một dự án quy mô trung bình với nhiều features phức tạp. Với timeline dự kiến 5-7 tuần, cần có một team gồm:

- **1 Frontend Developer**: Phụ trách HTML/CSS/JS
- **1 Backend Developer**: Phụ trách server, database, APIs (nếu cần)
- **1 Designer**: Review design, chuẩn bị assets
- **1 QA Tester**: Testing, bug tracking

Hoặc có thể là 1 Full-stack Developer có kinh nghiệm.

**Lưu ý**: Timeline có thể thay đổi tùy vào:
- Độ phức tạp của backend (nếu có)
- Số lượng revisions
- Tốc độ feedback từ client
- Các yêu cầu mới phát sinh

**Thành công!** 🚀

---

**Ngày tạo**: ${new Date().toLocaleDateString('vi-VN')}
**Phiên bản**: 1.0
**Tác giả**: AI Assistant via Cursor

