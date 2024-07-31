import {CompanyKind} from '@/anomalies/Anomaly'
import {getSubcategories, getTags, getWipCompanyKindFromSelected, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemSelect} from './ProblemSelect'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'

export function ProblemCompanyKindOverride({children}: {children: () => ReactNode}) {
  const {m} = useI18n()
  const {report: r, setReport: setReport} = useReportFlowContext()
  if (!hasStep0(r) || !hasSubcategoryIndexes(r)) {
    throw new Error('Draft is not ready to ask for company kind override')
  }
  const subcategories = getSubcategories(r)
  const hasTagProduitDangereux = getTags(r).includes('ProduitDangereux')
  const companyKindBeforeOverride = getWipCompanyKindFromSelected(r)
  const {companyKindQuestion} = computeSelectedSubcategoriesData(subcategories)
  const hidden = !!companyKindBeforeOverride
  const isDone = hidden || !!r.step1.companyKindOverride
  return (
    <>
      {!hidden && (
        <>
          {companyKindQuestion ? (
            <ProblemSelect<CompanyKind>
              id="select-companyKind"
              title={companyKindQuestion.label}
              value={r.step1.companyKindOverride}
              onChange={value => setReport(_ => ({..._, companyKindOverride: value}))}
              options={companyKindQuestion.options.map(option => {
                return {
                  title: option.label,
                  value: option.companyKind,
                }
              })}
            />
          ) : (
            <ProblemSelect<CompanyKind>
              id="select-companyKind"
              title={m.problemIsInternetCompany}
              value={r.step1.companyKindOverride}
              onChange={value => {
                setReport(_ => ({..._, companyKindOverride: value}))
              }}
              options={[
                {
                  title: m.yes,
                  value: 'WEBSITE',
                },
                {
                  title: m.problemIsInternetCompanyNo,
                  value: hasTagProduitDangereux ? 'LOCATION' : 'SIRET',
                },
              ]}
            />
          )}
        </>
      )}

      {isDone && children()}
    </>
  )
}
