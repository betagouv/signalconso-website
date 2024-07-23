import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {Animate} from '@/components_simple/Animate'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {CompanyRecapFromSearchResult} from '@/components_simple/CompanyRecap/CompanyRecap'
import {useI18n} from '@/i18n/I18n'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {ReactNode, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {useToastError} from '../../../hooks/useToastError'
import {CompanySearchResult, isGovernmentCompany} from '../../../model/Company'
import {CompanyWebsiteVendor} from './CompanyWebsiteVendor'
import {NoSearchResult} from './lib/NoSearchResult'

interface Props {
  companies: CompanySearchResult[]
  reportDraft: Partial<ReportDraft2>
  onSubmit: (selected: CompanySearchResult, vendor?: string) => void
}

function Row({icon, children, variant}: {icon: string; variant?: 'blue' | 'error'; children: ReactNode}) {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <div className={`flex items-start mb-1 text-sm ${color} `}>
      <i className={`${icon} mr-2 fr-icon--sm`} />
      <div>{children}</div>
    </div>
  )
}

interface Form {
  result: string
}

export const CompanySearchResultComponent = ({companies, reportDraft, onSubmit}: Props) => {
  const {m} = useI18n()
  const _analytic = useAnalyticContext()
  const [selected, setSelected] = useState<CompanySearchResult | undefined>()
  useEffect(() => {
    setSelected(undefined)
  }, [companies])
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>()

  const toastError = useToastError()

  const submit = (selected: CompanySearchResult, vendor?: string) => {
    onSubmit(selected, vendor)
  }

  const onlyClosed = companies.findIndex(_ => _.isOpen) === -1

  return (
    <>
      <Animate>
        <div className="mt-6 pt-10 border-t-[1px] border-0 border-solid border-gray-200">
          {companies.length === 0 ? (
            <div id="CompanySearchResult">
              <NoSearchResult text={m.noMatchingCompany} />
            </div>
          ) : (
            <div id="CompanySearchResult">
              <form
                onSubmit={handleSubmit(form => {
                  const selectedCompany = companies.find(_ => _.siret === form.result)!
                  if (isGovernmentCompany(selectedCompany)) {
                    toastError(m.cannotReportGovernmentCompany)
                  } else {
                    selectedCompany.isMarketPlace ? setSelected(selectedCompany) : submit(selectedCompany)
                  }
                })}
              >
                <div>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: m.required + ' *'},
                    }}
                    name="result"
                    render={({field}) => (
                      <>
                        <ScRadioButtons
                          {...field}
                          required
                          titleNoAutoAsterisk
                          error={!!errors.result}
                          errorMessage={errors.result?.message}
                          options={companies.map(company => {
                            const closed = !company.isOpen
                            return {
                              label: <CompanyRecapFromSearchResult company={company} reportDraft={reportDraft} />,
                              value: company.siret!,
                              disabled: closed,
                            }
                          })}
                          title={m.selectCompany}
                          description={m.selectCompanyDesc}
                          autoFocusOnError
                        />
                        {onlyClosed && (
                          <Alert
                            description={m.closedCompanyText}
                            severity="warning"
                            title={m.closedCompany}
                            className="fr-mt-4w"
                          />
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex justify-end">{!onlyClosed && <BtnNextSubmit />}</div>
              </form>
            </div>
          )}
        </div>
      </Animate>
      {selected?.isMarketPlace && <CompanyWebsiteVendor onSubmit={vendor => submit(selected, vendor)} />}
    </>
  )
}
