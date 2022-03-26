import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {AppConfig} from 'conf/appConfig'

export interface ConfigProps {
  config: AppConfig
}

interface Props {
  config: AppConfig
  children: ReactNode
}

const defaultContext: Partial<ConfigProps> = {}

const Config = React.createContext<ConfigProps>(defaultContext as ConfigProps)

export const ConfigProvider = ({config, children}: Props) => {
  return (
    <Config.Provider
      value={{
        config,
      }}
    >
      {children}
    </Config.Provider>
  )
}

export const useConfig = (): ConfigProps => {
  return useContext<ConfigProps>(Config)
}
