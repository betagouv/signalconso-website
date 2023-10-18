'use client'

import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()

  return (
    <div className="bg-red-100 flex flex-col gap-4">
      <Link href={'/somewhere'}>Next.js' Link</Link>
      <Link href={'#'}>Next.js' Link to #</Link>
      <Link href={'#'} onClick={() => {}}>
        Next.js' Link to # with onClick
      </Link>

      <Button
        linkProps={{
          href: '/somewhere',
        }}
      >
        I'm a Button with linkProps and href
      </Button>
      <Button
        linkProps={{
          href: '#',
        }}
      >
        I'm a Button with linkProps and href to #
      </Button>
      <Button
        linkProps={{
          href: '#',
          onClick: () => {},
        }}
      >
        I'm a Button with linkProps and href to # and onClick
      </Button>
    </div>
  )

  // return (
  //   <a
  //     href="#"
  //     className="fr-btn fr-btn--tertiary"
  //     onClick={e => {
  //       e.preventDefault()
  //       //Reset report on lang switch
  //       _report.resetFlow()
  //       const path = replaceLangInPath(pathname, switchLang(currentLang))
  //       setCookie('NEXT_LANG', switchLang(currentLang))
  //       router.push(path)
  //     }}
  //     title={m.header.selectLang}
  //   >
  //     {m.header.currentLangCode}
  //     <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
  //   </a>
  // )
}
