export interface Country {
  code: string
  name: string
  european: boolean
  transfer: boolean
}

export interface Region {
  label: string
  departments: Department[]
}

export interface Department {
  code: string
  label: string
}
