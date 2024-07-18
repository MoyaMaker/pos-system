"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useGetProducts } from "@/lib/services/product-service";
import { Product } from "../schema/product-schema";

type ProductsContextType = {
  data: { products: Product[] } | undefined;
  error: any;
  isLoading: boolean;
  editProduct: Product | undefined;
  setEditProduct: Dispatch<SetStateAction<Product | undefined>>;
  addData(product: Product): void;
  updateData(product: Product): void;
  removeData(id: number): void;
};

type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const { data, error, isLoading, isValidating, mutate } = useGetProducts();
  const [editProduct, setEditProduct] = useState<Product | undefined>();

  const addData = (product: Product) => {
    const newData = [...data?.products!, product];

    mutate({
      products: newData,
    });
  };

  const updateData = (product: Product) => {
    const newData = data!.products!.map((prod) =>
      prod.id === product.id ? product : prod
    );

    mutate({
      products: newData,
    });
  };

  const removeData = (id: number) => {
    const newData = data!.products!.filter((prod) => prod.id !== id);

    mutate({
      products: newData,
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        data,
        error,
        isLoading,
        editProduct,
        setEditProduct,
        addData,
        updateData,
        removeData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts has to be used within <ProductsProvider.Provider>"
    );
  }

  return context;
};
