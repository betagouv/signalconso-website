import React from 'react'
import {useAnalyticContext} from '../../analytic/AnalyticContext'
import {ConsumerShareReviewEventActions, EventCategories} from '../../analytic/analytic'
import Image from 'next/image'
import imgJedonnemonavis from '@/img/avis/jedonnemonavisbutton.png'

const ServicePublicShareButton = () => {
  const _analytic = useAnalyticContext()
  const s = {
    '--underline-img': 'none',
  } as React.CSSProperties

  return (
    <a
      style={s}
      onClick={() => _analytic.trackEvent(EventCategories.consumerReview, ConsumerShareReviewEventActions.servicePublicPlus)}
      href="https://monavis.numerique.gouv.fr/Demarches/2071?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=5a58254dab900906fe4924e37c1c5bba"
    >
      <Image
        src={imgJedonnemonavis}
        alt="Je donne mon avis sur voxusagers.gouv.fr"
        title="Je donne mon avis sur cette démarche"
        height={40}
        width={100}
      />
    </a>
  )
}

export default ServicePublicShareButton
