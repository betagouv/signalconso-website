import {mkdtempSync, writeFileSync} from 'fs'
import {tmpdir} from 'os'
import {join} from 'path'
import {pathToFileURL} from 'url'
import {health, readBuildInfo} from './health.service'

describe('Health service', () => {
  const writeBuildInfo = (content: string): URL => {
    const file = join(mkdtempSync(join(tmpdir(), 'buildinfo-')), 'buildinfo.json')
    writeFileSync(file, content)
    return pathToFileURL(file)
  }

  test('should read build info', () => {
    const url = writeBuildInfo(JSON.stringify({version: '1.1.0', gitCommit: 'abc123', buildTime: '2026-11-03T10:00:00.000Z'}))
    expect(readBuildInfo(url)).toEqual({version: '1.1.0', gitCommit: 'abc123', buildTime: '2026-11-03T10:00:00.000Z'})
  })

  test('should fallback to unknown when build info is missing', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    expect(readBuildInfo(pathToFileURL('/does/not/exist/buildinfo.json'))).toEqual({
      version: 'unknown',
      gitCommit: 'unknown',
      buildTime: 'unknown',
    })
  })

  test('should expose name with build info', () => {
    expect(health({version: '1.1.0', gitCommit: 'abc123', buildTime: '2026-11-03T10:00:00.000Z'})).toEqual({
      name: 'signalconso-mobile-tools',
      version: '1.1.0',
      gitCommit: 'abc123',
      buildTime: '2026-11-03T10:00:00.000Z',
    })
  })
})
