'use client'

import {Button} from '@codegouvfr/react-dsfr/Button'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from 'next/navigation'
import {createPortal} from 'react-dom'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {internalPageDefs} from '../core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'
import {replaceLangInPath, switchLang} from '../i18n/I18nTools'
import {AppLangs} from '@/i18n/localization/AppLangs'

export function SwitchLang() {
  const pathname = usePathname()
  const router = useRouter()
  const _report = useReportFlowContext()
  const {m, currentLang} = useI18n()
  const path = replaceLangInPath(pathname, switchLang(currentLang))
  const home = `/${switchLang(currentLang)}`

  const newPath = () => {
    const hasAlternatePageInOtherLang = Object.values(internalPageDefs).find(_ => {
      return _.url != '/' && pathname.includes(_.url) && (_.hasAlternate || currentLang === AppLangs.en)
    })

    return hasAlternatePageInOtherLang ? path : home
  }

  return _report.reportDraft.category ? (
    <>
      <Button className={'fr-btn fr-btn--tertiary'} nativeButtonProps={modal.buttonProps}>
        <span>
          {m.header.currentLangCode}
          <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
        </span>
      </Button>
      <SwitchLangDialog
        onConfirm={() => {
          const p = newPath()
          setCookie('NEXT_LANG', switchLang(currentLang))
          modal.close()
          router.push(p)
        }}
      />
    </>
  ) : (
    <Button
      className={'fr-btn fr-btn--tertiary'}
      linkProps={{
        prefetch: false,
        href: newPath(),
        title: m.header.selectLang,
      }}
    >
      {m.header.currentLangCode}
      <span className="fr-hidden-lg"> - {m.header.currentLang}</span>
    </Button>
  )
}

const modal = createModal({
  id: 'siret-help-modal',
  isOpenedByDefault: false,
})

function SwitchLangDialog({onConfirm}: {onConfirm: () => void}) {
  const {m} = useI18n()

  return (
    <>
      {createPortal(
        <modal.Component
          size="small"
          title={m.switchLang}
          buttons={[
            {
              children: m.confirm,
              doClosesModal: false,
              onClick: onConfirm,
            },
          ]}
        >
          <p className="mb-0" dangerouslySetInnerHTML={{__html: m.pendingReport}} />
        </modal.Component>,
        document.body,
      )}
    </>
  )
}
