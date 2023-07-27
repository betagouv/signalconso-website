'use client'

import dynamic from 'next/dynamic'
import {ReportFlowStepper} from './ReportFlowStepper'

// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
export const ReportFlowStepperWithoutSsr = dynamic(() => Promise.resolve(ReportFlowStepper), {ssr: false})
