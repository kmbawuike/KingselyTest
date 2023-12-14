export type UserType = {
  name: string;
  agreedToTerms: boolean
  createdDate: string;
  id: number
  sectors: SectorType[]
}

export type SectorType = {
  id: number
  name: string
}

export type Option = {
  label: string;
  value: string
}