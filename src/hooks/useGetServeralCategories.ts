import { useInfiniteQuery } from "@tanstack/react-query";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { GetServeralCategoriesParams } from "../models/category";
import { getServeralCategories } from "../apis/category";
import { toast } from "react-toastify";

export const useGetServeralCategories = ({ limit, offset }: GetServeralCategoriesParams) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["serveral-categories"],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken)
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
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
