import {Panel, PanelBody} from 'shared/Panel/Panel'
import {useI18n} from 'core/i18n'
import {ScRadioGroup, ScRadioGroupItem} from 'shared/RadioGroup'
import {Txt} from '../../../alexlibs/mui-extension'
import {Animate} from 'shared/Animate/Animate'
import {ReactNode, useState} from 'react'
import {AccordionInline} from 'shared/AccordionInline/AccordionInline'

export enum IsForeignCompany {
  Yes = 'Yes',
  No = 'No',
  Unknown = 'Unknown',
}

interface Props {
  value?: IsForeignCompany
  children: (_: IsForeignCompany) => ReactNode
}

export const CompanyAskIsForeign = ({value, children}: Props) => {
  const {m} = useI18n()
  const [isForeignCompany, setIsForeignCompany] = useState<IsForeignCompany | undefined>()
  return (
    <>
      <Animate>
        <Panel title={m.isAFrenchCompany} id="CompanyAskIsForeign">
          <PanelBody>
            <ScRadioGroup value={value} onChange={setIsForeignCompany}>
              <ScRadioGroupItem value={IsForeignCompany.Yes} title={m.yes} />
              <ScRadioGroupItem
                value={IsForeignCompany.No}
                title={m.noItsForeign}
                description={
                  <AccordionInline label={m.companyHowToFindCountry} onClick={e => e.stopPropagation()}>
                    <Txt color="hint" size="small" dangerouslySetInnerHTML={{__html: m.howToFindCompanyCountryDesc}} />
                  </AccordionInline>
                }
              />
              <ScRadioGroupItem value={IsForeignCompany.Unknown} title={m.iDontKnown} />
            </ScRadioGroup>
          </PanelBody>
        </Panel>
      </Animate>
      {isForeignCompany && children(isForeignCompany)}
    </>
  )
}
