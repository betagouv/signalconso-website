import React, {useEffect} from 'react'
import {Box} from '@mui/material'
import {useAnalyticContext} from '../analytic/AnalyticContext'
import {ConsumerShareReviewEventActions, EventCategories} from '../analytic/analytic'

const ServicePublicShareButton = () => {
  const _analytic = useAnalyticContext()
  return (
    <Box
      component="a"
      onClick={() => _analytic.trackEvent(EventCategories.consumerReview, ConsumerShareReviewEventActions.servicePublicPlus)}
      href="https://monavis.numerique.gouv.fr/Demarches/2071?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=5a58254dab900906fe4924e37c1c5bba"
    >
      <Box
        component="img"
        sx={{
          mb: 1,
          height: 40,
          width: 100,
        }}
        src="https://monavis.numerique.gouv.fr/monavis-static/bouton-bleu.png"
        alt="Je donne mon avis sur voxusagers.gouv.fr"
        title="Je donne mon avis sur cette démarche"
      />
    </Box>
  )
}

export default ServicePublicShareButton
