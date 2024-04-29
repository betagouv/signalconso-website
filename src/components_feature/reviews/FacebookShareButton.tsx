import React from 'react'
import {ConsumerShareReviewEventActions, EventCategories} from '../../analytic/analytic'
import {useAnalyticContext} from '../../analytic/AnalyticContext'

interface FacebookShareButtonProps {
  step: 'Reponse' | 'Engagement'
}

const FacebookShareButton = ({step}: FacebookShareButtonProps) => {
  const _analytic = useAnalyticContext()
  const url = 'https://www.facebook.com/SignalConso/reviews'

  const eventCategorie = step === 'Reponse' ? EventCategories.consumerReview : EventCategories.consumerEngagementReview

  return (
    <div>
      <a
        style={{
          background: '#0668E1',
          borderRadius: '20px',
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '0.9',
          outline: 'none',
          padding: '0.5em 0.75em',
          textDecoration: 'none',
          marginRight: '10px',
          display: 'flex',
        }}
        href={url}
        onClick={() => _analytic.trackEvent(eventCategorie, ConsumerShareReviewEventActions.facebook)}
        data-layout="button"
      >
        <svg
          viewBox="0 0 12 12"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '12px',
            height: '12px',
            fill: 'white',
            marginRight: '4px',
            verticalAlign: 'middle',
          }}
        >
          <path
            className="svg-icon-path"
            d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"
          ></path>
        </svg>
        <span>Partager</span>
      </a>
    </div>
  )
}

export default FacebookShareButton
