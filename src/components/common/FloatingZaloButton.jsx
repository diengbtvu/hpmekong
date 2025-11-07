import React from 'react'

const FloatingZaloButton = () => {
  return (
    <a
      href="https://zalo.me/0362294543"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group animate-bounce"
      aria-label="Liên hệ qua Zalo"
    >
      <div className="relative">
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
        
        {/* Main button */}
        <div className="relative bg-white rounded-full p-3 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 hover:animate-none">
          <img
            src="/zalo-logo.png"
            alt="Zalo"
            className="w-12 h-12 object-contain"
          />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
            Chat với chúng tôi qua Zalo
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default FloatingZaloButton

