import {Box} from '@mui/material'
import {TeamMember} from '../../core/team'
import {Animate} from '../../components_simple/Animate/Animate'
import {useState} from 'react'
import {useTimeout} from 'hooks/useTimeout'
import Image from 'next/image'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'

interface Props {
  member: TeamMember
  disabled?: boolean
}

export const MemberCard = ({member, disabled}: Props) => {
  const iconSize = 70
  const [on, setOn] = useState(false)
  useTimeout(() => {
    setOn(true)
  }, 10)
  return (
    <Box
      sx={{
        ...(disabled && {
          opacity: 0.4,
        }),
        display: 'flex',
        borderRadius: t => t.shape.borderRadius + 'px',
        border: t => `1px solid ${t.palette.divider}`,
        padding: 2,
      }}
    >
      {on && (
        <>
          <Image
            width={iconSize}
            height={iconSize}
            style={{borderRadius: 6}}
            src={`/image/avatars/${member.avatar}`}
            alt={`Avatar ${member.name}`}
          />
          <Animate autoScrollTo={false}>
            <Box sx={{ml: 2}}>
              <Txt truncate block bold size="big">
                {member.name}
              </Txt>
              {member.role.map((role, index) => (
                <Txt truncate block key={index} color="hint">
                  {role}
                </Txt>
              ))}

              {/*<Txt truncate block color="hint">*/}
              {/*  {member.role}*/}
              {/*</Txt>*/}
              {/*{member.dgccrf ? (*/}
              {/*  <Txt block color="hint">*/}
              {/*    Inspecteur{' '}*/}
              {/*    <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>*/}
              {/*  </Txt>*/}
              {/*) : (*/}
              {/*  <Txt block />*/}
              {/*)}*/}
            </Box>
          </Animate>
        </>
      )}
    </Box>
  )
}
