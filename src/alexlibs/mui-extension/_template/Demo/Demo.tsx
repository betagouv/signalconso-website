import * as React from 'react'
import {useState} from 'react'
import {Box, Collapse, Icon, IconButton} from '@mui/material'
import {Pre} from './Pre/Pre'
import {Panel} from '../../Panel'

export interface DemoProps {
  component: any
  raw: string
  reloadable?: boolean
}

const parseComponentCode = (code: string): string => code.replace(/\n\s*\/\/\s*@ts-ignore\s*?\n/, '\n')

export const Demo = ({component: Component, raw, reloadable}: DemoProps) => {
  const [codeOpened, setCodeOponed] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(true)
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined)
  const componentContainer = React.createRef()

  const reload = () => {
    // Manually handle container height is relevant when to prevent the
    // container to blink when the content is animated.
    if (!containerHeight) {
      setContainerHeight((componentContainer.current as any).offsetHeight - 32)
    }
    setShow(false)
    setTimeout(() => setShow(true))
    setTimeout(() => setContainerHeight(undefined))
  }

  return (
    <Panel>
      <Box sx={{
        mt: 1,
        mr: 2,
        mb: 1 / 2,
        ml: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        {reloadable &&
        <IconButton disabled={!show} onClick={reload} size="large">
          <Icon>refresh</Icon>
        </IconButton>
        }
        <IconButton
          color={codeOpened ? 'primary' : undefined}
          onClick={() => setCodeOponed(!codeOpened)}
          size="large">
          <Icon>code</Icon>
        </IconButton>
      </Box>
      <Collapse in={codeOpened} unmountOnExit>
        <Pre raw={parseComponentCode(raw)} style={{margin: 0, borderRadius: 0}}/>
      </Collapse>
      <Box
        sx={{
          p: 2,
          m: 1,
          background: t => t.palette.background.paper,
        }}
        ref={componentContainer as any}
        style={{height: containerHeight}}
      >
        {show && <Component/>}
      </Box>
    </Panel>
  );
}

