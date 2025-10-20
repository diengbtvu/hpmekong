// Simple toast notification system
class Toast {
  constructor() {
    this.container = null
    this.init()
  }

  init() {
    if (typeof window === 'undefined') return
    
    this.container = document.createElement('div')
    this.container.id = 'toast-container'
    this.container.className = 'fixed top-4 right-4 z-[100] space-y-2'
    document.body.appendChild(this.container)
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div')
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    }
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    }

    // Handle message as string or array
    let messageHtml = ''
    if (Array.isArray(message)) {
      messageHtml = `
        <div class="flex-1">
          <div class="font-semibold mb-1">${message[0]}</div>
          ${message.length > 1 ? `
            <ul class="text-sm space-y-1 mt-2">
              ${message.slice(1).map(msg => `<li>• ${msg}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `
    } else {
      messageHtml = `<span class="flex-1">${message}</span>`
    }

    toast.className = `${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-start gap-3 min-w-[300px] max-w-[500px] animate-slide-in`
    toast.innerHTML = `
      <i class="fas ${icons[type]} mt-0.5"></i>
      ${messageHtml}
      <button onclick="this.parentElement.remove()" class="hover:opacity-75">
        <i class="fas fa-times"></i>
      </button>
    `

    this.container.appendChild(toast)

    setTimeout(() => {
      toast.classList.add('animate-slide-out')
      setTimeout(() => toast.remove(), 300)
    }, duration)
  }

  success(message, duration) {
    this.show(message, 'success', duration)
  }

  error(message, duration) {
    this.show(message, 'error', duration)
  }

  warning(message, duration) {
    this.show(message, 'warning', duration)
  }

  info(message, duration) {
    this.show(message, 'info', duration)
  }
}

export const toast = new Toast()
export default toast

