export type TaxInformation = {
  address: string
  id: string
  internationalName: string
  name: string
  shortName: string
}

export type GetOneCodeTaxResponse = {
  code: string
  desc: string
  data: TaxInformation
}
