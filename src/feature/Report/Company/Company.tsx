import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyDraft, CompanyKinds, CompanySearchResult, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {useI18n} from '../../../core/i18n'
import {CompanyByNameAndPostalCode} from './CompanyByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyByNone, IsForeignCompany} from './CompanyByNone'
import {CompanyByIdentity} from './CompanyByIdentity'
import {ScButton} from '../../../shared/Button/Button'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyAskConsumerStreet} from './CompanyAskConsumerStreet'
import {TreeStepper, TreeStepperNode} from '../../../shared/TreeStepper/TreeStepper'
import {StepperActions} from '../../../shared/Stepper/StepperActions'

interface CompanyWithRequiredPropsProps {
  draft: Partial<ReportDraft>
  // companyKind: CompanyKinds
  onUpdateReportDraft: Dispatch<SetStateAction<Readonly<Partial<ReportDraft>>>>
}

export const Company = ({}) => {
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
      <CompanyWithRequiredProps
        draft={draft}
        // companyKind={draft.companyKind}
        onUpdateReportDraft={_reportFlow.setReportDraft}
      />
    </>
  )
}

const CompanyWithRequiredProps = ({
  draft,
  // companyKind,
  onUpdateReportDraft,
}: CompanyWithRequiredPropsProps) => {
  const [companyDraft, setCompanyDraft] = useState<Partial<CompanyDraft>>({})
  const [result, setResult] = useState<CompanySearchResult[] | undefined>()
  const [resultFromMatch, setResultFromMatch] = useState<CompanySearchResult[] | undefined>()
  const [identifyBy, setIdentifyBy] = useState<IdentifyBy | undefined>()
  const [isForeign, setIsForeign] = useState<IsForeignCompany | undefined>()
  const {m} = useI18n()

  const website = () => (
    <CompanyByWebsite value={companyDraft?.website} onSubmit={(website, _result) => {
      setCompanyDraft(_ => ({..._, website}))
      setResultFromMatch(_result)
    }}/>
  )

  const searchResult = () => (
    <CompanySearchResultComponent companies={result!} onChange={result => {
      setCompanyDraft(_ => ({..._, ...result}))
    }}/>
  )

  const companyIdentifyBy = () => (
    <CompanyIdentifyBy companyKind={draft.companyKind!} value={identifyBy} onChange={setIdentifyBy}/>
  )

  const companyByNameAndPostalCode = () => (
    <CompanyByNameAndPostalCode
      onFound={setResult}
      onReportForeignCompany={() => {
        setIdentifyBy(IdentifyBy.NONE)
      }}
    />
  )

  const companyByIdentity = () => (
    <CompanyByIdentity onFound={setResult}/>
  )

  const companyByNone = () => (
    <CompanyByNone onChange={setIsForeign}/>
  )

  const companyAskConsumerPostalCode = () => (
    <CompanyAskConsumerPostalCode onChange={postalCode => setCompanyDraft(_ => ({..._, address: {..._.address, postalCode}}))}/>
  )

  const companyAskForeignDetails = () => (
    <CompanyAskForeignDetails onChange={form => {
      setCompanyDraft(_ => ({
        ..._,
        name: form?.name,
        address: {..._.address, country: form?.country, postalCode: form?.postalCode}
      }))
    }}/>
  )

  const askConsumerStreet = () => (
    <CompanyAskConsumerStreet onChange={form => {
      setCompanyDraft(_ => ({
        ..._,
        address: {..._, street: form.street, postalCode: form.postalCode}
      }))
    }}/>
  )

  const x: TreeStepperNode = {
    id: 'companyIdentifyBy',
    isDone: !!identifyBy,
    render: companyIdentifyBy,
    children: [
      {
        id: 'companyByNameAndPostalCode',
        if: identifyBy === IdentifyBy.NAME,
        isDone: !!result,
        render: companyByNameAndPostalCode,
        children: [{
          id: 'searchResult',
          isDone: !!companyDraft.siret,
          render: searchResult
        }]
      },
      {
        id: 'companyByIdentity',
        if: identifyBy === IdentifyBy.IDENTITY,
        isDone: !!result,
        render: companyByIdentity,
        children: [{
          id: 'searchResult',
          isDone: !!companyDraft.siret,
          render: searchResult
        }]
      },
      {
        id: 'askConsumerStreet',
        if: identifyBy === IdentifyBy.NONE && draft.companyKind === CompanyKinds.LOCATION,
        isDone: !!(companyDraft.address?.street && companyDraft.address?.postalCode),
        render: askConsumerStreet,
      },
      {
        id: 'companyByNone',
        render: companyByNone,
        children: [
          {
            id: 'companyAskConsumerPostalCode',
            if: isForeign === IsForeignCompany.Yes,
            render: companyAskConsumerPostalCode,
          },
          {
            id: 'companyAskForeignDetails',
            if: isForeign === IsForeignCompany.No,
            render: companyAskForeignDetails,
          },
          {
            id: 'companyAskConsumerPostalCode',
            if: isForeign === IsForeignCompany.Unknown,
            render: companyAskConsumerPostalCode,
          }
        ]
      },
    ]
  }


  const step: TreeStepperNode[] = [
    {
      id: 'website',
      if: draft.companyKind === CompanyKinds.WEBSITE,
      isDone: !!companyDraft.website,
      render: website,
      children: [
        {
          id: 'searchResult',
          if: !!resultFromMatch,
          isDone: !!companyDraft.siret,
          render: searchResult
        },
        x
      ],
    },
    {
      id: 'phone',
      if: draft.companyKind === CompanyKinds.PHONE,
      isDone: !!companyDraft.phone,
      render: website,
      children: [
        {
          id: 'searchResult',
          if: !!resultFromMatch,
          isDone: !!companyDraft.siret,
          render: searchResult
        },
        x
      ],
    },
    x
  ]
  return (
    <>
      <TreeStepper tree={step} renderDone={
        <StepperActions next={next => {
          onUpdateReportDraft(_ => ({..._, companyDraft: companyDraft as CompanyDraft}))
          next()
        }}/>
      }/>
    </>
  )

  // return (
  //   <>
  //     <div>{JSON.stringify(companyDraft.address?.postalCode)}</div>
  //     {/*<hr/>*/}
  //     {/*<div>{JSON.stringify(identifyBy)}</div>*/}
  //     {/*<hr/>*/}
  //     {/*{JSON.stringify(companyDraft)}*/}
  //     <Stepper renderDone={
  //       <StepperActions next={next => {
  //         onUpdateReportDraft(_ => ({..._, companyDraft: companyDraft as CompanyDraft}))
  //         next()
  //       }}/>
  //     }>
  //       <Step isDone={!!companyDraft.website} hidden={draft.companyKind !== CompanyKinds.WEBSITE}>
  //         <CompanyByWebsite value={companyDraft?.website} onSubmit={(website, _result) => {
  //           setCompanyDraft(_ => ({..._, website}))
  //           setResultFromMatch(_result)
  //         }}/>
  //       </Step>
  //
  //       <Step isDone={!!companyDraft.phone} hidden={draft.companyKind !== CompanyKinds.PHONE}>
  //         <CompanyByPhone value={companyDraft?.phone} onSubmit={phone => setCompanyDraft(_ => ({..._, phone}))}/>
  //       </Step>
  //
  //       <Step isDone={!!identifyBy} hidden={!!resultFromMatch}>
  //         <CompanyIdentifyBy companyKind={draft.companyKind!} value={identifyBy} onChange={setIdentifyBy}/>
  //       </Step>
  //
  //       <Step isDone={!!result || !!isForeign} hidden={!identifyBy}>
  //         {identifyBy && fnSwitch(identifyBy, {
  //           [IdentifyBy.NAME]: <CompanyByNameAndPostalCode
  //             onFound={setResult}
  //             onReportForeignCompany={() => {
  //               setIdentifyBy(IdentifyBy.NONE)
  //             }}
  //           />,
  //           [IdentifyBy.IDENTITY]: <CompanyByIdentity onFound={setResult}/>,
  //           [IdentifyBy.NONE]: <CompanyByNone onChange={setIsForeign}/>,
  //         })}
  //       </Step>
  //
  //       <Step isDone={!!companyDraft.address?.postalCode} hidden={!isForeign}>
  //         {isForeign && fnSwitch(isForeign, {
  //           [IsForeignCompany.Yes]: <CompanyAskConsumerPostalCode onChange={postalCode => setCompanyDraft(_ => ({..._, address: {..._.address, postalCode}}))}/>,
  //           [IsForeignCompany.No]: <CompanyAskForeignDetails onChange={form => {
  //             setCompanyDraft(_ => ({
  //               ..._,
  //               name: form?.name,
  //               address: {..._.address, country: form?.country, postalCode: form?.postalCode}
  //             }))
  //           }}/>,
  //           [IsForeignCompany.Unknown]: <CompanyAskConsumerPostalCode onChange={postalCode => setCompanyDraft(_ => ({..._, address: {..._.address, postalCode}}))}/>,
  //         })}
  //       </Step>
  //
  //       <Step isDone={!!companyDraft.siret}>
  //         {result && <CompanySearchResultComponent companies={result} onChange={result => {
  //           setCompanyDraft(_ => ({..._, ...result}))
  //         }}/>}
  //       </Step>
  //     </Stepper>
  //   </>
  // )
}
