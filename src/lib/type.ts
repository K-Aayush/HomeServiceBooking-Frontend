export interface PopularBusinessListType {
  id: number;
  name: string;
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  images: string[];
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
  requiter: requiterDataProps[];
  token: string;
  message: string;
}
