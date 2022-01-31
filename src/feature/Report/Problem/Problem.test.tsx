/**
 * @jest-environment jsdom
 */
import React from 'react'
import {Anomaly, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {Problem} from './Problem'
import {genInformation, genSubcategory} from 'test/fixture'
import {fireEvent, render} from 'test/test-utils'
import '@testing-library/jest-dom'
import {fr} from '../../../core/i18n/localization/fr'

class Fixture {
  static readonly simpleSubcategory = genSubcategory()
  static readonly contractualDisputeSubcategory: Subcategory = {...genSubcategory(), tags: [ReportTag.LitigeContractuel]}
  static readonly infoSubcategory: Subcategory = {...genSubcategory(), information: genInformation()}
  static readonly subcategories = [
    Fixture.simpleSubcategory,
    Fixture.contractualDisputeSubcategory,
    Fixture.infoSubcategory,
  ]
  static readonly anomaly: Anomaly = {
    id: '1',
    categoryId: '',
    category: '',
    path: 'myPath',
    subcategories: Fixture.subcategories,
  }
}

describe('Problem', () => {
  it('should display subcategories', () => {
    const x = render(
      <Problem
        anomaly={Fixture.anomaly}
      />
    )
    Fixture.anomaly.subcategories?.forEach(s => {
      expect(x.container.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', async () => {
    const x = render(
      <Problem
        anomaly={Fixture.anomaly}
      />
      , {
        apiSdkMock: {
          rating: {
            rate: (...args: any[]) => Promise.resolve()
          } as any
        }
      })
    const el = x.getByText(Fixture.infoSubcategory.title)
    fireEvent.click(el)
    expect(x.getByText(fr.messages.informationTitle)).not.toBeNull()
  })
})
