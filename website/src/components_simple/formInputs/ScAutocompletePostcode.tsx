import {ScAutocompleteGeoArea, ScAutocompleteGeoAreaProps} from './ScAutocompleteGeoArea'

type Props = Omit<ScAutocompleteGeoAreaProps, 'noDepartements' | 'onChange'> & {
  onChange: (a: string) => void
}

export function ScAutocompletePostcode(props: Props) {
  const {onChange, ...restOfProps} = props
  return (
    <ScAutocompleteGeoArea
      noDepartements={true}
      onChange={geoArea => {
        if (geoArea.kind === 'department') {
          throw new Error(`This autocomplete should not be able return a department (${geoArea.dpt.name})`)
        }
        onChange(geoArea.postalCode)
      }}
      {...restOfProps}
    />
  )
}
