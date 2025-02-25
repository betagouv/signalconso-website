import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {CompanySearchResult} from '@/model/Company'
import {useQuery} from '@tanstack/react-query'

export type BarcodeSearchQueryResult = {product?: BarcodeProduct; company?: CompanySearchResult}

export function useBarcodeSearch(barcode?: string, searchProductOnly?: boolean) {
  const {companyApiClient, signalConsoApiClient} = useApiClients()
  const {currentLang} = useI18n()
  const _query = useQuery<BarcodeSearchQueryResult | null>({
    queryKey: ['barcodeSearch', barcode],
    queryFn: async () => {
      if (!barcode) {
        return null
      }
      const product = await signalConsoApiClient.searchByBarcode(barcode)
      if (!product) {
        return {}
      }
      if (!product.siren || searchProductOnly) {
        // No SIREN, probably associated to a foreign company
        // Ex coca 5449000000996
        return {product}
      }
      const companies = await companyApiClient.searchCompaniesByIdentity(product.siren, false, currentLang)
      if (companies.length === 0) {
        return {product}
      }
      const company = companies[0]
      return {product, company}
    },
  })
  return _query
}
