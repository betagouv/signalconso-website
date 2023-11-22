import { useGetCountries } from '@/clients/apiHooks'
import { Enum } from '@/utils/Enum'
import { useMemo, useState } from 'react'
import { Country } from '../../model/Country'
import { CreatedReport } from '../../model/CreatedReport'
import { Fixture } from '../../test/fixture'
import { AcknowledgementInner, AcknowledgmentCases } from '../reportFlow/Acknowledgement/Acknowledgement'

export const PlaygroundAcknowledgment = () => {
  const testCountries: Country[] = [
    {
      code: 'ES',
      name: 'Espagne',
      englishName: 'Spain',
      european: true,
      transfer: false,
    },
    {
      code: 'CH',
      name: 'Suisse',
      englishName: 'Switzerland',
      european: false,
      transfer: false,
    },
    {
      code: 'AD',
      name: 'Andorre',
      englishName: 'Andorra',
      european: false,
      transfer: false,
    },
    {
      code: 'AR',
      name: 'Argentine',
      englishName: 'Argentina',
      european: false,
      transfer: false,
    },
  ]
  const [type, setType] = useState<AcknowledgmentCases>(AcknowledgmentCases.ReponseConso)
  const [demoCountry, setDemoCountry] = useState<Country | undefined>({
    code: 'ES',
    name: 'Argentine',
    englishName: 'Spain',
    european: true,
    transfer: false,
  })
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
      return countries?.find(_ => report.companyAddress.country?.code === _.code)
    }
  }, [countries, report])

  return (
    <>
      <div className="space-x-2 border border-dashed p-4 mb-8 bg-gray-100">
        <span>AcknowledgmentCase : </span>
        <select
          value={type}
          onChange={e => setType(e.target.value as AcknowledgmentCases)}
          className="border border-solid border-black bg-white p-2 text-base"
        >
          {Enum.keys(AcknowledgmentCases).map(_ => (
            <option value={_} key={_}>
              {_}
            </option>
          ))}
        </select>
        {type === AcknowledgmentCases.ForeignCompany && (
          <>
            <span>Country : </span>
            <select
              value={demoCountry?.code}
              onChange={e => setDemoCountry(testCountries.find(_ => _.code === e.target.value))}
              className="border border-solid border-black bg-white p-2 text-base"
            >
              {testCountries.map(_ => (
                <option value={_.code} key={_.code}>
                  {_.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <AcknowledgementInner createdReport={report} country={country} isWebView={false} />
    </>
  )
}
