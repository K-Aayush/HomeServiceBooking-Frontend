import { createContext } from "react";
import { PopularBusinessListType, requiterDataProps } from "../lib/type";

//Type of AppContext
interface AppContextType {
  searchFilter: { title: string };
  setSearchFilter: React.Dispatch<React.SetStateAction<{ title: string }>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  business: PopularBusinessListType[];
  setBusiness: React.Dispatch<React.SetStateAction<PopularBusinessListType[]>>;
  businessByCategory: PopularBusinessListType[];
  fetchBusinessByCategory: (category: string) => void;
  showRequiterLogin: boolean;
  setShowRequiterLogin: React.Dispatch<React.SetStateAction<boolean>>;
  requiterToken: string | null;
  setRequiterToken: React.Dispatch<React.SetStateAction<string | null>>;
  requiterData: requiterDataProps[];
  setRequiterData: React.Dispatch<React.SetStateAction<requiterDataProps[]>>;
  backendUrl: string;
}

const defaultValue: AppContextType = {
  searchFilter: { title: "" },
  setSearchFilter: () => {},
  isSearched: false,
  setIsSearched: () => {},
  business: [],
  setBusiness: () => {},
  businessByCategory: [],
  fetchBusinessByCategory: () => {},
  showRequiterLogin: false,
  setShowRequiterLogin: () => {},
  requiterToken: null,
  setRequiterToken: () => {},
  requiterData: [],
  setRequiterData: () => {},
  backendUrl: "",
};

export const AppContext = createContext<AppContextType>(defaultValue);
