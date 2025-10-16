# PHÂN TÍCH KỸ THUẬT CHI TIẾT - HAPPY WORLD MEKONG

## 📊 TỔNG QUAN TRANG WEB

### Thông tin cơ bản
- **Tên dự án**: Happy World Mekong
- **Domain**: happyworldmekong.com (dự kiến)
- **Loại website**: Tourism / Travel Platform
- **Công nghệ Frontend**: React.js / Vue.js / Next.js
- **Công nghệ Backend**: Java Spring Boot + JPA/Hibernate
- **Database**: MySQL / PostgreSQL
- **Kiến trúc**: RESTful API + SPA Frontend

---

## 🎨 THIẾT KẾ & BRANDING

### Color Palette - Bảng màu chi tiết

#### Primary Colors (Màu chính)
```css
/* Brand Colors - Happy World Mekong */
--mekong-blue: #0057B8;     /* Xanh dương chủ đạo - CMYK(91-56-10-0) */
--sunrise-orange: #FF8C00;  /* Cam phụ - CMYK(0-55-100-0) */
--rice-green: #3E8E41;      /* Xanh lá - CMYK(73-23-88-10) */

/* Text Colors */
--text-primary: #1C274C;    /* Xanh navy đậm - Tiêu đề */
--text-secondary: #666666;  /* Xám văn bản */
--text-white: #FFFFFF;      /* Trắng */
--text-black: #000000;      /* Đen */

/* Supporting Colors */
--blue-light: #4A90E2;      /* Xanh nhạt */
--orange-light: #FFB84D;    /* Cam nhạt */
--green-light: #5CB85C;     /* Xanh lá nhạt */
--blue-dark: #003D82;       /* Xanh đậm */
```

#### Secondary Colors (Màu phụ)
```css
/* Background Colors */
--bg-white: #FFFFFF;
--bg-light: #F8F9FA;
--bg-gray: #EBEEF0;
--bg-dark: #343A40;
--bg-navy: #1F294B;

/* Border & Shadow */
--border-gray: #CCC;
--border-light: rgba(34, 34, 34, 0.1);
--shadow-light: rgba(0, 0, 0, 0.1);
--shadow-medium: rgba(0, 0, 0, 0.15);
--shadow-dark: rgba(0, 0, 0, 0.2);
```

#### Gradient Colors
```css
/* Blue Gradient - Xanh dương */
--gradient-blue: linear-gradient(
  180deg, 
  #0057B8 0%, 
  #003D82 100%
);

/* Orange Gradient - Cam */
--gradient-orange: linear-gradient(
  180deg, 
  #FF8C00 0%, 
  #FF6B00 100%
);

/* Green Gradient - Xanh lá */
--gradient-green: linear-gradient(
  180deg, 
  #3E8E41 0%, 
  #2D6A2F 100%
);

/* Background Gradients - Mekong Theme */
--gradient-bg-1: linear-gradient(
  135deg, 
  rgba(255, 255, 255, 0.00) 23.22%, 
  rgba(0, 87, 184, 0.07) 38.09%, 
  rgba(255, 140, 0, 0.07) 54.12%, 
  rgba(62, 142, 65, 0.15) 76.48%
);

--gradient-bg-2: linear-gradient(
  0deg, 
  rgba(255, 255, 255, 0.00) 1.94%, 
  rgba(0, 87, 184, 0.10) 51.27%, 
  rgba(255, 140, 0, 0.08) 102.87%
);

--gradient-bg-3: linear-gradient(
  184deg, 
  rgba(255, 255, 255, 0.00) 5.98%, 
  rgba(62, 142, 65, 0.08) 25.31%, 
  rgba(0, 87, 184, 0.06) 58.58%, 
  rgba(248, 248, 248, 0.20) 96.97%
);
```

### Typography System

#### Font Families
```css
/* Primary Font */
font-family: 'Montserrat', sans-serif;
/* Weights: 100, 200, 300, 400, 500, 600, 700, 800, 900 */
/* Usage: Body text, paragraphs, general content */

/* Secondary Font */
font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
/* Weights: 400, 600, 700 */
/* Usage: Headings, titles, special text */
```

#### Font Sizes
```css
/* Headings */
--font-size-h1: 40px;        /* Desktop */
--font-size-h1-mobile: 28px; /* Mobile */
--font-size-h2: 35px;
--font-size-h2-mobile: 24px;
--font-size-h3: 25px;
--font-size-h3-mobile: 20px;
--font-size-h4: 20px;
--font-size-h4-mobile: 18px;
--font-size-h5: 18px;
--font-size-h6: 16px;

/* Body Text */
--font-size-base: 16px;      /* Paragraph */
--font-size-large: 18px;     /* Lead text */
--font-size-small: 14px;     /* Secondary text */
--font-size-xs: 13px;        /* Meta info */
--font-size-xxs: 12px;       /* Labels */

/* Special */
--font-size-hero: 60px;      /* Banner title */
--font-size-hero-mobile: 40px;
```

#### Line Heights
```css
--line-height-tight: 1.2;    /* Headings */
--line-height-normal: 1.5;   /* Body */
--line-height-relaxed: 1.65; /* Long content */
--line-height-loose: 2.0;    /* Special spacing */
```

#### Font Weights
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

### Spacing System

#### Padding & Margins
```css
/* Base spacing unit: 5px */
--space-xs: 5px;      /* 1 unit */
--space-sm: 10px;     /* 2 units */
--space-md: 15px;     /* 3 units */
--space-lg: 20px;     /* 4 units */
--space-xl: 30px;     /* 6 units */
--space-2xl: 40px;    /* 8 units */
--space-3xl: 50px;    /* 10 units */
--space-4xl: 60px;    /* 12 units */
--space-5xl: 80px;    /* 16 units */
--space-6xl: 100px;   /* 20 units */

/* Section Spacing */
--section-padding-y: 60px;         /* Desktop */
--section-padding-y-mobile: 40px;  /* Mobile */
--section-padding-x: 15px;         /* Container padding */
```

#### Border Radius
```css
--radius-sm: 5px;     /* Small elements */
--radius-md: 10px;    /* Buttons, cards */
--radius-lg: 15px;    /* Larger cards */
--radius-xl: 20px;    /* Hero sections */
--radius-2xl: 25px;   /* Special sections */
--radius-full: 50%;   /* Circles */
--radius-pill: 50px;  /* Pill buttons */
```

### Shadow System

```css
/* Light Shadow */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);

/* Medium Shadow */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Large Shadow */
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);

/* Extra Large Shadow */
--shadow-xl: 0 20px 30px rgba(0, 0, 0, 0.2);

/* Specific Shadows */
--shadow-card: 0 0 10px rgba(0, 0, 0, 0.2);
--shadow-hover: 0 0 20px rgba(0, 0, 0, 0.15);
--shadow-dropdown: 0 0px 4px 0px rgba(0, 0, 0, 0.25);
```

---

## 🧩 COMPONENTS CHI TIẾT

### 1. Navigation Component

#### Desktop Navigation
```html
<div class="site-navbar-wrap">
  <!-- Top bar với hệ sinh thái -->
  <div class="site-navbar-top">
    <div class="menu-brand">
      <p>Hệ sinh thái Novaedu:</p>
      <ul>
        <li><a href="#">novae.vn</a></li>
        <!-- ... -->
      </ul>
    </div>
  </div>
  
  <!-- Main navigation -->
  <div class="site-navbar">
    <div class="container">
      <div class="row">
        <!-- Logo -->
        <div class="col-2 logo-nova">
          <img src="logo.png" alt="NovaEdu">
        </div>
        
        <!-- Menu -->
        <div class="col-9">
          <ul class="site-menu">
            <li><a href="#">Trang chủ</a></li>
            <li class="has-children">
              <a href="#">Hợp tác</a>
              <ul class="dropdown">
                <li><a href="#">Item 1</a></li>
              </ul>
            </li>
          </ul>
        </div>
        
        <!-- Search -->
        <div class="col-1">
          <button class="btn-search">
            <i class="fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**CSS Styles:**
```css
/* Desktop Menu */
.site-navbar {
  background: #fff;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.site-menu > li {
  display: inline-block;
  padding: 0 6px;
}

.site-menu > li > a {
  color: #1C274C;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 15px;
  transition: color 0.3s;
}

.site-menu > li > a:hover,
.site-menu > li > a.active {
  color: #0057B8;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.has-children:hover .dropdown {
  opacity: 1;
  visibility: visible;
}
```

#### Mobile Navigation
```html
<!-- Mobile Toggle Button -->
<button class="site-menu-toggle js-menu-toggle">
  <span class="icon-menu"></span>
</button>

<!-- Mobile Menu -->
<div class="site-mobile-menu">
  <div class="site-mobile-menu-header">
    <button class="site-mobile-menu-close">
      <span class="icon-close"></span>
    </button>
  </div>
  <div class="site-mobile-menu-body">
    <!-- Menu items -->
  </div>
</div>
```

**Mobile Menu Behavior:**
- Slide in from right
- Overlay with backdrop
- Touch-enabled
- Close on backdrop click or close button

### 2. Card Components

#### News Card
```html
<div class="news-card">
  <div class="news-card-img">
    <img src="image.jpg" alt="News title">
  </div>
  <div class="news-card-body">
    <div class="news-meta">
      <span class="date">
        <i class="fa-calendar"></i> 2025-10-15
      </span>
      <span class="author">
        <i class="fa-user"></i> Admin
      </span>
    </div>
    <h3 class="news-title">
      <a href="#">News Title Here</a>
    </h3>
    <p class="news-excerpt">
      Short description...
    </p>
    <a href="#" class="btn-read-more">
      Xem thêm <i class="fa-arrow-right"></i>
    </a>
  </div>
</div>
```

**Styles:**
```css
.news-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.25);
}

.news-card-img {
  height: 220px;
  overflow: hidden;
}

.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.news-card:hover .news-card-img img {
  transform: scale(1.1);
}

.news-title {
  font-size: 16px;
  font-weight: 700;
  margin: 10px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-title a {
  color: #000;
  transition: color 0.3s;
}

.news-title a:hover {
  color: #0057B8;
}
```

#### Expert/Profile Card
```html
<div class="expert-card">
  <div class="expert-img">
    <img src="avatar.jpg" alt="Expert name">
  </div>
  <div class="expert-info">
    <h4 class="expert-name">Tên Chuyên Gia</h4>
    <p class="expert-title">Chức vụ</p>
    <button class="btn-view-profile" data-toggle="modal">
      Xem chi tiết
    </button>
  </div>
</div>
```

**Styles:**
```css
.expert-card {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  transition: transform 0.3s;
}

.expert-card:hover {
  transform: scale(1.05);
}

.expert-img {
  height: 150px;
  margin-bottom: 15px;
}

.expert-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.expert-name {
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0 5px;
  color: #1C274C;
}

.expert-title {
  font-size: 14px;
  color: #797979;
  margin-bottom: 15px;
}
```

### 3. Button Components

#### Primary Button (Blue)
```html
<button class="btn btn-primary">
  Đặt Tour Ngay <i class="fa-arrow-right"></i>
</button>
```

**Styles:**
```css
.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  outline: none;
}

.btn-primary {
  background: linear-gradient(180deg, #0057B8 0%, #003D82 100%);
  color: #fff;
  box-shadow: 0 4px 6px rgba(0,87,184,0.2);
}

.btn-primary:hover {
  background: linear-gradient(180deg, #0066D4 0%, #004999 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,87,184,0.3);
}

.btn-secondary {
  background: linear-gradient(180deg, #FF8C00 0%, #FF6B00 100%);
  color: #fff;
  box-shadow: 0 4px 6px rgba(255,140,0,0.2);
}

.btn-secondary:hover {
  background: linear-gradient(180deg, #FFA500 0%, #FF8000 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255,140,0,0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid #0057B8;
  color: #0057B8;
}

.btn-outline:hover {
  background: #0057B8;
  color: #fff;
}
```

### 4. Modal Component

```html
<div class="modal fade" id="expertModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6">
            <img src="expert.jpg" class="img-fluid">
          </div>
          <div class="col-md-6">
            <h3 class="expert-name">Tên chuyên gia</h3>
            <p class="expert-title">Chức danh</p>
            <div class="expert-bio">
              <!-- Biography content -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**JavaScript:**
```javascript
// Open modal
$('.btn-view-profile').on('click', function() {
  var expertId = $(this).data('id');
  // Load expert data
  $('#expertModal').modal('show');
});

// Close modal on backdrop click
$('.modal').on('click', function(e) {
  if (e.target === this) {
    $(this).modal('hide');
  }
});

// Close on ESC key
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    $('.modal').modal('hide');
  }
});
```

### 5. Form Components

#### Contact Form
```html
<form class="contact-form" method="POST">
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <select name="topic" class="form-control" required>
          <option value="">Chủ đề quan tâm</option>
          <option value="1">Tư vấn</option>
          <option value="2">Hợp tác</option>
        </select>
        <span class="error-msg" id="err-topic"></span>
      </div>
    </div>
    
    <div class="col-md-6">
      <div class="form-group">
        <input type="text" name="fullName" 
               class="form-control" 
               placeholder="Họ và tên" required>
        <span class="error-msg" id="err-name"></span>
      </div>
    </div>
    
    <div class="col-md-6">
      <div class="form-group">
        <input type="email" name="email" 
               class="form-control" 
               placeholder="Email" required>
        <span class="error-msg" id="err-email"></span>
      </div>
    </div>
    
    <div class="col-md-6">
      <div class="form-group">
        <input type="tel" name="phone" 
               class="form-control" 
               placeholder="Điện thoại" required>
        <span class="error-msg" id="err-phone"></span>
      </div>
    </div>
    
    <div class="col-12">
      <div class="form-group">
        <textarea name="content" class="form-control" 
                  rows="4" placeholder="Nội dung"></textarea>
        <span class="error-msg" id="err-content"></span>
      </div>
    </div>
    
    <div class="col-12">
      <div class="g-recaptcha" 
           data-sitekey="your-site-key"></div>
    </div>
    
    <div class="col-12">
      <button type="submit" class="btn btn-primary">
        Gửi
      </button>
    </div>
  </div>
</form>
```

**Validation JavaScript:**
```javascript
$('.contact-form').on('submit', function(e) {
  e.preventDefault();
  
  // Reset errors
  $('.error-msg').text('').hide();
  
  var isValid = true;
  
  // Validate email
  var email = $('input[name="email"]').val();
  var emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    $('#err-email').text('Email không hợp lệ').show();
    isValid = false;
  }
  
  // Validate phone
  var phone = $('input[name="phone"]').val();
  var phoneRegex = /^(0[0-9]{9})$/;
  if (!phoneRegex.test(phone)) {
    $('#err-phone').text('Số điện thoại không hợp lệ').show();
    isValid = false;
  }
  
  // Check reCAPTCHA
  var recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert('Vui lòng xác nhận bạn không phải robot');
    isValid = false;
  }
  
  if (isValid) {
    // Submit form
    this.submit();
  }
});
```

---

## 🎭 ANIMATIONS & INTERACTIONS

### Scroll Animations

```javascript
// Reveal on scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
```

**CSS:**
```css
.reveal {
  position: relative;
  transform: translateY(150px);
  opacity: 0;
  transition: 1s all ease;
}

.reveal.active {
  transform: translateY(0);
  opacity: 1;
  padding-bottom: 25px;
}
```

### Counter Animation

```javascript
function startCounting() {
  var counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    var target = parseInt(counter.dataset.count);
    var current = 0;
    var increment = target / 100;
    
    var timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 10);
  });
}

// Trigger on scroll
window.addEventListener('scroll', function() {
  var counterSection = document.querySelector('.counter-section');
  var rect = counterSection.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && !counterSection.classList.contains('counted')) {
    counterSection.classList.add('counted');
    startCounting();
  }
});
```

### Hover Effects

```css
/* Card hover - lift effect */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

/* Image zoom on hover */
.img-zoom-container {
  overflow: hidden;
}

.img-zoom {
  transition: transform 0.5s ease;
}

.img-zoom-container:hover .img-zoom {
  transform: scale(1.1);
}

/* Button grow effect */
.btn-grow {
  transition: transform 0.2s ease;
}

.btn-grow:hover {
  transform: scale(1.05);
}
```

---

## 🔄 SLIDER/CAROUSEL CONFIGURATIONS

### Swiper Configuration

```javascript
var swiper = new Swiper('.banner-swiper-active', {
  effect: 'cards',
  grabCursor: true,
  pagination: {
    el: '.rbt-swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 600,
});
```

### Slick Carousel

```javascript
$('.autoplay').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: false,
      }
    }
  ]
});
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Media Query System

```css
/* Extra Small Devices (Portrait phones) */
@media (max-width: 393px) {
  /* Styles */
}

/* Small Devices (Landscape phones) */
@media (max-width: 480px) {
  .home-brand-item {
    width: 46%;
  }
  
  .new-highlight-item {
    width: 100%;
  }
  
  .footer-center h5,
  .footer-center ul {
    display: none;
  }
}

/* Medium Devices (Tablets) */
@media (max-width: 600px) {
  .about__second__imgItems {
    height: auto;
  }
  
  .modal-content {
    width: 400px !important;
  }
}

/* Large Tablets */
@media (max-width: 821px) {
  .home-brand-item {
    width: 23%;
  }
  
  .new-home-item-img {
    display: none;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }
}
```

---

## 🔐 SECURITY & VALIDATION

### CSRF Protection
```html
<!-- Laravel CSRF Token -->
<input type="hidden" name="_token" value="4XHBQHbH0vPpZVVNOsXPeOt7Ca7uThiTI4n7hG06">
```

### reCAPTCHA Implementation
```html
<!-- reCAPTCHA -->
<div class="g-recaptcha" 
     data-sitekey="6LdVkwkUAAAAACeeETRX--v9Js0vWyjQOTIZxxeB"></div>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

**Validation:**
```javascript
var recaptchaResponse = grecaptcha.getResponse();
if (!recaptchaResponse) {
  alert('Vui lòng xác nhận bạn không phải robot');
  return false;
}
```

### Input Sanitization
```javascript
// Email validation
function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

// Phone validation (Vietnam)
function validatePhone(phone) {
  var regex = /^(0[0-9]{9})$/;
  return regex.test(phone);
}

// XSS prevention (basic)
function sanitizeInput(input) {
  var div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
```

---

## 📊 PERFORMANCE OPTIMIZATION

### Image Optimization

```html
<!-- Lazy loading -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     class="lazy"
     alt="Description">

<!-- Responsive images -->
<img srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1280w.jpg 1280w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1200px"
     src="image-640w.jpg"
     alt="Description">
```

**JavaScript:**
```javascript
// Lazy load images
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});
```

### CSS Optimization

```css
/* Critical CSS - Inline in <head> */
body { font-family: 'Montserrat', sans-serif; }
.site-navbar { background: #fff; }

/* Non-critical CSS - Load async */
<link rel="preload" href="style.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">
```

### JavaScript Optimization

```html
<!-- Defer non-critical JS -->
<script defer src="main.js"></script>

<!-- Async for independent scripts -->
<script async src="analytics.js"></script>
```

---

## 🔍 SEO IMPLEMENTATION

### Meta Tags Template

```html
<head>
  <!-- Basic Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Page Title - NOVAEDU</title>
  <meta name="description" content="Page description here">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <meta name="author" content="NOVAEDU - GIÁO DỤC ĐẾN TỪ TƯƠNG LAI">
  <link rel="canonical" href="https://novaedu.vn/page-url"/>
  
  <!-- Open Graph -->
  <meta property="og:locale" content="vi_VN"/>
  <meta property="og:url" content="https://novaedu.vn/page-url"/>
  <meta property="og:title" content="Page Title"/>
  <meta property="og:site_name" content="NOVAEDU"/>
  <meta property="og:description" content="Page description"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://novaedu.vn/image.jpg"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="Page Title"/>
  <meta name="twitter:description" content="Page description"/>
  <meta name="twitter:image" content="https://novaedu.vn/image.jpg"/>
  
  <!-- Favicon -->
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
</head>
```

### Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NOVAEDU",
  "url": "https://novaedu.vn",
  "logo": "https://novaedu.vn/logo.png",
  "description": "Công ty Cổ phần Công nghệ Giáo dục Nova",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 22 Thành Công",
    "addressLocality": "Hà Nội",
    "addressCountry": "VN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-989-49-20-20",
    "contactType": "customer service",
    "email": "lienhe@novaedu.vn"
  },
  "sameAs": [
    "https://www.facebook.com/NovaEdu.vn/",
    "https://www.youtube.com/@NovaeduNhanlucthoiky40",
    "https://www.tiktok.com/@nova_edu"
  ]
}
</script>
```

---

## 📈 ANALYTICS & TRACKING

### Google Tag Manager

```html
<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N69F5H7D');
</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N69F5H7D"
          height="0" width="0" style="display:none;visibility:hidden">
  </iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Event Tracking

```javascript
// Track button clicks
$('.btn-cta').on('click', function() {
  dataLayer.push({
    'event': 'button_click',
    'button_name': $(this).text(),
    'button_location': window.location.pathname
  });
});

// Track form submissions
$('form').on('submit', function() {
  dataLayer.push({
    'event': 'form_submit',
    'form_name': $(this).attr('id') || 'contact_form'
  });
});

// Track scroll depth
var scrollDepth = 0;
$(window).scroll(function() {
  var docHeight = $(document).height();
  var winHeight = $(window).height();
  var scrollPercent = ($(window).scrollTop() / (docHeight - winHeight)) * 100;
  
  if (scrollPercent > scrollDepth + 25) {
    scrollDepth = Math.floor(scrollPercent / 25) * 25;
    dataLayer.push({
      'event': 'scroll_depth',
      'scroll_percentage': scrollDepth
    });
  }
});
```

---

## 🛠️ DEVELOPMENT BEST PRACTICES

### Code Organization

```
project/
├── assets/
│   ├── css/
│   │   ├── vendors/          # Third-party CSS
│   │   ├── base/             # Reset, variables
│   │   ├── components/       # Buttons, cards, forms
│   │   ├── layout/           # Header, footer, grid
│   │   ├── pages/            # Page-specific styles
│   │   └── utilities/        # Helper classes
│   │
│   ├── js/
│   │   ├── vendors/          # jQuery, plugins
│   │   ├── components/       # Component scripts
│   │   ├── pages/            # Page scripts
│   │   └── main.js           # Main app script
│   │
│   └── images/
│       ├── logos/
│       ├── icons/
│       ├── backgrounds/
│       └── content/
```

### Naming Conventions

```css
/* BEM Methodology */
.block {}                     /* Component */
.block__element {}            /* Child element */
.block--modifier {}           /* Variation */

/* Examples */
.card {}
.card__image {}
.card__title {}
.card__description {}
.card--featured {}
.card--large {}

/* Utility classes */
.u-text-center {}
.u-mb-20 {}
.u-hide-mobile {}

/* JavaScript hooks */
.js-toggle-menu {}
.js-open-modal {}
.js-submit-form {}
```

### Comments & Documentation

```css
/* ========================================
   SECTION TITLE
   ======================================== */

/**
 * Component Name
 * 
 * Description of what this component does
 * 
 * @example
 * <div class="component">
 *   <div class="component__element"></div>
 * </div>
 */
.component {
  /* Styles */
}

/* Subsection */
.component__element {
  /* Styles */
}
```

```javascript
/**
 * Function description
 * 
 * @param {string} param1 - Description
 * @param {number} param2 - Description
 * @returns {boolean} Description
 */
function myFunction(param1, param2) {
  // Implementation
}
```

---

**Tài liệu này được tạo ngày**: ${new Date().toLocaleDateString('vi-VN')}
**Phiên bản**: 1.0

