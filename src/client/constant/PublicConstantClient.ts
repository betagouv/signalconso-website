import {rawRegions} from './regions'
import {rawDepartments} from './departments'
import {Country, Department, Region} from './Country'
import {ApiClientApi} from '../ApiClient'

export class PublicConstantClient {
  constructor(private client: ApiClientApi) {}

  private readonly regions: Region[] = rawRegions
    .map(region => ({
      label: region.name,
      departments: rawDepartments
        .filter(department => department.region_code === region.code)
        .map(department => ({
          code: department.code,
          label: department.name,
        })),
    }))
    .sort((r1, r2) => r1.label.localeCompare(r2.label))

  private readonly departments: Department[] = rawDepartments.map(_ => ({code: _.code, label: _.name}))

  readonly getRegions = () => {
    // Simulate Async call since it could be moved to the API one day for factorization purpose
    return Promise.resolve(this.regions)
  }

  readonly getDepartements = () => {
    // Simulate Async call since it could be moved to the API one day for factorization purpose
    return Promise.resolve(this.departments)
  }

  readonly getDepartmentByCode = (code: string) => {
    // Simulate Async call since it could be moved in the API for factorization purpose
    return Promise.resolve(this.departments.find(_ => _.code === code))
  }

  readonly getCountries = () => this.client.get<Country[]>(`/constants/countries`)
}
