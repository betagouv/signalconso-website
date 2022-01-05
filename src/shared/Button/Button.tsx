import {Btn, BtnProps} from 'mui-extension/lib'
import {forwardRef} from 'react'

export const ScButton = forwardRef((props: BtnProps, ref: any) => {
  return <Btn {...props} ref={ref} />
})
