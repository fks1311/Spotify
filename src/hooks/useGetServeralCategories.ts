import { useInfiniteQuery } from "@tanstack/react-query";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { GetServeralCategoriesParams } from "../models/category";
import { getServeralCategories } from "../apis/category";

export const useGetServeralCategories = ({ limit, offset }: GetServeralCategoriesParams) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["serveral-categories"],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) throw new Error("No Token");
      return getServeralCategories(clientCredentialToken, { limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.categories.next) {
        const url = new URL(lastPage.categories.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!clientCredentialToken,
  });
};
