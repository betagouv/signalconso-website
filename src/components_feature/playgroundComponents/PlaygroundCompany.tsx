import {_Company} from '../reportFlow/Company/Company'
import {useState} from 'react'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Box, Card, CardContent, MenuItem, Select, useTheme} from '@mui/material'
import {styleUtils} from '@/core/theme'
import {companyKinds, CompanyKinds, ReportTag} from '../../anomalies/Anomaly'

export const PlaygroundCompany = () => {
  const theme = useTheme()
  const [report, setReport] = useState<Partial<ReportDraft2>>({})
  const [companyKind, setCompanyKind] = useState<CompanyKinds>('SIRET')
  return (
    <>
      <div className="border border-dashed p-4 mb-8 bg-gray-100">
        <span>CompanyKind : </span>
        <Select sx={{mr: 1}} size="small" value={companyKind} onChange={e => setCompanyKind(e.target.value as CompanyKinds)}>
          {companyKinds.map(_ => (
            <MenuItem value={_} key={_}>
              {_}
            </MenuItem>
          ))}
        </Select>
      </div>
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
