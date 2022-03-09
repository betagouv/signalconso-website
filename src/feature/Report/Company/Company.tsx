import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyDraft, CompanyKinds, CompanySearchResult, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {useI18n} from '../../../core/i18n'
import {CompanyByNameAndPostalCode} from './CompanyByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyAskIsForeign, IsForeignCompany} from './CompanyAskIsForeign'
import {CompanySearchByIdentity} from './CompanySearchByIdentity'
import {ScButton} from '../../../shared/Button/Button'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyAskConsumerStreet} from './CompanyAskConsumerStreet'
import {TreeStepper, TreeStepperNode} from '../../../shared/TreeStepper/TreeStepper'
import {StepperActions} from '../../../shared/Stepper/StepperActions'
import {ReportDraft2} from '../../../core/model/ReportDraft'
import {CompanyWebsiteVendor} from './CompanyWebsiteVendor'
import {useStepperContext} from '../../../shared/Stepper/Stepper'

interface CompanyProps {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
}

interface CompanyWithRequiredPropsProps extends CompanyProps {
  draft: Pick<ReportDraft, 'companyKind'>
  // companyKind: CompanyKinds
  onUpdateReportDraft: Dispatch<SetStateAction<Partial<ReportDraft2>>>
}

export const Company = ({animatePanel, autoScrollToPanel}: CompanyProps) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  const {m} = useI18n()
  if (draft.companyDraft) {
    return (
      <>
        {JSON.stringify(draft.companyDraft)}
        <ScButton onClick={() => _reportFlow.setReportDraft(_ => ({..._, companyDraft: undefined}))}>{m.edit}</ScButton>
      </>
    )
  }
  return (
    <>
      <_Company
        animatePanel={animatePanel}
        autoScrollToPanel={autoScrollToPanel}
        draft={draft}
        // companyKind={draft.companyKind}
        onUpdateReportDraft={_reportFlow.setReportDraft}
      />
    </>
  )
}

export const _Company = ({
  draft,
  onUpdateReportDraft,
  // companyKind,
}: CompanyWithRequiredPropsProps) => {
  const _stepper = useStepperContext()
  const [companyDraft, setCompanyDraft] = useState<Partial<CompanyDraft & Pick<CompanySearchResult, 'isMarketPlace'>>>({})
  const [results, setResults] = useState<CompanySearchResult[] | undefined>()
  const [resultsFromMatch, setResultsFromMatch] = useState<CompanySearchResult[] | undefined>()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()
  const [vendor, setVendor] = useState<string | undefined>()
  const [isForeign, setIsForeign] = useState<IsForeignCompany | undefined>()
  const {m} = useI18n()

  const renderWebsite = () => (
    <CompanyByWebsite value={companyDraft?.website} onSubmit={(website, _result) => {
      setCompanyDraft(_ => ({..._, website}))
      setResults(_result)
      setResultsFromMatch(_result)
    }}/>
  )

  const renderSearchResult = () => (
    <CompanySearchResultComponent companies={results!} onChange={result => {
      console.log('CHANGE ', result)
      setCompanyDraft(_ => ({..._, ...result}))
    }}/>
  )

  const renderIdentifyBy = () => (
    <CompanyIdentifyBy companyKind={draft.companyKind!} value={identifyBy} onChange={setIdentifyBy}/>
  )

  const renderAskNameAndPostalCode = () => (
    <CompanyByNameAndPostalCode
      onFound={setResults}
      onReportForeignCompany={() => {
        setIdentifyBy(IdentifyBy.NONE)
      }}
    />
  )

  const renderSearchByIdentity = () => (
    <CompanySearchByIdentity onFound={setResults}/>
  )

  const renderAskIsForeign = () => (
    <CompanyAskIsForeign onChange={setIsForeign}/>
  )

  const renderAskConsumerPostalCode = () => (
    <CompanyAskConsumerPostalCode onChange={postalCode => setCompanyDraft(_ => ({..._, address: {..._.address, postalCode}}))}/>
  )

  const renderAskForeignDetails = () => (
    <CompanyAskForeignDetails onSubmit={form => {
      setCompanyDraft(_ => ({
        ..._,
        name: form.name,
        address: {..._.address, country: form.country.name, postalCode: form.postalCode}
      }))
    }}/>
  )

  const renderAskConsumerStreet = () => (
    <CompanyAskConsumerStreet onChange={form => {
      setCompanyDraft(_ => ({
        ..._,
        address: {..._, street: form.street, postalCode: form.postalCode}
      }))
    }}/>
  )

  const renderVendor = () => (
    <CompanyWebsiteVendor onSubmit={setVendor}/>
  )

  const companySearchResultTree = (condition?: boolean): TreeStepperNode => {
    return ({
      id: 'searchResult',
      if: condition,
      done: !!companyDraft.siret,
      render: renderSearchResult,
      children: [
        {
          id: 'marketPlace',
          if: companyDraft.isMarketPlace,
          done: companyDraft.isMarketPlace && vendor !== undefined,
          render: renderVendor,
        }
      ]
    })
  }

  const commonTree: TreeStepperNode = {
    id: 'companyIdentifyBy',
    done: !!identifyBy,
    render: renderIdentifyBy,
    children: [
      {
        id: 'companyByNameAndPostalCode',
        if: identifyBy === IdentifyBy.NAME,
        done: !!results,
        render: renderAskNameAndPostalCode,
        children: [companySearchResultTree(!!results)]
      },
      {
        id: 'companyByIdentity',
        if: identifyBy === IdentifyBy.IDENTITY,
        done: !!results,
        render: renderSearchByIdentity,
        children: [companySearchResultTree(!!results)]
      },
      // {
      // //   id: 'askConsumerStreet',
      //   if: identifyBy === IdentifyBy.NONE && draft.companyKind === CompanyKinds.LOCATION,
      //   done: !!(companyDraft.address?.street && companyDraft.address?.postalCode),
      //   render: renderAskConsumerStreet,
      // },
      {
        id: 'companyByNone',
        render: renderAskIsForeign,
        done: !!isForeign,
        children: [
          {
            id: 'companyAskConsumerPostalCode',
            done: companyDraft.address?.postalCode !== undefined,
            if: isForeign === IsForeignCompany.Yes,
            render: renderAskConsumerPostalCode,
          },
          {
            id: 'companyAskForeignDetails',
            if: isForeign === IsForeignCompany.No,
            done: !!(companyDraft.name && companyDraft.address?.country && companyDraft.address.postalCode),
            render: renderAskForeignDetails,
          },
          {
            id: 'companyAskConsumerPostalCode',
            if: isForeign === IsForeignCompany.Unknown,
            render: renderAskConsumerPostalCode,
          }
        ]
      },
    ]
  }

  return (
    <>
      <hr/>
      {JSON.stringify(companyDraft)}
      <hr/>
      <TreeStepper
        onComplete={() => {
          // alert(JSON.stringify({vendor, companyDraft: companyDraft as CompanyDraft}))
          onUpdateReportDraft(_ => ({..._, vendor, companyDraft: companyDraft as CompanyDraft}))
          _stepper.next()
        }}
        tree={[
          {
            id: 'website',
            if: draft.companyKind === CompanyKinds.WEBSITE,
            done: !!companyDraft.website,
            render: renderWebsite,
            children: [
              companySearchResultTree(!!resultsFromMatch),
              commonTree,
            ],
          },
          {
            id: 'phone',
            if: draft.companyKind === CompanyKinds.PHONE,
            done: !!companyDraft.phone,
            render: renderWebsite,
            children: [
              companySearchResultTree(!!resultsFromMatch),
              commonTree
            ],
          },
          commonTree
        ]}
        //renderOnComplete={
        //  <StepperActions next={next => {
        //    onUpdateReportDraft(_ => ({..._, vendor, companyDraft: companyDraft as CompanyDraft}))
        //    next()
        //  }}/>
        //}
      />
    </>
  )
}
