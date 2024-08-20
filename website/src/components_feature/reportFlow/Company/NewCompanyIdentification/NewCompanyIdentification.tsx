import {Animate} from '@/components_simple/Animate'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {GeoArea, ScAutocompleteGeoArea} from '@/components_simple/formInputs/ScAutocompleteGeoArea'
import {ScCheckbox} from '@/components_simple/formInputs/ScCheckbox'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {getCompanyKind} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {CompanySearchResult} from '@/model/Company'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification} from '@/model/Step2Model'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {PartialReport} from '../../ReportFlowContext'
import {CompanyAskConsumerPostalCode} from '../CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from '../CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from '../CompanyAskForeignDetails'
import {CompanySearchResultComponent} from '../CompanySearchResultComponent'
const searchResults: CompanySearchResult[] = [
  {
    siret: '49915454000037',
    name: 'ETABLISSEMENT LEROY',
    isHeadOffice: false,
    address: {number: '34', street: 'RUE DE PONTHIEU', postalCode: '75008', city: 'PARIS'},
    activityCode: '43.22A',
    activityLabel: "Travaux d'installation d'eau et de gaz en tous locaux",
    isMarketPlace: false,
    isOpen: true,
    isPublic: true,
  },
  {
    siret: '84130782000024',
    name: 'SERGE \nLEROY',
    isHeadOffice: true,
    address: {postalCode: '75008', city: 'PARIS'},
    activityCode: '82.99Z',
    activityLabel: 'Autres activités de soutien aux entreprises n.c.a.',
    isMarketPlace: false,
    isOpen: true,
    isPublic: false,
  },
  {
    siret: '37833985700013',
    name: 'SCI POLLET SAUSSIER LEROY',
    isHeadOffice: true,
    address: {number: '3', street: 'HOCHE', postalCode: '75008', city: 'PARIS'},
    activityCode: '68.32A',
    activityLabel: "Administration d'immeubles et autres biens immobiliers",
    isMarketPlace: false,
    isOpen: true,
    isPublic: true,
  },
]

type Form = {
  input: string
  restrictToGeoArea: boolean
  geoArea?: GeoArea
}

export function NewCompanyIdentification({
  draft,
  onIdentification,
}: {
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Form>({})
  const {m} = useI18n()
  const restrictToGeoArea = watch('restrictToGeoArea')

  const [geographicalRestriction, setGeographicalRestriction] = useState(true)
  const [mode, setMode] = useState<'search' | 'cannotFind' | 'cannotFindConfirmed' | 'foreign'>('search')
  const showSearchResults = false
  const emptyResults = true
  const companyKind = getCompanyKind(draft)
  return (
    <div>
      {
        <div className="mb-4">
          <h2 className="fr-h6 !mb-4">Pouvez-vous identifier l'entreprise ?</h2>
          <RequiredFieldsLegend />
          <ScTextInput
            {...register('input', {
              required: {value: true, message: m.required},
            })}
            error={!!errors.input}
            helperText={errors.input?.message}
            required
            desc="Entreprises françaises uniquement"
            label="Nom ou identifiant de l'entreprise"
            placeholder="Nom, n° SIRET/SIREN, n° RCS..."
          />
          <div className={` ${restrictToGeoArea ? 'p-4 pb-1 mb-4 bg-sclightpurple rounded-lg' : ''}`}>
            <ScCheckbox
              {...register('restrictToGeoArea')}
              label="Restreindre la recherche à un département ou code postal"
              required
            />
            {restrictToGeoArea && (
              <div className="max-w-lg">
                <ScAutocompleteGeoArea
                  error={false}
                  label="Département ou code postal"
                  name="foobar"
                  onBlur={() => {}}
                  onChange={() => {}}
                  // helperText="helper text"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end mb-8">
            <ButtonWithLoader size="large" iconId={'fr-icon-search-line'} onClick={() => {}} loading={false}>
              Je lance la recherche
            </ButtonWithLoader>
          </div>
          {(!showSearchResults || emptyResults) && <hr className="" />}
          {showSearchResults && (
            <div className="">
              <CompanySearchResultComponent companies={emptyResults ? [] : searchResults} onSubmit={() => {}} report={draft} />
            </div>
          )}
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-col">
              <Button onClick={() => setMode('cannotFind')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                Je ne trouve pas / ne connais pas l'entreprise...
              </Button>
              <Button onClick={() => setMode('foreign')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                L'entreprise est à l'étranger
              </Button>
            </div>
          </div>
        </div>
      }

      {(mode === 'cannotFind' || mode === 'cannotFindConfirmed') && (
        <Animate autoScrollTo>
          <div>
            <FriendlyHelpText>
              {/* TODO ajuster pour cas où on ne contacte pas */}
              <p>
                <strong>
                  SignalConso ne fonctionne bien que quand vous identifiez l'entreprise avec laquelle vous avez un différent
                </strong>
                . Cela nous permet de la contacter immédiatement.
              </p>
              <p>
                Si vous avez besoin d'un moteur de recherche un peu plus poussé, vous pouvez essayer{' '}
                <Link href={'https://annuaire-entreprises.data.gouv.fr/'} target="_blank">
                  L'Annuaire des Entreprises
                </Link>
                .
              </p>
              <p>
                Si vraiment vous ne pouvez pas identifier l'entreprise, vous pouvez continuer quand même votre signalement. Il
                sera communiqué aux agents de la répression des fraudes, qui feront de leur mieux pour traiter votre signalement.
                Mais les chances de succès diminuent grandement.
              </p>
              <div className="flex gap-4 justify-between">
                <Button priority="secondary" iconId="ri-arrow-left-line" onClick={() => setMode('search')}>
                  Je vais chercher un peu plus
                </Button>
                <Button
                  priority="secondary"
                  iconId="ri-arrow-right-line"
                  iconPosition="right"
                  onClick={() => setMode('cannotFindConfirmed')}
                >
                  Je ne peux vraiment pas identifier l'entreprise
                </Button>
              </div>
            </FriendlyHelpText>
          </div>
        </Animate>
      )}
      {mode === 'cannotFindConfirmed' && (
        <Animate autoScrollTo>
          <div>
            {companyKind === 'LOCATION' ? (
              <CompanyAskConsumerStreet
                onChange={({postalCode, street}) => {
                  onIdentification({
                    kind: 'consumerPreciseLocation',
                    consumerPostalCode: postalCode,
                    consumerStreet: street,
                  })
                }}
              />
            ) : (
              <CompanyAskConsumerPostalCode
                {...{companyKind}}
                onChange={postalCode => {
                  onIdentification({
                    kind: 'consumerLocation',
                    consumerPostalCode: postalCode,
                  })
                }}
              />
            )}
          </div>
        </Animate>
      )}
      {mode === 'foreign' && (
        <Animate autoScrollTo>
          <div>
            <CompanyAskForeignDetails
              {...{companyKind}}
              onSubmit={({name, postalCode, country: {code}}) => {
                onIdentification({
                  kind: 'foreignCompany',
                  companyName: name,
                  companyCountryCode: code,
                  consumerPostalCode: postalCode,
                })
              }}
            />
          </div>
        </Animate>
      )}
    </div>
  )
}
