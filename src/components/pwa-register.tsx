import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (
      'serviceWorker' in navigator &&
      window.location.hostname !== 'localhost'
    ) {
      const swUrl = '/service-worker.js'
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
