'use client'
import {useTimeout} from 'hooks/useTimeout'
import Image from 'next/legacy/image'
import {useState} from 'react'
import {Animate} from './Animate'
import {TeamMember} from '../core/team'
import {useColors} from '@codegouvfr/react-dsfr/useColors'

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
  const dsfrTheme = useColors()

  return (
    <>
      <div className={`flex p-4 ${disabled ? ' bg-gray-200 ' : '  border border-solid border-black'}`}>
        {on && (
          <>
            <div className="shrink-0">
              <Image
                width={iconSize}
                height={iconSize}
                style={{borderRadius: 6}}
                src={`/image/avatars/${member.avatar}`}
                alt=""
              />
            </div>
            <Animate autoScrollTo={false}>
              <div className="ml-3">
                <p className="font-medium text-lg m-0">{member.name}</p>
                {member.role.map((role, index) => (
                  <p key={index} className={`${disabled ? 'text-gray-600 ' : 'text-gray-500'} m-0`}>
                    {role}
                  </p>
                ))}
              </div>
            </Animate>
          </>
        )}
      </div>
    </>
  )
}
