export interface PopularBusinessListType {
  id: number;
  name: string;
  about: string;
  address: string;
  cateory: {
    name: string;
  };
  contactPerson: string;
  email: string;
  images: string[];
}
