export interface PopularBusinessListType {
  id: number;
  name: string;
  about: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  images: imageUrl[];
}

export interface imageUrl {
  url: string;
}

export interface BusinessListProps {
  businessList: PopularBusinessListType[];
  title: string;
  pagehref: string;
}

export interface BusinessDetailsProps {
  business: PopularBusinessListType | null;
}

export interface SuggestedBusinessDetailsProps {
  business: PopularBusinessListType[];
}

export interface requiterDataProps {
  id: string;
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  requiterProfileImage: string;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface loginResponse {
  success: boolean;
  requiter: requiterDataProps;
  token: string;
  message: string;
}

export interface tokenCheck {
  success: boolean;
  requiter: requiterDataProps;
  message: string;
}

export interface businessDataProps {
  name: string;
  category: string;
  address: number;
  about: number;
}

export interface businessDataResponse {
  success: boolean;
  message: string;
  product: businessDataProps;
  token: string;
  images: string[];
}
