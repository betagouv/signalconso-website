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
import {AnimateProps} from '../../../shared/Animate/Animate'
import {ReportDraft2} from '../../../core/model/ReportDraft'

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
  const [companyDraft, setCompanyDraft] = useState<Partial<CompanyDraft>>({})
  const [companiesSearch, setCompaniesSearch] = useState<CompanySearchResult[] | undefined>()
  // const [resultFromMatch, setResultFromMatch] = useState<CompanySearchResult[] | undefined>()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()
  const [isForeign, setIsForeign] = useState<IsForeignCompany | undefined>()
  const {m} = useI18n()

  const renderWebsite = () => (
    <CompanyByWebsite value={companyDraft?.website} onSubmit={(website, _result) => {
      setCompanyDraft(_ => ({..._, website}))
      setCompaniesSearch(_result)
      // setResultFromMatch(_result)
    }}/>
  )

  const renderSearchResult = () => (
    <CompanySearchResultComponent companies={companiesSearch!} onChange={result => {
      setCompanyDraft(_ => ({..._, ...result}))
    }}/>
  )

  const renderIdentifyBy = () => (
    <CompanyIdentifyBy companyKind={draft.companyKind!} value={identifyBy} onChange={setIdentifyBy}/>
  )

  const renderAskNameAndPostalCode = () => (
    <CompanyByNameAndPostalCode
      onFound={setCompaniesSearch}
      onReportForeignCompany={() => {
        setIdentifyBy(IdentifyBy.NONE)
      }}
    />
  )

  const renderSearchByIdentity = () => (
    <CompanySearchByIdentity onFound={setCompaniesSearch}/>
  )

  const renderAskIsForeign = () => (
    <CompanyAskIsForeign onChange={setIsForeign}/>
  )

  const renderAskConsumerPostalCode = () => (
    <CompanyAskConsumerPostalCode onChange={postalCode => setCompanyDraft(_ => ({..._, address: {..._.address, postalCode}}))}/>
  )

  const renderAskForeignDetails = () => (
    <CompanyAskForeignDetails onChange={form => {
      setCompanyDraft(_ => ({
        ..._,
        name: form?.name,
        address: {..._.address, country: form?.country, postalCode: form?.postalCode}
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

  const companySearchResultTree = (condition?: boolean): TreeStepperNode => ({
    // id: 'searchResult',
    if: !!companiesSearch,
    done: !!companyDraft.siret,
    render: renderSearchResult,
    children: [
      {
        if: companyDraft.
      }
    ]
  })

  const commonTree: TreeStepperNode = {
    // id: 'companyIdentifyBy',
    done: !!identifyBy,
    render: renderIdentifyBy,
    children: [
      {
        // id: 'companyByNameAndPostalCode',
        if: identifyBy === IdentifyBy.NAME,
        done: !!companiesSearch,
        render: renderAskNameAndPostalCode,
        children: [companySearchResultTree(!!companiesSearch)]
      },
      {
        // id: 'companyByIdentity',
        if: identifyBy === IdentifyBy.IDENTITY,
        done: !!companiesSearch,
        render: renderSearchByIdentity,
        children: [companySearchResultTree(!!companiesSearch)]
      },
      // {
      // //   id: 'askConsumerStreet',
      //   if: identifyBy === IdentifyBy.NONE && draft.companyKind === CompanyKinds.LOCATION,
      //   done: !!(companyDraft.address?.street && companyDraft.address?.postalCode),
      //   render: renderAskConsumerStreet,
      // },
      {
        // id: 'companyByNone',
        render: renderAskIsForeign,
        done: !!isForeign,
        children: [
          {
            // id: 'companyAskConsumerPostalCode',
            if: isForeign === IsForeignCompany.Yes,
            render: renderAskConsumerPostalCode,
          },
          {
            // id: 'companyAskForeignDetails',
            if: isForeign === IsForeignCompany.No,
            render: renderAskForeignDetails,
          },
          {
            // id: 'companyAskConsumerPostalCode',
            if: isForeign === IsForeignCompany.Unknown,
            render: renderAskConsumerPostalCode,
          }
        ]
      },
    ]
  }

  return (
    <>
      <TreeStepper
        tree={[
          {
            // id: 'website',
            if: draft.companyKind === CompanyKinds.WEBSITE,
            done: !!companyDraft.website,
            render: renderWebsite,
            children: [
              companySearchResultTree(/*!!resultFromMatch*/),
              commonTree
            ],
          },
          {
            // id: 'phone',
            if: draft.companyKind === CompanyKinds.PHONE,
            done: !!companyDraft.phone,
            render: renderWebsite,
            children: [
              companySearchResultTree(/*!!resultFromMatch*/),
              commonTree
            ],
          },
          commonTree
        ]}
        renderDone={
          <StepperActions next={next => {
            onUpdateReportDraft(_ => ({..._, companyDraft: companyDraft as CompanyDraft}))
            next()
          }}/>
        }/>
    </>
  )
}
