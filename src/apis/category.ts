import axios from "axios";
import { GetServeralCategoriesParams, GetServeralCategoriesResponse } from "../models/category";

/** 카테고리 가져오기 */
export const getServeralCategories = async (
  clientCredentialToken: string,
  params: GetServeralCategoriesParams
): Promise<GetServeralCategoriesResponse> => {
  try {
    const { limit, offset } = params;
    const response = await axios.get(`https://api.spotify.com/v1/browse/categories?country=KR`, {
      params: { limit, offset },
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to get several categories");
  }
};
