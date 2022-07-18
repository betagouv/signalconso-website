import {_Acknowledgement, AcknowledgmentCases} from '../Report/Acknowledgement/Acknowledgement'
import {useEffect, useMemo, useState} from 'react'
import {Fixture} from '../../test/fixture'
import {useConstantContext} from 'core/context/ConstantContext'
import {MenuItem, Select} from '@mui/material'
import {Enum} from '../../alexlibs/ts-utils'
import {ReportTag} from '../../anomaly/Anomaly'
import {Report} from '../../client/report/Report'

export const PlaygroundAcknowledgment = () => {
  const [type, setType] = useState<AcknowledgmentCases>(AcknowledgmentCases.ReponseConso)
  const [demoCountry, setDemoCountry] = useState('Espagne')
  const baseReport = useMemo(Fixture.genReport, [])
  const {countries} = useConstantContext()
  const report = useMemo(() => {
    const reportsSwitch: {[key in AcknowledgmentCases]: () => Report} = {
      [AcknowledgmentCases.ReponseConso]: () => ({...baseReport, tags: [ReportTag.ReponseConso]}),
      [AcknowledgmentCases.EmployeeReport]: () => ({...baseReport, employeeConsumer: true}),
      [AcknowledgmentCases.ForeignCompany]: () => ({
        ...baseReport,
        employeeConsumer: false,
        companyAddress: {...baseReport.companyAddress, country: demoCountry},
      }),
      [AcknowledgmentCases.NotTransmittable]: () => ({
        ...baseReport,
        employeeConsumer: false,
        tags: [ReportTag.ProduitDangereux],
      }),
      [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => ({...baseReport, employeeConsumer: false, companySiret: undefined}),
      [AcknowledgmentCases.ContractualDisputeWithSIRET]: () => ({
        ...baseReport,
        employeeConsumer: false,
        tags: [ReportTag.LitigeContractuel],
      }),
      [AcknowledgmentCases.Default]: () => ({...baseReport, employeeConsumer: false, tags: []}),
    }
    return reportsSwitch[type]()
  }, [type, demoCountry])

  useEffect(() => {
    countries.fetch({force: false, clean: false})
  }, [])

  const country = useMemo(() => {
    if (countries.entity && report && report.companyAddress.country) {
      return countries.entity?.find(_ => report.companyAddress.country === _.name)
    }
  }, [countries, report])

  return (
    <>
      <Select sx={{mr: 1}} size="small" value={type} onChange={e => setType(e.target.value as AcknowledgmentCases)}>
        {Enum.keys(AcknowledgmentCases).map(_ => (
          <MenuItem value={_} key={_}>
            {_}
          </MenuItem>
        ))}
      </Select>
      {type === AcknowledgmentCases.ForeignCompany && (
        <Select size="small" value={demoCountry} onChange={e => setDemoCountry(e.target.value)}>
          {['Espagne', 'Suisse', 'Andorre', 'Argentine'].map(_ => (
            <MenuItem value={_} key={_}>
              {_}
            </MenuItem>
          ))}
        </Select>
      )}
      <hr />
      <_Acknowledgement createdReport={report} country={country} />
    </>
  )
}
