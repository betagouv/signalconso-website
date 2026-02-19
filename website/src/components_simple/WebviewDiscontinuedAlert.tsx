'use client'

import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'

export function WebviewDiscontinuedAlert() {
  return (
    <div className="p-2 text-center">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#000091] mb-4">Application mobile non disponible</h1>
        <Alert
          severity="error"
          title="L'application mobile SignalConso n'est plus disponible"
          description={
            <div className="space-y-3">
              <p className="text-lg">L'application mobile a été retirée des stores et n'est plus maintenue.</p>
              <p className="text-lg font-semibold">
                Pour continuer à utiliser SignalConso, veuillez vous rendre sur le site web :
              </p>
            </div>
          }
        />
      </div>

      <div className="space-y-4">
        <Button
          priority="primary"
          size="large"
          linkProps={{
            href: 'https://signal.conso.gouv.fr',
            target: '_blank',
          }}
          className="w-full !text-xl !py-4"
        >
          Aller sur signal.conso.gouv.fr
        </Button>

        <div className="text-center text-gray-600">
          <p className="text-sm">
            Copiez cette adresse dans votre navigateur mobile :<br />
            <span className="font-mono font-bold text-base">signal.conso.gouv.fr</span>
          </p>
        </div>
      </div>
    </div>
  )
}
