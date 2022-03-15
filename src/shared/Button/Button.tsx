import {Btn, BtnProps} from 'mui-extension/lib'
import {forwardRef} from 'react'

export interface ScButtonProps extends BtnProps {

}

export const ScButton = forwardRef((props: ScButtonProps, ref: any) => {
  return <Btn {...props} ref={ref} />
})
