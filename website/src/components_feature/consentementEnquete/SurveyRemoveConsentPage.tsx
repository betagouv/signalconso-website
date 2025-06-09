'use client'

import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useForm} from 'react-hook-form'
import {useMutation} from '@tanstack/react-query'
import React, {ReactNode, useState} from 'react'

import {useI18n} from '@/i18n/I18n'
import {useToastError} from '@/hooks/useToastError'
import {useApiClients} from '@/context/ApiClientsContext'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {regexp} from '@/utils/regexp'
import {LinkBackToHome} from '@/components_simple/LinkBackToHome'
import {usePathname} from 'next/navigation'

interface Form {
  email: string
}

export function SurveyRemoveConsentPage() {
  const pathname = usePathname()
  const isWebView = pathname.includes('/webview/')
  const {signalConsoApiClient} = useApiClients()
  const {m, currentLang} = useI18n()
  const toastError = useToastError()
  const [done, setDone] = useState(false)

  const removeConsent = useMutation({
    mutationKey: ['removeConsentFromSurvey'],
    mutationFn: (email: string) => signalConsoApiClient.removeConsent(email),
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<Form>()

  const onSubmit = (form: Form) => {
    removeConsent.mutate(form.email, {
      onSuccess: () => setDone(true),
      onError: () => toastError(),
    })
  }

  return (
    <LimitedWidthPageContainer>
      {done ? (
        <>
          <Alert
            description={m.removeConsent.removeConsentdSuccessMessage}
            severity="success"
            title={m.removeConsent.removeConsentdTitle}
            className="mt-4 mb-8"
          />
          <LinkBackToHome isWebView={isWebView} lang={currentLang} />
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="fr-h6">{m.removeConsent.removeConsentFromSurvey}</h2>
          <p>Remplissez le formulaire ci-dessous pour retirer votre consentement.</p>
          <ScTextInput
            label={<WithIcon icon="fr-icon-mail-line mb-2">{m.email}</WithIcon>}
            autocomplete="email"
            placeholder={m.removeConsent.emailDesc}
            // type="email"
            {...register('email', {
              required: {value: true, message: m.required},
              pattern: {value: regexp.email, message: m.invalidEmail},
            })}
            error={!!errors['email']}
            helperText={errors['email']?.message}
            required
          />

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={removeConsent.isPending}>
              {m.removeConsent.removeConsent}
            </Button>
          </div>
        </form>
      )}
    </LimitedWidthPageContainer>
  )
}

function WithIcon({children, icon}: {children: ReactNode; icon: string}) {
  return (
    <>
      <span className={`${icon} mr-1`} aria-hidden="true" /> {children}
    </>
  )
}
