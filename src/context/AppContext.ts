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
  requiterData: requiterDataProps | null;
  setRequiterData: React.Dispatch<
    React.SetStateAction<requiterDataProps | null>
  >;
  backendUrl: string;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  users: object;
  setUsers: React.Dispatch<React.SetStateAction<object>>;
  totalUsers: object;
  setTotalUsers: React.Dispatch<React.SetStateAction<object>>;
  fetchAllUsers: () => void;
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
  requiterData: null,
  setRequiterData: () => {},
  backendUrl: "",
  logout: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: "",
  setError: () => {},
  users: {},
  setUsers: () => {},
  totalUsers: {},
  setTotalUsers: () => {},
  fetchAllUsers: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
