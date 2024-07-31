import {CompanyKind, CompanyKindQuestion} from '@/anomalies/Anomaly'
import {useI18n} from '@/i18n/I18n'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemSelect} from './ProblemSelect'

export function ProblemCompanyKindOverride({
  children,
  companyKindQuestion,
  companyKindBeforeOverride,
  hasTagProduitDangereux,
}: {
  children: () => ReactNode
  companyKindQuestion: CompanyKindQuestion | undefined
  companyKindBeforeOverride: CompanyKind | undefined
  hasTagProduitDangereux: boolean
}) {
  const {m} = useI18n()
  const {reportDraft, setReportDraft} = useReportFlowContext()
  const hidden = !!companyKindBeforeOverride
  const isDone = hidden || !!reportDraft.companyKindOverride
  return (
    <>
      {!hidden && (
        <>
          {companyKindQuestion ? (
            <ProblemSelect<CompanyKind>
              id="select-companyKind"
              title={companyKindQuestion.label}
              value={reportDraft.companyKindOverride}
              onChange={value => setReportDraft(_ => ({..._, companyKindOverride: value}))}
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
              value={reportDraft.companyKindOverride}
              onChange={value => {
                setReportDraft(_ => ({..._, companyKindOverride: value}))
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
