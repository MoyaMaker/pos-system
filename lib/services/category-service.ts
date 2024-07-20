import useSWR from "swr";
import { Category, CategoryCreate } from "../schema/category-schema";

export const useGetCategoriesProducts = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    categories: Category[];
  }>(
    `/api/categories-products`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export const useGetCategories = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    categories: Category[];
  }>(`/api/categories`, (url) => fetch(url).then((res) => res.json()), {
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

export async function getCategories(
  controller?: AbortController
): Promise<Response> {
  return fetch("api/categories", {
    method: "GET",
    signal: controller?.signal,
  });
}

export async function postCategory(
  body: CategoryCreate,
  controller?: AbortController
): Promise<Response> {
  return fetch("/api/category", {
    method: "POST",
    body: JSON.stringify(body),
    signal: controller?.signal,
  });
}

export async function putCategory(
  id: number,
  body: CategoryCreate,
  controller?: AbortController
): Promise<Response> {
  return fetch(`/api/category/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    signal: controller?.signal,
  });
}

export async function deleteCategory(
  id: number,
  controller?: AbortController
): Promise<Response> {
  return fetch(`/api/category/${id}`, {
    method: "DELETE",
    signal: controller?.signal,
  });
}
