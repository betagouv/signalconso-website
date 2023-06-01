import React, {useEffect, useState} from 'react'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {useI18n} from '../../i18n/I18n'

export const BrowserCompatAlert = () => {
  const [displayBrowserCompatMessage, setDisplayBrowserCompatMessage] = useState<boolean>(false)
  const {m} = useI18n()
  useEffect(() => {
    const userAgent = navigator.userAgent
    const isFirefox = /Firefox/i.test(userAgent)
    const isChrome = /Chrome/i.test(userAgent)
    const isEdge = /Edg/i.test(userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent)
    const isOpera = /Opera|OPR/i.test(userAgent)
    let browserVersion = null

    if (
      (isFirefox && (browserVersion = getVersion(userAgent, /Firefox\/(\d+)/)) && browserVersion < 67) ||
      (isChrome && (browserVersion = getVersion(userAgent, /Chrome\/(\d+)/)) && browserVersion < 64) ||
      (isEdge && (browserVersion = getVersion(userAgent, /Edg\/(\d+)/)) && browserVersion < 79) ||
      (isSafari && (browserVersion = getVersion(userAgent, /Version\/(\d+)/)) && browserVersion < 12) ||
      (isOpera && (browserVersion = getVersion(userAgent, /OPR\/(\d+)/)) && browserVersion < 51)
    ) {
      setDisplayBrowserCompatMessage(true)
    }
  }, [])

  console.log(displayBrowserCompatMessage)

  return displayBrowserCompatMessage ? (
    <Alert description={m.browserCompatMessage} severity="warning" title="Information" className="fr-mt-4w" />
  ) : (
    <></>
  )
}

const getVersion = (userAgent: string, regex: RegExp) => {
  const match = userAgent.match(regex)
  return match && match.length >= 2 ? parseInt(match[1], 10) : null
}
