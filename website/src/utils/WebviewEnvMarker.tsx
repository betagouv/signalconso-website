import {appConfig} from '@/core/appConfig'

export function WebviewEnvMarker() {
  const marker = appConfig.envMarker ?? (appConfig.isDev ? 'dév' : null)
  if (marker) {
    return (
      <div className="absolute z-[999] pointer-events-none top-0 left-0 w-full flex items-center justify-center">
        <div className="text-green-900 border-green-900 border border-solid w-fit p-1 text-sm bg-white bg-opacity-80">
          webview {marker}
        </div>
      </div>
    )
  }
  return null
}
