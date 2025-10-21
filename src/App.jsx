import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LanguageProvider } from './i18n/config.jsx'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Ecosystem from './pages/Ecosystem'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Instructors from './pages/Instructors'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

// Admin imports
import AdminLayout from './layouts/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import BannerManagement from './pages/admin/BannerManagement'
import PartnerManagement from './pages/admin/PartnerManagement'
import AchievementManagement from './pages/admin/AchievementManagement'
import VideoManagement from './pages/admin/VideoManagement'
import SettingsManagement from './pages/admin/SettingsManagement'
import FooterManagement from './pages/admin/FooterManagement'
import AboutManagement from './pages/admin/AboutManagement'
import UserManagement from './pages/admin/UserManagement'
import CourseManagement from './pages/admin/CourseManagement'
import PostManagement from './pages/admin/PostManagement'
import InstructorManagement from './pages/admin/InstructorManagement'
import EnrollmentManagement from './pages/admin/EnrollmentManagement'
import PaymentManagement from './pages/admin/PaymentManagement'
import ContactManagement from './pages/admin/ContactManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import CenterManagement from './pages/admin/CenterManagement'
import MediaLibrary from './pages/admin/MediaLibrary'
import LeaderManagement from './pages/admin/LeaderManagement'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Auth Routes - Outside MainLayout for full-screen design */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="ecosystem" element={<Ecosystem />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:slug" element={<CourseDetail />} />
              <Route path="instructors" element={<Instructors />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              
              {/* Content Management Routes */}
              <Route path="content/banners" element={<BannerManagement />} />
              <Route path="content/partners" element={<PartnerManagement />} />
              <Route path="content/achievements" element={<AchievementManagement />} />
              <Route path="content/leaders" element={<LeaderManagement />} />
              <Route path="content/videos" element={<VideoManagement />} />
              <Route path="content/settings" element={<SettingsManagement />} />
              <Route path="content/footer" element={<FooterManagement />} />
              <Route path="content/about" element={<AboutManagement />} />
              <Route path="content/centers" element={<CenterManagement />} />
              
              {/* Learning Management Routes */}
              <Route path="learning/courses" element={<CourseManagement />} />
              <Route path="learning/instructors" element={<InstructorManagement />} />
              <Route path="learning/enrollments" element={<EnrollmentManagement />} />
              
              {/* Publishing Routes */}
              <Route path="publishing/posts" element={<PostManagement />} />
              <Route path="publishing/categories" element={<CategoryManagement />} />
              
              {/* Business Routes */}
              <Route path="business/payments" element={<PaymentManagement />} />
              <Route path="business/contacts" element={<ContactManagement />} />
              
              {/* User Routes */}
              <Route path="users" element={<UserManagement />} />
              
              {/* Media Routes */}
              <Route path="media" element={<MediaLibrary />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </LanguageProvider>
  )
}

export default App

