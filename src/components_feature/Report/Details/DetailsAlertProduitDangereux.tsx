import {Alert} from '../../../alexlibs/mui-extension'
import React from 'react'

export const DetailsAlertProduitDangereux = () => {
  return (
    <Alert type="info" gutterBottom>
      En cas d'une urgence vitale ou importante, appelez le <b>112</b>.
      <br />
      Si vous êtes blessé ou souffrant, appelez le Samu: <b>15</b>.
      <br />
      Si vous subissez ou vous avez subi une agression ou des violences, appelez Police Secours: <b>17</b>.
      <br />
      En cas d'incendie ou d'une fuite de gaz, appelez les pompiers: <b>18</b>.
      <br />
      Si vous êtes sourd ou malentendant, contactez le <b>114</b> par visiophonie, par chat, par SMS ou par FAX.
      <br />
      Ces numéros sont joignables 24H/24 et 7J/7.
      <br />
      <br />
      Plus d'informations sur
      <br />
      <a href="https://www.gouvernement.fr/risques/connaitre-les-numeros-d-urgence">
        https://www.gouvernement.fr/risques/connaitre-les-numeros-d-urgence
      </a>
    </Alert>
  )
}
