'use client'

import dynamic from 'next/dynamic'
import {ReportFlowStepper} from './ReportFlowStepper'

export const ReportFlowStepperWithoutSsr = dynamic(() => Promise.resolve(ReportFlowStepper), {ssr: false})
