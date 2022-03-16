import {_Company} from '../Report/Company/Company'
import {useState} from 'react'
import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import {ReportDraft2} from '../../core/model/ReportDraft'
import {Card, CardContent, MenuItem, Select, useTheme} from '@mui/material'
import {styleUtils} from '../../core/theme/theme'
import {Enum} from '@alexandreannic/ts-utils'

export const PlaygroundCompany = () => {
  const theme = useTheme()
  const [report, setReport] = useState<Partial<ReportDraft2>>({})
  const [companyKind, setCompanyKind] = useState(CompanyKinds.SIRET)
  return (
    <>
      <Select sx={{mb: 2}} size="small" value={companyKind} onChange={e => setCompanyKind(e.target.value as CompanyKinds)}>
        {Enum.keys(CompanyKinds).map(_ =>
          <MenuItem value={_} key={_}>{_}</MenuItem>
        )}
      </Select>
      <Card elevation={2}>
        <CardContent>
          <_Company
            draft={{
              companyKind,
            }}
            onUpdateReportDraft={x => setReport(x as Partial<ReportDraft2>)}
          />
        </CardContent>
      </Card>
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>
        {JSON.stringify(report, undefined, 2)}
      </pre>
    </>
  )
}
