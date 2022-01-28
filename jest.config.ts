import type {Config} from '@jest/types'

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    verbose: true,
  }
};
