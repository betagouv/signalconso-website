import {Box, BoxProps} from '@mui/material'

interface Props extends BoxProps {
}

export const Section = ({component = 'section', children, ...props}: Props) => {
  return (
    <Box component={component} {...props}>
      <Box sx={{
        py: 3,
        px: 1,
        maxWidth: 1140,
        margin: 'auto',
      }}>
        {children}
      </Box>
    </Box>
  )
}
