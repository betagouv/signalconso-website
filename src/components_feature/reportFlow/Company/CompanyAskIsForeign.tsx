import {AccordionInline} from '@/components_simple/AccordionInline'
import {Animate} from '@/components_simple/Animate'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useState} from 'react'
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
        <div>
          <div>
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
                      <p
                        className="mb-0 text-sm text-gray-600 pt-2 px-1"
                        dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}}
                      />
                    </AccordionInline>
                  ),
                },
                {
                  label: m.iDontKnown,
                  value: IsForeignCompany.Unknown,
                },
              ]}
            />
          </div>
        </div>
      </Animate>
      {isForeignCompany && children(isForeignCompany)}
    </>
  )
}
