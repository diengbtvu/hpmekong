// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hwm.edu.vn/api'

// App Info
export const APP_NAME = 'Happy World Mekong'
export const APP_SLOGAN = 'Giáo dục từ miền Tây - Phát triển nguồn nhân lực Đồng bằng sông Cửu Long'

// Brand Colors
export const COLORS = {
  MEKONG_BLUE: '#0057B8',
  SUNRISE_ORANGE: '#FF8C00',
  RICE_GREEN: '#3E8E41',
  BLUE_DARK: '#003D82',
  ORANGE_DARK: '#FF6B00',
  GREEN_DARK: '#2D6A2F',
}

// 9 Centers Ecosystem
export const CENTERS = [
  {
    id: 1,
    name: 'Mekong Skills Pro',
    slug: 'skills-pro',
    description: 'Chương trình đào tạo kỹ năng chuyên sâu',
    color: '#0057B8',
    icon: 'fa-graduation-cap',
    url: 'https://skillspro.happyworldmekong.com',
  },
  {
    id: 2,
    name: 'Mekong Career Guide',
    slug: 'career-guide',
    description: 'Hệ thống hướng nghiệp online',
    color: '#FF8C00',
    icon: 'fa-compass',
    url: 'https://careerguide.happyworldmekong.com',
  },
  {
    id: 3,
    name: 'Mekong Boss',
    slug: 'boss',
    description: 'Đào tạo doanh nhân & khởi nghiệp',
    color: '#D4AF37',
    icon: 'fa-briefcase',
    url: 'https://boss.happyworldmekong.com',
  },
  {
    id: 4,
    name: 'Mekong Teen',
    slug: 'teen',
    description: 'Giáo dục học sinh các cấp',
    color: '#E91E63',
    icon: 'fa-users',
    url: 'https://teen.happyworldmekong.com',
  },
  {
    id: 5,
    name: 'Mekong Book',
    slug: 'book',
    description: 'Xuất bản sách & tài liệu',
    color: '#E53935',
    icon: 'fa-book',
    url: 'https://book.happyworldmekong.com',
  },
  {
    id: 6,
    name: 'Mekong Job',
    slug: 'job',
    description: 'Nền tảng kết nối việc làm',
    color: '#3E8E41',
    icon: 'fa-suitcase',
    url: 'https://job.happyworldmekong.com',
  },
  {
    id: 7,
    name: 'Mekong Space',
    slug: 'space',
    description: 'Không gian học tập & coworking',
    color: '#8D6E63',
    icon: 'fa-building',
    url: 'https://space.happyworldmekong.com',
  },
  {
    id: 8,
    name: 'Mekong Agri Academy',
    slug: 'agri',
    description: 'Đào tạo nông nghiệp công nghệ cao',
    color: '#8BC34A',
    icon: 'fa-seedling',
    url: 'https://agri.happyworldmekong.com',
  },
  {
    id: 9,
    name: 'Mekong Innovation Hub',
    slug: 'innovation',
    description: 'Trung tâm đổi mới sáng tạo',
    color: 'linear-gradient(135deg, #0057B8 0%, #FF8C00 50%, #3E8E41 100%)',
    icon: 'fa-rocket',
    url: 'https://innovation.happyworldmekong.com',
  },
]

// Navigation Menu
export const NAV_MENU = [
  {
    nameKey: 'common.home',
    path: '/',
    icon: 'fa-house',
  },
  {
    nameKey: 'common.about',
    path: '/about',
    icon: 'fa-circle-info',
  },
  {
    nameKey: 'common.ecosystem',
    path: '/ecosystem',
    icon: 'fa-sitemap',
    children: CENTERS.map(c => ({
      name: c.name,
      path: c.url,
      external: true,
    })),
  },
  {
    nameKey: 'common.courses',
    path: '/courses',
    icon: 'fa-book-open',
  },
  {
    nameKey: 'common.instructors',
    path: '/instructors',
    icon: 'fa-chalkboard-user',
  },
  {
    nameKey: 'common.news',
    path: '/news',
    icon: 'fa-newspaper',
    children: [
      { nameKey: 'news.activities', path: '/news?category=activities' },
      { nameKey: 'news.recruitment', path: '/news?category=recruitment' },
    ],
  },
  {
    nameKey: 'common.books',
    path: 'https://book.happyworldmekong.com',
    icon: 'fa-book',
    external: true,
  },
  {
    nameKey: 'common.library',
    path: '/gallery',
    icon: 'fa-images',
    children: [
      { nameKey: 'gallery.photos', path: '/gallery/photos' },
      { nameKey: 'gallery.videos', path: '/gallery/videos' },
      { nameKey: 'gallery.documents', path: '/gallery/documents' },
    ],
  },
  {
    nameKey: 'common.contact',
    path: '/contact',
    icon: 'fa-envelope',
  },
]

// Social Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/happyworldmekong',
  youtube: 'https://youtube.com/@happyworldmekong',
  instagram: 'https://instagram.com/happyworldmekong',
  tiktok: 'https://tiktok.com/@happyworldmekong',
  zalo: 'https://zalo.me/happyworldmekong',
}

// Contact Info
export const CONTACT_INFO = {
  address: 'Số 99, Đường Phạm Ngũ Lão, phường Trà Vình, tỉnh Vĩnh Long',
  email: 'Happyworldesj@gmail.com',
  hotline: '0123 456 789',
  website: 'https://hwm.edu.vn',
  workingHours: 'T2 - T6: 8:00 - 17:30, T7: 8:00 - 12:00',
}

// Stats for Homepage Counter
export const STATS = [
  {
    icon: 'fa-users',
    count: 100000,
    suffix: '+',
    label: 'Học viên đã đào tạo',
    color: 'text-mekong-blue',
  },
  {
    icon: 'fa-book-open',
    count: 150,
    suffix: '+',
    label: 'Khóa học chất lượng',
    color: 'text-sunrise-orange',
  },
  {
    icon: 'fa-chalkboard-user',
    count: 200,
    suffix: '+',
    label: 'Giảng viên & Chuyên gia',
    color: 'text-rice-green',
  },
  {
    icon: 'fa-handshake',
    count: 50,
    suffix: '+',
    label: 'Đối tác chiến lược',
    color: 'text-mekong-blue',
  },
]

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'Cơ bản',
  INTERMEDIATE: 'Trung cấp',
  ADVANCED: 'Nâng cao',
  EXPERT: 'Chuyên gia',
}

// Course Types
export const COURSE_TYPES = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  HYBRID: 'Kết hợp',
}

