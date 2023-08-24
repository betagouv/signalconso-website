import {Txt} from 'alexlibs/Txt'
import {ContentPageContainer} from 'components_simple/PageContainers'
import ComputeWithdrawalPeriod from '../components_feature/ComputeWithdrawalPeriod'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLang} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLang): Metadata {
  const {messages: m} = getI18n(lang)

  return {
    title: m.titleAndDescriptions.delaiRetractation.title,
    description: m.titleAndDescriptions.delaiRetractation.description,
  }
}

export const DelaiDeRetractation = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{m.delaiRetractation.pageTitle}</h1>
        <section className="fr-pb-4w">
          <ComputeWithdrawalPeriod />
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">{m.delaiRetractation.startDateExplanationTitle}</h2>
          <table className="fr-table">
            <thead>
              <tr>
                <th>{m.delaiRetractation.contractTypeHeader}</th>
                <th>{m.delaiRetractation.dateToConsiderHeader}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{m.delaiRetractation.serviceContract}</td>
                <td>{m.delaiRetractation.contractConclusionDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.waterGasElectricityContract}</td>
                <td>{m.delaiRetractation.contractConclusionDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.deliveredProducts}</td>
                <td>{m.delaiRetractation.deliveryDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.deliveredProductsMultiplePackages}</td>
                <td>{m.delaiRetractation.receptionDateLastItem}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">{m.delaiRetractation.changeOfMindTitle}</h2>
          <p>{m.delaiRetractation.justificationNotRequired}</p>
          <p>
            {m.delaiRetractation.returnFormOrLetter}{' '}
            <span className="font-bold">{m.delaiRetractation.recommendedLetterWithAcknowledgment}</span>{' '}
            {m.delaiRetractation.withinFourteenDays}.
            <br />
            {m.delaiRetractation.canAlsoDoItOnline} {m.delaiRetractation.websiteRequirement}.
            <br />
            {m.delaiRetractation.reportingOnWebsiteNotSufficient}
          </p>
          <p>
            {m.delaiRetractation.keepDocumentation1}
            <br />
            {m.delaiRetractation.keepDocumentation2}
          </p>
          <p>
            {m.delaiRetractation.ifSellerDidNotInform}.
            <br />
            {m.delaiRetractation.extensionOfTwelveMonths}.
          </p>
        </section>
      </ContentPageContainer>
    </>
  )
}
