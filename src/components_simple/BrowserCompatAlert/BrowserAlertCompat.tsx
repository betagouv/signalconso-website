import React, {useEffect, useState} from 'react'

export const BrowserCompatAlert = () => {
  const [browserCompatMessage, setBrowserCompatMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isFirefox = /Firefox/i.test(userAgent)
    let firefoxVersion = null

    if (isFirefox) {
      const match = userAgent.match(/Firefox\/(\d+)/)
      if (match && match.length >= 2) {
        firefoxVersion = parseInt(match[1], 10)
        if (isFirefox && firefoxVersion && firefoxVersion < 152) {
          setBrowserCompatMessage(
            'Please note that this website may not be fully compatible with your current Firefox browser. We recommend upgrading to a newer version for a better experience.',
          )
        }
      }
    } else if (isChrome) {
      // Implement
    } else if (isEdge) {
      // Implement
    } else if (safari) {
      // Implement
    }
  }, [browserCompatMessage])

  console.log(browserCompatMessage)

  return browserCompatMessage ? (
    <div className="alert alert-warning" role="alert">
      <p>{browserCompatMessage}</p>
    </div>
  ) : (
    <></>
  )
}
