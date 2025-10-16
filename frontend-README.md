# 🎨 Happy World Mekong - Frontend

React.js Frontend cho nền tảng giáo dục Happy World Mekong

---

## 📋 Yêu cầu

- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0

---

## 🛠️ Cài đặt & Chạy

### 1. Install Dependencies

```bash
cd frontend
npm install
# hoặc
yarn install
```

### 2. Environment Variables

Tạo file `.env`:
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Happy World Mekong
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
VITE_GTM_ID=GTM-XXXXXXX
```

### 3. Run Development Server

```bash
npm run dev
# hoặc
yarn dev
```

App sẽ chạy tại: `http://localhost:5173`

---

## 📁 Cấu trúc Project

```
frontend/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── favicon.ico
│   │   └── ...
│   └── locales/          # i18n translations
│       ├── vi/
│       └── en/
│
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── index.css
│   │   │   └── tailwind.css
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/       # Shared components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ...
│   │   ├── home/         # Home page components
│   │   ├── courses/      # Course components
│   │   ├── instructors/  # Instructor components
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Instructors.jsx
│   │   ├── News.jsx
│   │   ├── NewsDetail.jsx
│   │   ├── Ecosystem.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── services/
│   │   ├── api.js            # Axios instance
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── userService.js
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCourses.js
│   │   ├── useInstructors.js
│   │   └── ...
│   │
│   ├── store/
│   │   ├── authStore.js      # Zustand stores
│   │   ├── courseStore.js
│   │   └── uiStore.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
│
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🎨 Styling

### Tailwind CSS + Custom CSS

```jsx
// Component example
import { motion } from 'framer-motion';

function CourseCard({ course }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl 
                 transition-shadow duration-300 overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <img 
        src={course.image} 
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐ {course.rating}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({course.reviews} đánh giá)
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {course.price.toLocaleString()}đ
          </span>
          <button className="btn-primary">
            Đăng ký
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

---

## 🧩 Components

### Button Component
```jsx
// src/components/common/Button.jsx
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-b from-[#0057B8] to-[#003D82] text-white',
    secondary: 'bg-gradient-to-b from-[#FF8C00] to-[#FF6B00] text-white',
    outline: 'border-2 border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8] hover:text-white'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`
        rounded-lg font-semibold transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-lg
        ${variants[variant]}
        ${sizes[size]}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## 🔄 State Management

### Zustand Store Example

```javascript
// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      updateProfile: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

---

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
# Output: dist/
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📚 Libraries

### Core
- **React**: ^18.2.0
- **React Router**: ^6.20.0
- **Axios**: ^1.6.2
- **React Query**: ^5.12.2

### UI
- **Tailwind CSS**: ^3.4.0
- **Framer Motion**: ^10.16.16
- **React Icons**: ^4.12.0
- **Swiper**: ^11.0.5
- **React Slick**: ^0.29.0

### Forms
- **React Hook Form**: ^7.49.2
- **Zod**: ^3.22.4

### State
- **Zustand**: ^4.4.7

### Utils
- **date-fns**: ^3.0.6
- **clsx**: ^2.0.0

---

## 🎨 Design Tokens

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'mekong-blue': '#0057B8',
        'sunrise-orange': '#FF8C00',
        'rice-green': '#3E8E41',
        'blue-dark': '#003D82',
        'orange-dark': '#FF6B00',
        'green-dark': '#2D6A2F',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 10px rgba(0, 0, 0, 0.2)',
        'hover': '0 5px 20px rgba(0, 0, 0, 0.25)',
      }
    }
  }
}
```

---

## 📞 Support

- Email: dev@happyworldmekong.com
- Slack: #frontend-team

---

**Version**: 1.0.0  
**Last Updated**: ${new Date().toLocaleDateString('vi-VN')}

