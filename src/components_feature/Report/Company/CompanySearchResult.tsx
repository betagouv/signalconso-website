import {BoxProps, Icon} from '@mui/material'
import {Fender} from 'alexlibs/mui-extension/Fender/Fender'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {AddressComponent} from 'components_simple/Address/Address'
import {Animate} from 'components_simple/Animate/Animate'
import {BtnNextSubmit} from 'components_simple/Buttons'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {styleUtils} from 'core/theme'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useToastError} from '../../../hooks/useToastError'
import {CompanySearchResult, isGovernmentCompany} from '../../../model/Company'
import {CompanyWebsiteVendor} from './CompanyWebsiteVendor'
import {ScRadioButtons} from '../../../components_simple/RadioGroup/ScRadioButtons'
import {Alert} from '@codegouvfr/react-dsfr/Alert'

interface Props extends Omit<BoxProps, 'onSubmit'> {
  companies: CompanySearchResult[]
  onSubmit: (selected: CompanySearchResult, vendor?: string) => void
}

const Row = ({icon, children, variant}: {icon?: string; variant?: 'blue' | 'error'; children: ReactNode}) => {
  const color = variant === 'blue' ? 'text-scbluefrance' : variant === 'error' ? 'text-red-500' : 'text-gray-500'
  return (
    <>
      <div className={`flex items-start mb-1 text-sm ${color}`}>
        <Icon
          sx={{
            mr: 0.5,
            fontSize: t => styleUtils(t).fontSize.big,
            lineHeight: 1,
            minWidth: 20,
          }}
        >
          {icon}
        </Icon>
        <div>{children}</div>
      </div>
    </>
  )
}

interface Form {
  result: string
}

export const CompanySearchResultComponent = ({companies, onSubmit}: Props) => {
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
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.select)
  }

  const onlyClosed = companies.findIndex(_ => _.isOpen) === -1

  const createCompanyEntry = (company: CompanySearchResult, closed: boolean) => {
    const isGovernment = isGovernmentCompany(company)
    return (
      <div className="flex justify-between w-full">
        <div>
          <span className="font-bold block">
            {company.commercialName ? `${company.commercialName} (${company.name})` : company.name}
          </span>
          {company.brand && <span className="block">{company.brand}</span>}

          {company.isHeadOffice && (
            <Row icon="business" variant="blue">
              {m.isHeadOffice}
            </Row>
          )}

          {company.activityLabel && <Row icon="label">{company.activityLabel}</Row>}
          {isGovernment && (
            <Row icon="error" variant="error">
              {m.governmentCompany}
            </Row>
          )}

          <Row icon="badge">
            Numéro SIRET <span className="">{company.siret}</span>
          </Row>
          {company.address && (
            <Row icon="location_on">
              <AddressComponent address={company.address} />
            </Row>
          )}
        </div>
        {closed && <span className="text-red-600">{m.closedCompany}</span>}
      </div>
    )
  }

  return (
    <>
      <Animate>
        {companies.length === 0 ? (
          <Panel id="CompanySearchResult">
            <Fender type="empty" icon="sentiment_very_dissatisfied">
              <span className="text-lg text-gray-600">{m.noMatchingCompany}</span>
            </Fender>
          </Panel>
        ) : (
          <Panel title={m.selectCompany} id="CompanySearchResult">
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
              <span className="block text-gray-500">{m.selectCompanyDesc}</span>
              <PanelBody>
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
                        error={!!errors.result}
                        options={companies.map(company => {
                          const closed = !company.isOpen
                          return {
                            label: createCompanyEntry(company, closed),
                            value: company.siret!,
                            disabled: closed,
                          }
                        })}
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
              </PanelBody>
              <PanelActions>{!onlyClosed && <BtnNextSubmit />}</PanelActions>
            </form>
          </Panel>
        )}
      </Animate>
      {selected?.isMarketPlace && <CompanyWebsiteVendor onSubmit={vendor => submit(selected, vendor)} />}
    </>
  )
}
