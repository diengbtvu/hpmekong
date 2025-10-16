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
          </Routes>
        </Router>
      </QueryClientProvider>
    </LanguageProvider>
  )
}

export default App

