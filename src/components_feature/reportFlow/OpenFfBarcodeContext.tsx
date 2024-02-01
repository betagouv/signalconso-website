import {ChildrenProps} from '@/utils/utils'
import {useSearchParams} from 'next/navigation'
import React, {useContext} from 'react'
import {useReportFlowContext} from './ReportFlowContext'
import {Anomaly} from '@/anomalies/Anomaly'

type ContextShape = {
  getOpenFfBarcode: (currentAnomaly: Anomaly) => string | undefined
}

const OPENFOODFACTS_BARCODE_PARAM = 'offbarcode'

const context = React.createContext<ContextShape>({} as ContextShape)

// OpenFf = Open Food Facts
// /!\ This context use the report, so it has to be setup within the ReportFlow context
export const OpenFfBarcodeContextProvider = ({children}: ChildrenProps) => {
  const query = useSearchParams()
  // TODO see if we still need that
  const {reportDraft} = useReportFlowContext()

  return (
    <context.Provider
      value={{
        getOpenFfBarcode: anomaly => {
          return (anomaly.isSpecialOpenFoodFactsCategory && query.get(OPENFOODFACTS_BARCODE_PARAM)) || undefined
        },
      }}
    >
      {children}
    </context.Provider>
  )
}

export const useOpenFfBarcodeContext = () => useContext(context)
