import {Anomaly} from '@/anomalies/Anomaly'
import {RappelConsoApiResult} from '@/clients/RappelConsoClient'
import {SetReportDraft} from '@/components_feature/reportFlow/ReportFlowContext'
import {useApiClients} from '@/context/ApiClientsContext'
import {BlueBanner} from '@/feature/BlueBanner'
import {Loader} from '@/feature/Loader'
import {SpecialCategorySetup} from '@/feature/SpecialCategorySetup'
import {useQuery} from '@tanstack/react-query'
import {useSearchParams} from 'next/navigation'
import {useEffect, useMemo} from 'react'

const RAPPEL_CONSO_ID_PARAM = 'id_rappel'

function useIdRappelParam(anomaly: Anomaly) {
  const searchParams = useSearchParams()
  if (anomaly.specialCategory === 'RappelConso') {
    const param = Number(searchParams.get(RAPPEL_CONSO_ID_PARAM)?.trim())
    if (isNaN(param)) return null
    else return param
  }
  return null
}

type RappelConsoData = {
  libelle: string
  gtins: string[]
  fiche: string
}

export type RappelConsoResult = {
  id: number
  data?: RappelConsoData
}

function extractBarcodes(rappelConsoResult: RappelConsoApiResult) {
  // Parse barcodes
  const gtins = rappelConsoResult.identification_des_produits.match(/\b\d{13}\b/g) ?? []
  // Remove duplicates
  return Array.from(new Set(gtins))
}

export function useRappelConsoSetup(anomaly: Anomaly): SpecialCategorySetup<RappelConsoResult> {
  const rappelConsoId = useIdRappelParam(anomaly)
  const {rappelConsoClient} = useApiClients()
  const _query = useQuery({
    queryKey: ['rappel_conso', rappelConsoId],
    queryFn: () =>
      rappelConsoClient.fetchRappelConso(rappelConsoId!).then(results => {
        if (results.total_count > 0) {
          const result = results.results[0]
          return {
            id: result.id,
            data: {
              libelle: result.libelle,
              gtins: extractBarcodes(result),
              fiche: result.lien_vers_la_fiche_rappel,
            },
          }
        } else {
          return {
            id: rappelConsoId!,
          }
        }
      }),
    enabled: !!rappelConsoId,
  })

  return useMemo(() => {
    if (rappelConsoId) {
      if (_query.data) {
        return {
          status: 'loaded',
          result: _query.data,
        }
      }
      if (_query.status === 'pending') {
        return {
          status: 'loading',
        }
      }
    }
    return {status: 'skipped'}
  }, [rappelConsoId, _query.data, _query.status])
}

export function useHandleRcSetupLoaded(setup: SpecialCategorySetup<RappelConsoResult>, setReportDraft: SetReportDraft) {
  useEffect(() => {
    if (setup.status === 'loaded') {
      setReportDraft(_ => ({
        ..._,
        rappelConso: setup.result,
      }))
    }
  }, [setup, setReportDraft])
}
export function RappelConsoWelcome({setup}: {setup: SpecialCategorySetup<RappelConsoResult>}) {
  if (setup.status === 'skipped') {
    return null
  }
  if (setup.status === 'loading') {
    return <Loader />
  }
  const {data} = setup.result
  if (data) {
    const {gtins, libelle} = data
    if (gtins.length === 0) {
      return <RappelConsoWelcomeNoBarcode libelle={libelle} />
    } else if (gtins.length === 1) {
      return <RappelConsoWelcomeOneBarcode libelle={libelle} />
    } else {
      return <RappelConsoMultipleBarcode libelle={libelle} />
    }
  } else {
    return <RappelConsoWelcomeNoData />
  }
}

function RappelConsoWelcomeNoBarcode({libelle}: {libelle: string}) {
  return (
    <BlueBanner>
      <p className="mb-4">
        Vous avez acheté le produit <span className="font-bold">{libelle}</span> ayant fait l'objet d'un rappel et/ou ce produit
        est toujours mis en vente malgré le rappel ?
      </p>
      <p className="mb-4">
        SignalConso vous permet d'en informer l'entreprise. De plus, votre signalement est visible par les agents de la répression
        des fraudes qui pourront intervenir si nécessaire.
      </p>
      <p className="mb-4">
        <span className="font-bold">Aucun code-barres</span> n'est associé à ce produit sur RappelConso. Nous ne pouvons donc pas
        identifier automatiquement l'entreprise. Si vous l'avez encore, munissez-vous du produit et de son code-barres, nous vous
        le demanderons à l'étape suivante.
      </p>
      <p className="text-center font-bold mb-2">
        Pas de panique si vous ne l'avez pas, vous pourrez toujours faire le signalement ! Répondez simplement aux questions et
        laissez-vous guider !
      </p>
    </BlueBanner>
  )
}

function RappelConsoWelcomeOneBarcode({libelle}: {libelle: string}) {
  return (
    <BlueBanner>
      <p className="mb-4">
        Vous avez acheté le produit <span className="font-bold">{libelle}</span> ayant fait l'objet d'un rappel et/ou ce produit
        est toujours mis en vente malgré le rappel ?
      </p>
      <p className="mb-4">
        SignalConso vous permet d'en informer l'entreprise. De plus, votre signalement est visible par les agents de la répression
        des fraudes qui pourront intervenir si nécessaire.
      </p>
      <p className="text-center font-bold mb-2">Répondez simplement aux questions et laissez-vous guider !</p>
    </BlueBanner>
  )
}

function RappelConsoMultipleBarcode({libelle}: {libelle: string}) {
  return (
    <BlueBanner>
      <p className="mb-4">
        Vous avez acheté le produit <span className="font-bold">{libelle}</span> ayant fait l'objet d'un rappel et/ou ce produit
        est toujours mis en vente malgré le rappel ?
      </p>
      <p className="mb-4">
        SignalConso vous permet d'en informer l'entreprise. De plus, votre signalement est visible par les agents de la répression
        des fraudes qui pourront intervenir si nécessaire.
      </p>
      <p className="mb-4">
        La produit que vous souhaitez signaler est associé à <span className="font-bold">plusieurs code barres / lots</span> sur
        RappelConso. Nous ne pouvons donc pas identifier automatiquement l'entreprise. Si possible, munissez-vous du produit et de
        son code-barres, nous vous demanderons de choisir parmi ceux fournis par RappelConso.
      </p>
      <p className="text-center font-bold mb-2">
        Pas de panique si vous ne l'avez pas, vous pourrez toujours faire le signalement ! Répondez simplement aux questions et
        laissez-vous guider !
      </p>
    </BlueBanner>
  )
}

function RappelConsoWelcomeNoData() {
  return (
    <BlueBanner>
      <p className="mb-4">
        Vous avez acheté un produit ayant fait l'objet d'un rappel et/ou ce produit est toujours mis en vente malgré le rappel ?
      </p>
      <p className="mb-4">
        SignalConso vous permet d'en informer l'entreprise. De plus, votre signalement est visible par les agents de la répression
        des fraudes qui pourront intervenir si nécessaire.
      </p>
      <p className="mb-4">
        Le produit que vous souhaitez signaler <span className="font-bold">n'a pas pu être identifié automatiquement</span> par
        SignalConso. Cela arrive lorsque SignalConso <span className="font-bold">n'est pas encore synchronisé</span> avec
        RappelConso.
      </p>
      <p className="mb-4">
        En général, la synchronisation intervient dans <span className="font-bold">un délai d'une heure</span>. Vous pouvez
        poursuivre votre signalement, mais vous devrez identifier le produit et l'entreprise manuellement. Si possible,
        munissez-vous du produit et de son code-barres.
      </p>
      <p className="mb-4">Si vous le pouvez, réessayez plus tard.</p>
      <p className="text-center font-bold mb-2">Répondez simplement aux questions et laissez-vous guider !</p>
    </BlueBanner>
  )
}
