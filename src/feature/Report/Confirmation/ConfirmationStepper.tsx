import React, {ReactElement, ReactNode} from 'react'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Txt} from '../../../alexlibs/mui-extension'
import {Box} from '@mui/material'
import {ScButton} from 'shared/Button/Button'
import {useI18n} from 'core/i18n'
import {useReportFlowContext} from '../ReportFlowContext'
import {useStepperContext} from 'shared/Stepper/Stepper'

interface ConfirmationStepperProps {
  children: Array<ReactElement<ConfirmationStepProps>>
}

interface ConfirmationStepProps {
  title?: ReactNode
  children?: ReactNode
  index?: number
}

export const ConfirmationStepper = ({children}: ConfirmationStepperProps) => {
  return <>{children.map((child, index) => React.cloneElement(child, {...child.props, key: index, index}))}</>
}

export const ConfirmationStep = ({title, children, index}: ConfirmationStepProps) => {
  const indexSize = 40
  const {m} = useI18n()
  const _stepper = useStepperContext()
  return (
    <Panel
      title={
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Txt color="hint" sx={{mr: 1}}>
            {index! + 1}.
          </Txt>
          <Txt>{title}</Txt>
          <ScButton
            sx={{marginLeft: 'auto'}}
            size="small"
            variant="outlined"
            icon="edit"
            color="primary"
            onClick={() => _stepper.goTo(index!)}
          >
            {m.edit}
          </ScButton>
        </Box>
      }
    >
      <PanelBody>{children}</PanelBody>
      {/*<Box sx={{display: 'flex', alignItems: 'center'}}>*/}
      {/*  <Box sx={{*/}
      {/*    // mr: 2,*/}
      {/*    // height: indexSize,*/}
      {/*    // width: indexSize,*/}
      {/*    // fontSize: t => styleUtils(t).fontSize.big,*/}
      {/*    // fontWeight: t => t.typography.fontWeightBold,*/}
      {/*    // display: 'flex',*/}
      {/*    // alignItems: 'center',*/}
      {/*    // justifyContent: 'center',*/}
      {/*    // border: t => `1px solid ${t.palette.divider}`,*/}
      {/*    // borderRadius: indexSize,*/}
      {/*  }}>*/}
      {/*    {index}*/}
      {/*  </Box>*/}
      {/*  <Txt size="title">{title}</Txt>*/}
      {/*</Box>*/}
      {/*<Box>{children}</Box>*/}
    </Panel>
  )
}
