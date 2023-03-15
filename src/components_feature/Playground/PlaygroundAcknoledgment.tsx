import {MenuItem, Select} from '@mui/material'
import {useGetCountries} from 'clients/apiHooks'
import {useMemo, useState} from 'react'
import {Enum} from 'utils/Enum'
import {CreatedReport} from '../../model/CreatedReport'
import {Fixture} from '../../test/fixture'
import {AcknowledgmentCases, _Acknowledgement} from '../Report/Acknowledgement/Acknowledgement'

export const PlaygroundAcknowledgment = () => {
  const [type, setType] = useState<AcknowledgmentCases>(AcknowledgmentCases.ReponseConso)
  const [demoCountry, setDemoCountry] = useState('Espagne')
  const baseReport = useMemo(Fixture.genReport, [])
  const {data: countries} = useGetCountries()
  const report = useMemo(() => {
    const reportsSwitch: {[key in AcknowledgmentCases]: () => CreatedReport} = {
      [AcknowledgmentCases.ReponseConso]: () => ({...baseReport, tags: ['ReponseConso']}),
      [AcknowledgmentCases.EmployeeReport]: () => ({...baseReport, employeeConsumer: true}),
      [AcknowledgmentCases.ForeignCompany]: () => ({
        ...baseReport,
        employeeConsumer: false,
        companyAddress: {...baseReport.companyAddress, country: demoCountry},
      }),
      [AcknowledgmentCases.NotTransmittable]: () => ({
        ...baseReport,
        employeeConsumer: false,
        tags: ['ProduitDangereux'],
      }),
      [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => ({...baseReport, employeeConsumer: false, companySiret: undefined}),
      [AcknowledgmentCases.ContractualDisputeWithSIRET]: () => ({
        ...baseReport,
        employeeConsumer: false,
        tags: ['LitigeContractuel'],
      }),
      [AcknowledgmentCases.Default]: () => ({...baseReport, employeeConsumer: false, tags: []}),
    }
    return reportsSwitch[type]()
  }, [type, demoCountry])

  const country = useMemo(() => {
    if (countries && report && report.companyAddress.country) {
      return countries?.find(_ => report.companyAddress.country === _.name)
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
      <_Acknowledgement createdReport={report} country={country} isWebView={false} />
    </>
  )
}
