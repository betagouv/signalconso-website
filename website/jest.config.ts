import type {Config} from '@jest/types'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const buildConfig = async (): Promise<Config.InitialOptions> => {
  return {
    testEnvironment: 'jsdom',
    testMatch: ['**/*test.tsx', '**/*test.ts'],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    verbose: false,
    reporters: [
      'default',
      // "jest-html-reporters"
    ],
  }
}
export default createJestConfig(buildConfig)
