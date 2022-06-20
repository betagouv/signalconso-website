import {Box, BoxProps} from '@mui/material'

interface Props extends BoxProps {}

export const Section = ({component = 'section', dangerouslySetInnerHTML, children, ...props}: Props) => {
  return (
    <Box component={component} {...props}>
      <Box
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        sx={{
          py: 3,
          px: 2,
          maxWidth: 1140,
          margin: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
