import { useLanguage } from '../../i18n/config.jsx'
import { motion } from 'framer-motion'

const PartnersSection = () => {
  const { t, language } = useLanguage()

  // Lấy logo đối tác từ web gốc
  const partners = [
    {
      id: 1,
      name: 'Đại học Cần Thơ',
      logo: 'https://novaedu.vn/uploads/partners/1698231600_logo-dai-hoc-mo-ha-noi-inkythuatso-01-23-08-58-23.jpg',
      url: 'https://www.ctu.edu.vn/'
    },
    {
      id: 2,
      name: 'Đại học An Giang',
      logo: 'https://novaedu.vn/uploads/partners/1698208606_partner7.jpg',
      url: 'https://www.agu.edu.vn/'
    },
    {
      id: 3,
      name: 'Bộ Giáo dục và Đào tạo',
      logo: 'https://novaedu.vn/uploads/partners/1698231450_bo-giao-duc-va-dao-tao-tiep-tuc-xay-dung-va-hoan-thien-co-so-du-lieu-nganh-giao-duc.jpg',
      url: 'https://moet.gov.vn/'
    },
    {
      id: 4,
      name: 'Tập đoàn Hòa Bình',
      logo: 'https://novaedu.vn/uploads/partners/1698208735_partner6.png',
      url: 'https://hbcg.vn/'
    },
    {
      id: 5,
      name: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      logo: 'https://novaedu.vn/uploads/partners/1698208783_partner3.jpg',
      url: 'https://hubt.edu.vn/'
    },
    {
      id: 6,
      name: 'Đại học Kinh tế Quốc dân',
      logo: 'https://novaedu.vn/uploads/partners/1698208898_partner10.png',
      url: 'https://www.neu.edu.vn/'
    },
    {
      id: 7,
      name: 'Học viện Ngoại giao',
      logo: 'https://novaedu.vn/uploads/partners/1698208947_partner9.png',
      url: 'https://www.dav.edu.vn/'
    },
    {
      id: 8,
      name: 'Học viện Ngân hàng',
      logo: 'https://novaedu.vn/uploads/partners/1698209011_Logo%20HVNH.png',
      url: 'https://www.hvnh.edu.vn/'
    },
    {
      id: 9,
      name: 'ĐH Sư phạm Kỹ thuật TP.HCM',
      logo: 'https://novaedu.vn/uploads/partners/1698231050_1200px-hcmute.svg.png',
      url: 'https://hcmute.edu.vn/'
    },
  ]

  return (
    <section className="section-padding" style={{ 
      background: 'linear-gradient(184deg, rgba(255, 255, 255, 0.00) 5.98%, rgba(0, 87, 184, 0.07) 25.31%, rgba(255, 140, 0, 0.07) 58.58%, rgba(248, 248, 248, 0.23) 96.97%)'
    }}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-heading font-bold">
            {language === 'vi' ? 'ĐỐI TÁC TIÊU BIỂU CỦA' : 'STRATEGIC PARTNERS OF'}{' '}
            <span className="text-mekong-blue">HAPPY</span>{' '}
            <span className="text-sunrise-orange">WORLD</span>{' '}
            <span className="text-rice-green">MEKONG</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 flex items-center justify-center transition-transform"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-auto max-h-20 object-contain"
                title={partner.name}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection

