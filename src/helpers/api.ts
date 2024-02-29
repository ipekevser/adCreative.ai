import { Character } from "../store/interface";
import endpoints from "./endpoints";

export interface ApiResponse {
  results: ReadonlyArray<Character>;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export const loadCharacters = async (
  page: number,
  name: string
): Promise<ApiResponse | string> => {
  try {
    const result = await fetch(
      endpoints.characterList() + `?page=${page}&name=${name}`
    );
    const data = await result.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error: any) {
    return error.message;
  }
};
