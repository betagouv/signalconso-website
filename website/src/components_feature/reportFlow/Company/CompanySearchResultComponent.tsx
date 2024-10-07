import {Animate} from '@/components_simple/Animate'
import {BtnNextSubmit} from '@/components_simple/buttons/Buttons'
import {CompanyRecapFromSearchResult} from '@/components_simple/CompanyRecap/CompanyRecap'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {getTags} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {Report} from '@/model/Report'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Controller, useForm} from 'react-hook-form'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {ScAlert} from '../../../components_simple/ScAlert'
import {useToastError} from '../../../hooks/useToastError'
import {CompanySearchResult, isGovernmentCompany} from '../../../model/Company'
import {PartialReport} from '../ReportFlowContext'
import {NoSearchResult} from './lib/NoSearchResult'

interface Props {
  companies: CompanySearchResult[]
  report: PartialReport & Pick<Report, 'step0' | 'step1'>
  onSubmit: (selected: CompanySearchResult, vendor?: string) => void
}

interface Form {
  siret: string
  vendor?: string
}

export const CompanySearchResultComponent = ({companies, report, onSubmit}: Props) => {
  const {m} = useI18n()
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: {errors},
  } = useForm<Form>({
    defaultValues: {},
  })
  const toastError = useToastError()
  const id = 'CompanySearchResult'
  const onlyClosed = companies.findIndex(_ => _.isOpen) === -1

  function computeFormLogic(form: Partial<Form>) {
    const siret = form.siret
    const company = siret ? companies.find(_ => _.siret === siret) : undefined
    const needVendor = company && company?.isMarketPlace
    return {
      company,
      needVendor,
    }
  }

  const {company, needVendor} = computeFormLogic(watch())

  return (
    <>
      <Animate>
        <div>
          {companies.length === 0 ? (
            <div {...{id}}>
              <NoSearchResult />
            </div>
          ) : (
            <div {...{id}} className="mb-4">
              <form
                onSubmit={handleSubmit(form => {
                  const {company, needVendor} = computeFormLogic(form)
                  if (!company) {
                    throw new Error(`Company should not be selectable`)
                  } else if (isGovernmentCompany(company)) {
                    toastError(m.cannotReportGovernmentCompany)
                  } else {
                    if (needVendor) {
                      if (!form.vendor) {
                        throw new Error(`Missing vendor field`)
                      }
                      onSubmit(company, form.vendor)
                    } else {
                      onSubmit(company)
                    }
                  }
                })}
              >
                <div>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: m.required + ' *'},
                    }}
                    name="siret"
                    render={({field}) => (
                      <>
                        <ScRadioButtons
                          {...field}
                          required
                          titleNoAutoAsterisk
                          error={!!errors.siret}
                          errorMessage={errors.siret?.message}
                          options={companies.map(company => {
                            const closed = !company.isOpen
                            return {
                              label: <CompanyRecapFromSearchResult company={company} tags={getTags(report)} />,
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
                {needVendor ? (
                  <Animate>
                    <div>
                      <h2 className="text-lg">{m.companyWebsiteVendorTitle}</h2>
                      <div className="mb-4">
                        <ScAlert type="info">
                          <p>{m.companyWebsiteVendorAlert}</p>
                        </ScAlert>
                        <ScTextInput
                          label={m.companyWebsiteVendorLabel}
                          error={!!errors.vendor}
                          helperText={errors.vendor?.message ?? ''}
                          {...register('vendor', {
                            required: {value: true, message: m.required},
                          })}
                          required
                        />
                      </div>
                      <NextBtn />
                    </div>
                  </Animate>
                ) : (
                  company && (
                    <Animate>
                      <div>
                        <NextBtn />
                      </div>
                    </Animate>
                  )
                )}
              </form>
            </div>
          )}
        </div>
      </Animate>
    </>
  )
}

function NextBtn() {
  return (
    <div className="flex justify-end">
      <BtnNextSubmit />
    </div>
  )
}
