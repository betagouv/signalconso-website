'use client'

import ReactDOM from 'react-dom/client'

export function PreloadResources() {
  const head = ReactDOM.createRoot(document.head)

  head.render(<link rel="preconnect" href="https://fonts.googleapis.com" />)
  head.render(<link rel="preconnect" href="https://fonts.gstatic.com" />)

  return null
}
