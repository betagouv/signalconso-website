import type {Config} from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    testMatch: ['**/*.test.tsx'],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    verbose: false,
    reporters: [
      "default",
      // "jest-html-reporters"
    ],
  }
};
