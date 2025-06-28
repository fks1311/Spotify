import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface GetServeralCategoriesParams {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface GetServeralCategoriesResponse {
  categories: ApiResponse<Categories>;
}

export interface Categories {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
