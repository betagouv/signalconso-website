import * as React from 'react'
import {ReactElement} from 'react'
import {Box, Checkbox, Icon, Input, InputAdornment, InputProps, Menu} from '@mui/material'
import {AutocompleteItemProps} from './AutocompleteItem'
import {makeSx} from '../_utils/common'

const sx = makeSx({
  menu_head: {
    mt: -1,
    borderBottom: t => `1px solid ${t.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    minHeight: 48,
  },
  menu_headWithCb: {
    pl: 0,
  },
  menu_input: {
    background: 'none',
    border: 'none',
    width: '100%',
    height: 30,
    fontSize: '1rem',
    color: t => t.palette.text.primary,
  },
  menu_items: {
    maxHeight: 300,
    overflowY: 'auto',
    minWidth: 220,
  },
  adornment: {
    height: 20,
    color: t => t.palette.text.secondary,
    verticalAlign: 'top',
  }
})

interface AutocompletePropsBase extends Omit<InputProps, 'value' | 'onChange' | 'children'> {
  searchLabel?: string
  readonly?: boolean
  children?: ReactElement<AutocompleteItemProps>[]
}

interface AutocompleteMultipleProps extends AutocompletePropsBase {
  multiple: true
  value?: string[]
  onChange: (value: string[]) => void
}

interface AutocompleteSimpleProps extends AutocompletePropsBase {
  multiple?: false
  value?: string
  onChange: (value: string) => void
}

export type AutocompleteProps = AutocompleteMultipleProps | AutocompleteSimpleProps

export const Autocomplete = ({value, multiple, searchLabel, readonly, children, onChange}: AutocompleteProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [filter, setFilter] = React.useState<string | undefined>(undefined)
  let $input: HTMLElement | undefined = undefined

  const open = (event: any) => setAnchorEl(event.currentTarget)

  const close = () => {
    setAnchorEl(null)
    setFilter('')
  }

  const handleChange = (changedValue: string) => {
    const getValue = () => {
      if (multiple) {
        return (value?.indexOf(changedValue) === -1) ? (value as string[]).concat(changedValue) : (value as string[]).filter(_ => _ !== changedValue)
      } else {
        close()
        return value !== changedValue ? changedValue : ''
      }
    }
    onChange(getValue() as any)
  }

  const getFilteredChildren = (): ReactElement<AutocompleteItemProps>[] => {
    if (!children) return []
    const items = React.Children.map(children, _ => _)
    return (filter && filter !== '')
      ? items.filter(_ => _.props.value.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      : items
  }

  const selectAll = (event: any, checked: boolean) => {
    if(children) {
      const values: string[] = checked ? React.Children.map(children, (_: ReactElement<AutocompleteItemProps>) => _.props.value) : []
      onChange(values as any)
    }
  }

  const optionsCount = React.Children.count(children)
  const filteredChildren = getFilteredChildren()

  return (
    <>
      <Input
        onClick={open}
        value={multiple ? value && (value as string[]).join(', ') : value}
        disabled={readonly}
        inputRef={(n: any) => $input = n ?? undefined}
        endAdornment={
          <InputAdornment position="end">
            <Icon sx={sx.adornment}>arrow_drop_down</Icon>
          </InputAdornment>
        }
      />
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={close}>
        <Box sx={{...sx.menu_head, ...multiple && sx.menu_headWithCb}}>
          {multiple &&
          <Checkbox
            checked={!!value && value.length === optionsCount}
            onChange={selectAll}
            indeterminate={!!value && (value.length > 0 && value.length < optionsCount)}
            disabled={readonly}/>
          }
          <Box
            component="input"
            autoFocus
            sx={sx.menu_input}
            placeholder={searchLabel}
            style={!multiple ? {marginLeft: 12} : {}}
            onChange={e => setFilter(e.target.value)}
          />
        </Box>
        {/*// @ts-ignore*/}
        <Box sx={sx.menu_items} style={{width: $input?.clientWidth}}>
          {filteredChildren.map(_ =>
            React.cloneElement(_, {
              ..._.props,
              multiple: multiple,
              checked: !!value && value.indexOf(_.props.value) !== -1,
              onClick: handleChange,
            })
          )}
        </Box>
      </Menu>
    </>
  )
}
