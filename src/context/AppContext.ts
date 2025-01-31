import { createContext } from "react";
import { PopularBusinessListType } from "../lib/type";

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
};

export const AppContext = createContext<AppContextType>(defaultValue);
