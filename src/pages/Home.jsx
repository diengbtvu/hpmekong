import React from 'react'
import { useLanguage } from '../i18n/config.jsx'
import HeroSection from '../components/home/HeroSection'
import EcosystemSection from '../components/home/EcosystemSection'
import AboutSection from '../components/home/AboutSection'
import StatsSection from '../components/home/StatsSection'
import AchievementsSection from '../components/home/AchievementsSection'
import VideosSection from '../components/home/VideosSection'
import FeaturedNewsSection from '../components/home/FeaturedNewsSection'
import PartnersSection from '../components/home/PartnersSection'

const Home = () => {
  const { t } = useLanguage()

  return (
    <div className="home-page">
      <HeroSection />
      <EcosystemSection />
      <AboutSection />
      <StatsSection />
      <AchievementsSection />
      <VideosSection />
      <FeaturedNewsSection />
      <PartnersSection />
    </div>
  )
}

export default Home

