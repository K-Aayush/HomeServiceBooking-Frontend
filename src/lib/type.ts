export interface PopularBusinessListType {
  id: number;
  name: string;
  about: string;
  address: string;
  category: string;
  requiter: {
    name: string;
    email: string;
  };
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
  role: string;
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

export interface TotalUsersState {
  total: number;
  user: number;
  requiter: number;
}

interface user {
  id: string;
  name: string;
  email: string;
  userProfileImage: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  requiterProfileImage: string;
}

interface total {
  id: string;
  name: string;
  email: string;
  userProfileImage: string;
}

export interface usersState {
  total: total[];
  user: user[];
  requiter: requiterDataProps[];
}
