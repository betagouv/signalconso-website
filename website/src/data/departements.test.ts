import {findDepartements} from './departments'

describe('findDepartements', () => {
  test('search with exact name', () => {
    const names = findDepartements('Haute-Garonne').map(_ => _.name)
    expect(names).toEqual(['Haute-Garonne'])
  })
  test('search with approximate name', () => {
    const names = findDepartements('deUX sevr').map(_ => _.name)
    expect(names).toEqual(['Deux-Sèvres'])
  })
  test('search with multiple matches', () => {
    const names = findDepartements('haute').map(_ => _.name)
    expect(names).toEqual(['Haute-Garonne', 'Haute-Loire', 'Haute-Marne', 'Hautes-Pyrénées', 'Haute-Saône'])
  })
  test('search with code', () => {
    const codes = findDepartements('31').map(_ => _.code)
    expect(codes).toEqual(['31'])
  })
  test('search with code containg letters', () => {
    const codes = findDepartements('2A').map(_ => _.code)
    expect(codes).toEqual(['2A'])
  })
  test('search with code matching several', () => {
    const codes = findDepartements('71').map(_ => _.code)
    expect(codes).toEqual(['71', '971'])
  })
  test('search with query too short', () => {
    const codes = findDepartements('a').map(_ => _.code)
    expect(codes).toEqual([])
  })
})
