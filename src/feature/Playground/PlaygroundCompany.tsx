import {_Company} from '../Report/Company/Company'
import {useState} from 'react'
import {ReportDraft2} from 'core/model/ReportDraft'
import {Box, Card, CardContent, MenuItem, Select, useTheme} from '@mui/material'
import {styleUtils} from 'core/theme/theme'
import {Enum} from '../../alexlibs/ts-utils'
import {CompanyKinds, ReportTag} from '../../anomaly/Anomaly'

export const PlaygroundCompany = () => {
  const theme = useTheme()
  const [report, setReport] = useState<Partial<ReportDraft2>>({})
  const [companyKind, setCompanyKind] = useState(CompanyKinds.SIRET)
  const [tag, setTag] = useState<ReportTag | undefined>()
  return (
    <>
      <Box sx={{mb: 2}}>
        <Select sx={{mr: 1}} size="small" value={companyKind} onChange={e => setCompanyKind(e.target.value as CompanyKinds)}>
          {Enum.keys(CompanyKinds).map(_ => (
            <MenuItem value={_} key={_}>
              {_}
            </MenuItem>
          ))}
        </Select>
      </Box>
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
      <pre style={{fontSize: styleUtils(theme).fontSize.small, lineHeight: 1.3}}>{JSON.stringify(report, undefined, 2)}</pre>
    </>
  )
}
