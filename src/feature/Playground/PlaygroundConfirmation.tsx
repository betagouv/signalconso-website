import {useTheme} from '@mui/material'
import {ReportStep} from 'core/reportStep'
import {styleUtils} from 'core/theme/theme'
import {ReportDraft} from '../../client/report/ReportDraft'
import {Fixture} from '../../test/fixture'
import {_Confirmation} from '../Report/Confirmation/Confirmation'

export const PlaygroundConfirmation = () => {
  const draft = Fixture.genDraftReport(ReportStep.Confirmation) as ReportDraft
  const theme = useTheme()
  return (
    <>
      <div>
        <b>{draft.category}</b>
      </div>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(draft, undefined, 2)}</pre>
      <_Confirmation
        draft={{
          ...draft,
          // companyKind: CompanyKinds.LOCATION
        }}
      />
    </>
  )
}
