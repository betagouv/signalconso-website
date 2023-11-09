import {Panel, PanelBody} from '@/components_simple/Panel'
import {useI18n} from '@/i18n/I18n'
import {Txt} from '../../../components_simple/Txt'
import {Animate} from '@/components_simple/Animate'
import {ReactNode, useState} from 'react'
import {AccordionInline} from '@/components_simple/AccordionInline'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'

export enum IsForeignCompany {
  Yes = 'Yes',
  No = 'No',
  Unknown = 'Unknown',
}

interface Props {
  children: (_: IsForeignCompany) => ReactNode
}

export const CompanyAskIsForeign = ({children}: Props) => {
  const {m} = useI18n()
  const [isForeignCompany, setIsForeignCompany] = useState<IsForeignCompany | undefined>()
  return (
    <>
      <Animate>
        <Panel>
          <PanelBody>
            <ScRadioButtons
              required
              titleNoAutoAsterisk
              value={isForeignCompany}
              onChange={setIsForeignCompany}
              title={m.isAFrenchCompany}
              options={[
                {
                  label: m.yes,
                  value: IsForeignCompany.Yes,
                },
                {
                  label: m.noItsForeign,
                  value: IsForeignCompany.No,
                  description: (
                    <AccordionInline label={m.companyHowToFindCountry}>
                      <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}} />
                    </AccordionInline>
                  ),
                },
                {
                  label: m.iDontKnown,
                  value: IsForeignCompany.Unknown,
                },
              ]}
            />
          </PanelBody>
        </Panel>
      </Animate>
      {isForeignCompany && children(isForeignCompany)}
    </>
  )
}
