export interface Product {
  id: string;
  product: ProductContents;
  vendorId: string;
  code?: string;
}

export interface ProductContents {
  id: string;
  name: string;
}

export interface ProductForm {
  manufacturer: string,
  category: string,
  description: string,
  name: string
}

export enum currencies {
  rub = "RUB"
}

export interface ProductPriceForm {
  cost: number,
  oldCost: number,
  startDate: string,
  endDate: string,
}

export interface ProductPrice extends ProductPriceForm{
  vendor: string,
  code: string
  premiumCost?: number,
  orderBy?: number,
  status: string,
  currency: currencies,
  product: string,
  modName?: string,
  modStr?: string,
}