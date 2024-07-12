"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useGetCategories } from "@/lib/services/category-service";
import { Category } from "../schema/category-schema";

type CategoriesContextType = {
  data: { categories: Category[] } | undefined;
  error: any;
  isLoading: boolean;
  editCategory: Category | undefined;
  setEditCategory: Dispatch<SetStateAction<Category | undefined>>;
  addData(category: Category): void;
  updateData(category: Category): void;
  removeData(id: number): void;
};

type CategoriesProviderProps = {
  children: React.ReactNode;
};

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const { data, error, isLoading, isValidating, mutate } = useGetCategories();
  const [editCategory, setEditCategory] = useState<Category | undefined>();

  const addData = (category: Category) => {
    const newData = [...data?.categories!, category];

    mutate({
      categories: newData,
    });
  };

  const updateData = (category: Category) => {
    const newData = data!.categories!.map((cat) =>
      cat.id === category.id ? category : cat
    );

    mutate({
      categories: newData,
    });
  };

  const removeData = (id: number) => {
    const newData = data!.categories!.filter((cat) => cat.id !== id);

    mutate({
      categories: newData,
    });
  };

  return (
    <CategoriesContext.Provider
      value={{
        data,
        error,
        isLoading,
        editCategory,
        setEditCategory,
        addData,
        updateData,
        removeData,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories has to be used within <CategoriesProvider.Provider>"
    );
  }

  return context;
};
