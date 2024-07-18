import useSWR from "swr";
import { Product, ProductCreate } from "../schema/product-schema";

export const useGetProducts = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    products: Product[];
  }>("/api/products", (url) => fetch(url).then((res) => res.json()), {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export async function getProducts(controller?: AbortController) {
  return fetch("/api/products", {
    method: "GET",
    signal: controller?.signal,
  });
}

export async function postProduct(
  body: ProductCreate,
  controller?: AbortController
) {
  return fetch("/api/product", {
    method: "POST",
    body: JSON.stringify(body),
    signal: controller?.signal,
  });
}

export async function putProduct(
  id: number,
  body: ProductCreate,
  controller?: AbortController
) {
  return fetch(`/api/product/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    signal: controller?.signal,
  });
}

export async function deleteProduct(id: number, controller?: AbortController) {
  return fetch(`/api/product/${id}`, {
    method: "DELETE",
    signal: controller?.signal,
  });
}
