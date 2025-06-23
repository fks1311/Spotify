import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

/** 프로필 정보를 가져오는 커스텀 훅입니다. */
export const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const access_token = sessionStorage.getItem("access_token");

  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!access_token, // access_token 없으면 실행 안함
  });
};
