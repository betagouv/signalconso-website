import {useTimeout} from 'hooks/useTimeout'
import Image from 'next/legacy/image'
import {useState} from 'react'
import {Animate} from '../../components_simple/Animate/Animate'
import {TeamMember} from '../../core/team'

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
    <>
      <div className={`flex rounded-lg border border-gray-200 p-4 ${disabled ? 'opacity-40' : ''}`}>
        {on && (
          <>
            <div className="shrink-0">
              <Image
                width={iconSize}
                height={iconSize}
                style={{borderRadius: 6}}
                src={`/image/avatars/${member.avatar}`}
                alt={`Avatar ${member.name}`}
              />
            </div>
            <Animate autoScrollTo={false}>
              <div className="ml-3">
                <p className="font-medium text-lg m-0">{member.name}</p>
                {member.role.map((role, index) => (
                  <p key={index} className="text-gray-500 m-0">
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
