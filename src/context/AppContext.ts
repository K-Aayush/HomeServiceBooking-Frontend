import { createContext } from "react";
import {
  PopularBusinessListType,
  requiterDataProps,
  TotalUsersState,
  usersState,
} from "../lib/type";

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
  users: usersState;
  setUsers: React.Dispatch<React.SetStateAction<usersState>>;
  totalUsers: TotalUsersState;
  setTotalUsers: React.Dispatch<React.SetStateAction<TotalUsersState>>;
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
  users: { total: [], user: [], requiter: [] },
  setUsers: () => {},
  totalUsers: { total: 0, user: 0, requiter: 0 },
  setTotalUsers: () => {},
  fetchAllUsers: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
