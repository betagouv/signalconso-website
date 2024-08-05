import {useGetCountries} from '@/clients/apiHooks'
import {useMemo} from 'react'
import {Country} from '../../model/Country'
import {CreatedReport} from '../../model/CreatedReport'
import {Fixture} from '../../test/fixture'
import {AcknowledgementInner, AcknowledgmentCases} from '../reportFlow/Acknowledgement/Acknowledgement'

export const PlaygroundAcknowledgment = ({
  acknowledgmentCase,
  countryId,
}: {
  acknowledgmentCase: AcknowledgmentCases
  countryId: string | null
}) => {
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
  const foundCountry = testCountries.find(country => country.code === countryId)

  const baseReport = useMemo(Fixture.genReport, [])

  const {data: countries} = useGetCountries()
  const report = useMemo(() => {
    const reportsSwitch: {[key in AcknowledgmentCases]: () => CreatedReport} = {
      [AcknowledgmentCases.ReponseConso]: () => ({...baseReport, tags: ['ReponseConso']}),
      [AcknowledgmentCases.EmployeeReport]: () => ({...baseReport, employeeConsumer: true}),
      [AcknowledgmentCases.ForeignCompany]: () => ({
        ...baseReport,
        employeeConsumer: false,
        companyAddress: {...baseReport.companyAddress, country: foundCountry},
      }),
      [AcknowledgmentCases.FrenchCompanyWithoutSIRET]: () => ({...baseReport, employeeConsumer: false, companySiret: undefined}),
      [AcknowledgmentCases.ContractualDisputeWithSIRET]: () => ({
        ...baseReport,
        employeeConsumer: false,
        tags: ['LitigeContractuel'],
      }),
      [AcknowledgmentCases.PostReportHelper]: () => ({
        ...baseReport,
        postReportHelper: {
          title: 'Titre du postReportHelper',
          content:
            'Contenu du postReportHelper avec du <strong>HTML</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
        },
      }),
      [AcknowledgmentCases.Default]: () => ({...baseReport, employeeConsumer: false, tags: []}),
    }
    return reportsSwitch[acknowledgmentCase]()
  }, [acknowledgmentCase, foundCountry])

  const country = useMemo(() => {
    if (countries && report && report.companyAddress.country) {
      return countries?.find(_ => report.companyAddress.country?.code === _.code)
    }
  }, [countries, report])

  return (
    <>
      <AcknowledgementInner createdReport={report} country={country} isWebView={false} />
    </>
  )
}
