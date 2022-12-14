import {Box} from '@mui/material'
import {Member} from '../../pages/qui-sommes-nous'
import {Txt} from '../../alexlibs/mui-extension'

interface Props {
  member: Member
}

export const MemberCard = ({member}: Props) => {
  const iconSize = 70
  return (
    <Box
      sx={{
        ...(member.disabled && {
          opacity: 0.4,
        }),
        display: 'flex',
        borderRadius: t => t.shape.borderRadius + 'px',
        border: t => `1px solid ${t.palette.divider}`,
        padding: 2,
      }}
    >
      <img
        style={{height: iconSize, width: iconSize, borderRadius: 6}}
        src={`/image/avatars/${member.avatar}`}
        alt={`Avatar ${member.name}`}
      />
      <Box sx={{ml: 2}}>
        <Txt truncate block bold size="big">
          {member.name}
        </Txt>
        <Txt truncate block color="hint">
          {member.role}
        </Txt>
        {member.dgccrf ? (
          <Txt block color="hint">
            Inspecteur <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>
          </Txt>
        ) : (
          <Txt block />
        )}
      </Box>
    </Box>
  )
}
