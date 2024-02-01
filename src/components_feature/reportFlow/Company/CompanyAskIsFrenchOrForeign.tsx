import {AccordionInline} from '@/components_simple/AccordionInline'
import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'

export enum IsAFrenchCompany {
  Yes = 'Yes',
  No = 'No',
  Unknown = 'Unknown',
}

interface Props {
  children: (_: IsAFrenchCompany) => ReactNode
}

export const CompanyAskIsFrenchOrForeign = ({children}: Props) => {
  const {m} = useI18n()
  const [isAFrenchCompany, setIsAFrenchCompany] = useState<IsAFrenchCompany | undefined>()
  return (
    <>
      <Animate>
        <div>
          <div>
            <ScRadioButtons
              required
              titleNoAutoAsterisk
              value={isAFrenchCompany}
              onChange={setIsAFrenchCompany}
              title={m.isAFrenchCompany}
              options={[
                {
                  label: m.yes,
                  value: IsAFrenchCompany.Yes,
                },
                {
                  label: m.noItsForeign,
                  value: IsAFrenchCompany.No,
                  description: (
                    <AccordionInline label={m.companyHowToFindCountry}>
                      <p
                        className="mb-0 text-sm text-gray-600 pt-2 px-1"
                        dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}}
                      />
                    </AccordionInline>
                  ),
                },
                {
                  label: m.iDontKnown,
                  value: IsAFrenchCompany.Unknown,
                },
              ]}
            />
          </div>
        </div>
      </Animate>
      {isAFrenchCompany && children(isAFrenchCompany)}
    </>
  )
}
