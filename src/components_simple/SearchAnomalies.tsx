import React, {useRef, useState} from 'react'
import {Anomaly} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'
import {AppLangs} from '../i18n/localization/AppLangs'
import {AnomalyTile} from './AnomalyTile'
import {TranslatedWebsiteAlert} from './bigBanners/TranslatedWebsiteAlert'

type SearchBarProps = {
  anomalies: Anomaly[]
}

const SearchAnomalies: React.FC<SearchBarProps> = ({anomalies}) => {
  const i18n = useI18n()

  return (
    <>
      <h2>{i18n.m.searchAnomalies.title}</h2>
      {i18n.currentLang === AppLangs.en && <TranslatedWebsiteAlert />}
      
      <div className="fr-container--fluid">
        <div className="fr-grid-row fr-grid-row--gutters">
          {anomalies.map(a => (
            <div key={a.id} className="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-xl-3">
              <AnomalyTile anomaly={a} />
            </div>
          ))}
        </div>
      </div>

      {anomalies.length === 0 && (
        <div className="fr-callout ">
          <h3 className="fr-callout__title">{i18n.m.searchAnomalies.noResultFound}</h3>
          <p className="fr-callout__text">{i18n.m.searchAnomalies.tryAnotherKeyword}</p>
        </div>
      )}
    </>
  )
}

export default SearchAnomalies
