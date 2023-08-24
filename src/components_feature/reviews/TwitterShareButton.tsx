import React, {useEffect} from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {ConsumerShareReviewEventActions, EventCategories} from '../../analytic/analytic'

const TwitterShareButton = () => {
  const _analytic = useAnalyticContext()
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.charset = 'utf-8'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div id="twitter-share-button-container" style={{marginRight: 10}}>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        onClick={() => _analytic.trackEvent(EventCategories.consumerReview, ConsumerShareReviewEventActions.twitter)}
        className="twitter-share-button"
        data-size="large"
        data-text="Merci à @SignalConso @Dgccrf de m&#39;avoir aidé à résoudre mon litige !"
        data-url=" "
        data-lang="fr"
        data-show-count="false"
      >
        Tweet
      </a>
    </div>
  )
}

export default TwitterShareButton
