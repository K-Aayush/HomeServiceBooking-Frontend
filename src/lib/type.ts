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
}
