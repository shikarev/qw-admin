export interface Vendor {
  name: string,
  contact?: string,
  openingHours?: string,
  position?: string,
  picturePath?: string,
  phone?: string,
  phoneExt?: string,
  email?: string,
  site?: string,
  orgName?: string,
  ogrn?: string,
  inn?: string,
  kpp?: string,
  bik?: string,
  paymentAccount?: string,
  returnPhone?: string,
  returnEmail?: string,
  returnName?: string,
  orderBy?: number,
  status?: string,
  language?: string,
  description?: string,
  region?: string,
  deliveriesOntime?: number,
  orgForm?: string,
  address?: string,
  orgAddress?: string,
  returnAddress?: string,
  model?: string,
}

export interface Vendors {
  id: string,
  name: string,
  description?: string,
  site?: string,
  rating?: number,
  feedbackCount?: number,
  contact?: string,
  position?: string,
  phone?: string,
  phoneExt?: string,
  openingHours?: string,
  email?: string,
  inn?: string,
  returnPhone?: string,
  returnEmail?: string,
  returnName?: string,
  picturePath?: string,
  orgName?: string,
  userName?: string,
}

export interface MyShops {
  id: string,
  vendor: VendorInfo,
  role: UserRole,
}

interface UserRole {
  id: string,
  name?: string,
  picturePath?: string,
}

interface VendorInfo {
  created: string,
  id: string,
  name: string,
  picturePath?: string,
  productsCount?: number,
  profit?: number,
}

export interface VendorDocTypes {
  description: string,
  id: string,
  name: string,
  picture_path: string,
}

export interface VendorOrgFormTypes {
  description: string,
  id: string,
  name: string,
}

export interface VendorModel{
  description: string;
  modelId: string;
  name: string;
}

export interface VendorOrgForm{
  description: string;
  id: string;
  name: string;
}

export interface VendorFullInfo{
  name: string;
  orgForm: VendorOrgForm;
  userId: string;
  bik?: string;
  contact?: string;
  description?: string;
  email?: string;
  feedbackCount?: number;
  inn?: string;
  kpp?: string;
  model?: VendorModel;
  ogrn?: string;
  openingHours?: string;
  orderCount?: number;
  orgName?: string;
  paymentAccount?: string;
  phone?: string;
  phoneExt?: string;
  picturePath?: string;
  position?: string;
  productCount?: number;
  rating?: number;
  returnEmail?: string;
  returnName?: string;
  returnPhone?: string;
  site?: string;
  subscriberCount?: number;
}

export interface VendorNativeTypes {
  id: string,
  name: string,
  picturePath?: string;
}

export interface IVendorUser {
  user: string,
  role: string,
  orderBy: number,
  status: string,
  vendor: string,
}
