# 🎨 DESIGN SYSTEM - HAPPY WORLD MEKONG

## Tổng quan Design System

Design System của Happy World Mekong được xây dựng dựa trên ba màu chủ đạo thể hiện vùng đất Đồng bằng sông Cửu Long:
- **Mekong Blue** (#0057B8) - CMYK(91-56-10-0) - Đại diện cho dòng sông Mekong bao la
- **Sunrise Orange** (#FF8C00) - CMYK(0-55-100-0) - Đại diện cho bình minh trên cánh đồng
- **Rice Green** (#3E8E41) - CMYK(73-23-88-10) - Đại diện cho cánh đồng lúa xanh mướt

---

## 🎨 COLOR PALETTE

### Primary Colors

#### Mekong Blue - Xanh dương chủ đạo
```
Color Name: Mekong Blue
HEX: #0057B8
RGB: rgb(0, 87, 184)
HSL: hsl(212, 100%, 36%)
CMYK: cmyk(91, 56, 10, 0)

Usage: 
- Primary CTA buttons
- Navigation bar
- Headers
- Links
- Important headings
- Brand elements
```

#### Sunrise Orange - Cam phụ
```
Color Name: Sunrise Orange
HEX: #FF8C00
RGB: rgb(255, 140, 0)
HSL: hsl(33, 100%, 50%)
CMYK: cmyk(0, 55, 100, 0)

Usage:
- Secondary CTA buttons
- Highlights
- Call-to-action elements
- Warning states
- Accent elements
```

#### Rice Green - Xanh lá
```
Color Name: Rice Green
HEX: #3E8E41
RGB: rgb(62, 142, 65)
HSL: hsl(122, 39%, 40%)
CMYK: cmyk(73, 23, 88, 10)

Usage:
- Success messages
- Positive indicators
- Nature/eco elements
- Green sections
- Environmental badges
```

### Text Colors

#### Primary Text - Navy Blue
```
Color Name: Navy Blue
HEX: #1C274C
RGB: rgb(28, 39, 76)
HSL: hsl(226, 46%, 20%)

Usage:
- Main headings (H1, H2)
- Important text
- Logo text
- Navigation items
```

#### Secondary Text - Gray
```
Color Name: Medium Gray
HEX: #797979
RGB: rgb(121, 121, 121)
HSL: hsl(0, 0%, 47%)

Usage:
- Body text
- Descriptions
- Meta information
- Secondary content
```

#### Link Text
```
Color Name: Pure Black
HEX: #000000
RGB: rgb(0, 0, 0)

Default state: #0057B8 (Mekong Blue)
Hover state: #FF8C00 (Sunrise Orange)
Active state: #003D82 (Dark Blue)
```

### Accent Colors

#### Accent Green - Bright Green
```
Color Name: Bright Green
HEX: #00B976
RGB: rgb(0, 185, 118)
HSL: hsl(158, 100%, 36%)

Usage:
- Call-to-action elements
- Success notifications
- Highlight elements
- Icons
```

#### Accent Orange - Deep Orange
```
Color Name: Deep Orange
HEX: #FF580E
RGB: rgb(255, 88, 14)
HSL: hsl(18, 100%, 53%)

Usage:
- Warning messages
- Hot badges
- Important notifications
- Gradient components
```

#### Accent Pink - Magenta
```
Color Name: Magenta Pink
HEX: #FF007A
RGB: rgb(255, 0, 122)
HSL: hsl(331, 100%, 50%)

Usage:
- Decorative elements
- Gradient backgrounds
- Special highlights
```

### Background Colors

#### White Backgrounds
```
Pure White: #FFFFFF
Light Gray: #F8F9FA
Extra Light Gray: #EBEEF0
```

#### Dark Backgrounds
```
Navy Dark: #1F294B
Blue Navy: #002191
Charcoal: #343A40
```

### Border & Shadow Colors

```
Border Light: rgba(34, 34, 34, 0.1)
Border Medium: #CCC
Border Dark: #999

Shadow Light: rgba(0, 0, 0, 0.1)
Shadow Medium: rgba(0, 0, 0, 0.15)
Shadow Dark: rgba(0, 0, 0, 0.2)
```

---

## 🌈 GRADIENT PALETTE

### Blue Gradient (Xanh dương)
```css
background: linear-gradient(
  180deg, 
  #0057B8 0%, 
  #003D82 100%
);
```
**Preview:**
```
┌─────────────────────────┐
│ #0057B8 (Mekong Blue)  │  ← Start
│ #003D82 (Dark Blue)    │  ← End
└─────────────────────────┘
```
**Usage:** Primary buttons, Headers, Hero sections, Navigation

---

### Orange Gradient (Cam)
```css
background: linear-gradient(
  180deg, 
  #FF8C00 0%, 
  #FF6B00 100%
);
```
**Preview:**
```
┌─────────────────────────┐
│ #FF8C00 (Sunrise)      │  ← Start
│ #FF6B00 (Deep Orange)  │  ← End
└─────────────────────────┘
```
**Usage:** CTA buttons, Highlights, Booking buttons

---

### Green Gradient (Xanh lá)
```css
background: linear-gradient(
  180deg, 
  #3E8E41 0%, 
  #2D6A2F 100%
);
```
**Preview:**
```
┌─────────────────────────┐
│ #3E8E41 (Rice Green)   │  ← Start
│ #2D6A2F (Forest Green) │  ← End
└─────────────────────────┘
```
**Usage:** Success states, Eco badges, Nature sections

---

### Background Gradient 1 (Mekong Theme)
```css
background: linear-gradient(
  135deg, 
  rgba(255, 255, 255, 0.00) 23.22%, 
  rgba(0, 87, 184, 0.07) 38.09%, 
  rgba(255, 140, 0, 0.07) 54.12%, 
  rgba(62, 142, 65, 0.15) 76.48%
);
```
**Usage:** Page backgrounds, Hero sections, Banner backgrounds

---

### Background Gradient 2 (Blue to Orange)
```css
background: linear-gradient(
  0deg, 
  rgba(255, 255, 255, 0.00) 1.94%, 
  rgba(0, 87, 184, 0.10) 51.27%, 
  rgba(255, 140, 0, 0.08) 102.87%
);
```
**Usage:** Section backgrounds, Content areas

---

### Background Gradient 3 (Green Overlay)
```css
background: linear-gradient(
  184deg, 
  rgba(255, 255, 255, 0.00) 5.98%, 
  rgba(62, 142, 65, 0.08) 25.31%, 
  rgba(0, 87, 184, 0.06) 58.58%, 
  rgba(248, 248, 248, 0.20) 96.97%
);
```
**Usage:** Nature sections, Eco-friendly areas

---

## 📐 TYPOGRAPHY SYSTEM

### Font Families

#### Primary Font - Montserrat
```
Font Family: 'Montserrat', sans-serif
Available Weights: 100, 200, 300, 400, 500, 600, 700, 800, 900
Google Fonts: https://fonts.google.com/specimen/Montserrat

Usage:
- Body text
- Paragraphs
- General content
- Buttons
- Form labels
```

**Weight Guide:**
- Thin (100): Decorative only
- Extra Light (200): Subtle text
- Light (300): Secondary content
- Regular (400): Body text, paragraphs
- Medium (500): Emphasis
- Semi Bold (600): Subheadings, labels
- Bold (700): Headings, important text
- Extra Bold (800): Major headings
- Black (900): Hero text, impact

#### Secondary Font - Quicksand
```
Font Family: 'Quicksand', sans-serif
Available Weights: 400, 600, 700
Google Fonts: https://fonts.google.com/specimen/Quicksand

Usage:
- Main headings (H1-H6)
- Special titles
- Display text
- Logo text
```

### Font Size Scale

#### Desktop Sizes
```
Hero Title:     60px (3.75rem)
H1:             40px (2.5rem)
H2:             35px (2.1875rem)
H3:             25px (1.5625rem)
H4:             20px (1.25rem)
H5:             18px (1.125rem)
H6:             16px (1rem)

Body Large:     18px (1.125rem)
Body Base:      16px (1rem)
Body Small:     14px (0.875rem)
Caption:        13px (0.8125rem)
Tiny:           12px (0.75rem)
```

#### Mobile Sizes
```
Hero Title:     40px (2.5rem)
H1:             28px (1.75rem)
H2:             24px (1.5rem)
H3:             20px (1.25rem)
H4:             18px (1.125rem)
H5:             16px (1rem)
H6:             14px (0.875rem)

Body Base:      16px (1rem)
Body Small:     14px (0.875rem)
Caption:        13px (0.8125rem)
```

### Line Heights
```
Tight:          1.2 (Headings)
Normal:         1.5 (Body text)
Relaxed:        1.65 (Long content)
Loose:          2.0 (Special spacing)
```

### Letter Spacing
```
Tight:          -0.5px (Large headings)
Normal:         0px (Default)
Wide:           0.5px (Uppercase text)
Wider:          1px (Button text)
```

---

## 📏 SPACING SYSTEM

### Base Unit: 5px

```
┌────────────────────────────────────┐
│  Spacing Scale (Based on 5px)     │
├────────────────────────────────────┤
│  xs:     5px   (1 unit)           │
│  sm:    10px   (2 units)          │
│  md:    15px   (3 units)          │
│  lg:    20px   (4 units)          │
│  xl:    30px   (6 units)          │
│  2xl:   40px   (8 units)          │
│  3xl:   50px   (10 units)         │
│  4xl:   60px   (12 units)         │
│  5xl:   80px   (16 units)         │
│  6xl:  100px   (20 units)         │
└────────────────────────────────────┘
```

### Section Padding
```
Desktop: 60px top/bottom
Mobile:  40px top/bottom
Container: 15px left/right
```

### Component Spacing
```
Card Padding:       15px
Button Padding:     12px 30px
Input Padding:      10px 15px
Modal Padding:      20px
```

---

## 🔲 BORDER RADIUS SYSTEM

```
┌────────────────────────────────────┐
│  Border Radius Scale               │
├────────────────────────────────────┤
│  sm:     5px   (Small elements)   │
│  md:    10px   (Buttons, cards)   │
│  lg:    15px   (Larger cards)     │
│  xl:    20px   (Hero sections)    │
│  2xl:   25px   (Special sections) │
│  full:  50%    (Circles)          │
│  pill:  50px   (Pill buttons)     │
└────────────────────────────────────┘
```

**Usage Examples:**
- Buttons: 10px
- Small cards: 10px
- Regular cards: 15px
- Large cards: 20px
- Modal: 15px-20px
- Images: 10px-15px
- Avatar: 50% (circle)

---

## 🌓 SHADOW SYSTEM

### Box Shadow Scale

#### Light Shadow (Subtle)
```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```
**Usage:** Hover states, subtle elevation

#### Medium Shadow (Default)
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```
**Usage:** Cards, dropdowns

#### Large Shadow (Prominent)
```css
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
```
**Usage:** Modals, popovers

#### Extra Large Shadow (Dramatic)
```css
box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
```
**Usage:** Hero elements, floating elements

### Specific Shadows

#### Card Shadow
```css
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
```

#### Hover Shadow
```css
box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
```

#### Dropdown Shadow
```css
box-shadow: 0 0px 4px 0px rgba(0, 0, 0, 0.25);
```

---

## 🎯 BUTTON STYLES

### Primary Button (Blue)
```css
.btn-primary {
  background: linear-gradient(180deg, #0057B8 0%, #003D82 100%);
  color: #FFFFFF;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 6px rgba(0,87,184,0.2);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(180deg, #0066D4 0%, #004999 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,87,184,0.3);
}
```

### Secondary Button (Orange)
```css
.btn-secondary {
  background: linear-gradient(180deg, #FF8C00 0%, #FF6B00 100%);
  color: #FFFFFF;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 6px rgba(255,140,0,0.2);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: linear-gradient(180deg, #FFA500 0%, #FF8000 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255,140,0,0.3);
}
```

### Outline Button
```css
.btn-outline {
  background: transparent;
  color: #0057B8;
  border: 2px solid #0057B8;
  padding: 10px 28px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #0057B8;
  color: #FFFFFF;
}
```

### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: #1C274C;
  border: none;
  padding: 12px 30px;
  transition: background 0.3s ease;
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

### Button Sizes
```css
/* Small */
.btn-sm {
  padding: 8px 20px;
  font-size: 14px;
}

/* Medium (Default) */
.btn-md {
  padding: 12px 30px;
  font-size: 16px;
}

/* Large */
.btn-lg {
  padding: 15px 40px;
  font-size: 18px;
}
```

---

## 📦 CARD STYLES

### Standard Card
```css
.card {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
}
```

### Image Card
```css
.card-image {
  /* Base card styles */
  padding: 0; /* No padding for image cards */
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-image:hover img {
  transform: scale(1.1);
}

.card-image-content {
  padding: 15px;
}
```

### Featured Card
```css
.card-featured {
  /* Base card styles */
  border: 2px solid #F37435;
  box-shadow: 0 5px 15px rgba(243, 116, 53, 0.3);
}

.card-featured::before {
  content: "Featured";
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(180deg, 
    rgba(252, 165, 26, 0.70) 0%, 
    rgba(255, 88, 14, 0.70) 100%
  );
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
}
```

---

## 📝 FORM STYLES

### Input Fields
```css
.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #EBEEF0;
  border-radius: 10px;
  font-size: 16px;
  color: #1C274C;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #F37435;
  box-shadow: 0 0 0 3px rgba(243, 116, 53, 0.1);
}

.form-control::placeholder {
  color: #999;
  font-size: 14px;
}
```

### Select Dropdown
```css
.form-select {
  /* Same as form-control */
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Custom arrow */
  background-position: right 15px center;
  background-repeat: no-repeat;
  padding-right: 40px;
}
```

### Textarea
```css
.form-textarea {
  /* Same as form-control */
  min-height: 120px;
  resize: vertical;
}
```

### Error State
```css
.form-control.error {
  border-color: #FF0303;
}

.error-message {
  color: #FF0303;
  font-size: 12px;
  margin-top: 5px;
  font-style: italic;
}
```

### Success State
```css
.form-control.success {
  border-color: #00B976;
}
```

---

## 🎭 ANIMATION & TRANSITIONS

### Duration Scale
```css
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;
--duration-slower: 0.75s;
--duration-slowest: 1s;
```

### Easing Functions
```css
--ease-default: ease;
--ease-in: ease-in;
--ease-out: ease-out;
--ease-in-out: ease-in-out;
--ease-smooth: cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Common Transitions
```css
/* Hover transition */
transition: all 0.3s ease;

/* Transform transition */
transition: transform 0.3s ease;

/* Color transition */
transition: color 0.3s ease, background-color 0.3s ease;

/* Multiple properties */
transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
```

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease;
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.5s ease;
}
```

#### Bounce
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 1.5s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Extra Small (Portrait phones) */
@media (max-width: 393px) { }

/* Small (Landscape phones) */
@media (max-width: 480px) { }

/* Medium (Tablets) */
@media (max-width: 600px) { }

/* Large Tablets */
@media (max-width: 821px) { }

/* Small Desktop */
@media (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1200px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### Container Widths
```css
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

@media (min-width: 576px) {
  .container { max-width: 540px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}

@media (min-width: 1200px) {
  .container { max-width: 1200px; }
}
```

---

## 🎨 ICON SYSTEM

### Icon Sizes
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
--icon-2xl: 48px;
--icon-3xl: 64px;
```

### Icon Colors
```css
.icon-primary { color: #F37435; }
.icon-secondary { color: #70B54B; }
.icon-dark { color: #1C274C; }
.icon-gray { color: #797979; }
.icon-white { color: #FFFFFF; }
```

### Font Awesome Integration
```html
<!-- Primary icon -->
<i class="fa-solid fa-heart icon-primary icon-md"></i>

<!-- Secondary icon -->
<i class="fa-brands fa-facebook icon-secondary icon-lg"></i>

<!-- Icon with background -->
<span class="icon-wrapper">
  <i class="fa-solid fa-check"></i>
</span>
```

---

## ✅ COMPONENT CHECKLIST

### Các component cần thiết

- [x] Navigation (Desktop + Mobile)
- [x] Footer
- [x] Buttons (Primary, Secondary, Outline, Ghost)
- [x] Cards (Standard, Image, Featured)
- [x] Forms (Input, Select, Textarea, Checkbox, Radio)
- [x] Modals
- [x] Alerts (Success, Error, Warning, Info)
- [x] Breadcrumbs
- [x] Pagination
- [x] Tabs
- [x] Accordion
- [x] Sliders/Carousels
- [x] Lightbox/Gallery
- [x] Search Box
- [x] Dropdown Menu
- [x] Badge/Tag
- [x] Avatar
- [x] Progress Bar
- [x] Loading Spinner
- [x] Tooltips
- [x] Social Icons

---

## 📐 GRID SYSTEM

### Bootstrap Grid
```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Content -->
    </div>
  </div>
</div>
```

### Custom Grid
```css
.grid {
  display: grid;
  gap: 20px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## 🌐 ACCESSIBILITY

### Color Contrast Ratios

```
Text on White Background:
- #1C274C: AAA (13.8:1)
- #797979: AA (4.6:1)
- #F37435: AA Large (3.3:1)

Text on Dark Background (#1C274C):
- #FFFFFF: AAA (13.8:1)
- #F37435: AA Large (4.2:1)
```

### ARIA Labels
```html
<!-- Button -->
<button aria-label="Close modal">
  <i class="fa-times"></i>
</button>

<!-- Link -->
<a href="#" aria-label="Read more about NovaEdu">
  Xem thêm
</a>

<!-- Form -->
<input type="text" 
       id="name" 
       aria-required="true"
       aria-describedby="name-error">
<span id="name-error" role="alert">
  Vui lòng nhập tên
</span>
```

### Focus States
```css
*:focus {
  outline: 2px solid #F37435;
  outline-offset: 2px;
}

button:focus,
a:focus,
input:focus {
  box-shadow: 0 0 0 3px rgba(243, 116, 53, 0.3);
}
```

---

**Ngày tạo**: ${new Date().toLocaleDateString('vi-VN')}
**Version**: 1.0
**Tác giả**: AI Assistant

