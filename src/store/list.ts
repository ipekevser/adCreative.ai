import { createModel } from "@rematch/core";
import { Character, ListState } from "./interface";
import { loadCharacters } from "../helpers/api";
import { getPageNumber } from "../helpers/utils";
import { RootModel } from ".";

const list = createModel<RootModel>()({
  state: {} as ListState,
  reducers: {
    loaded: (state: ListState, payload: any) => ({
      ...state,
      info: payload.info,
      results: payload.results,
    }),
    updateSearchQuery: (state: ListState, query: string) => ({
      ...state,
      searchQuery: query,
      results: [],
      errorMessage: ''
    }),
    checkedCharacters: (state: ListState, character: Character) => {
      const updatedSelectedCharacters = state.selectedCharacters
        ? [...state.selectedCharacters]
        : [];

      const index = updatedSelectedCharacters.findIndex(
        (char) => char.id === character.id
      );

      if (index !== -1) {
        updatedSelectedCharacters.splice(index, 1);
      } else {
        updatedSelectedCharacters.push(character);
      }

      return {
        ...state,
        selectedCharacters: updatedSelectedCharacters,
      };
    },
    addError: (state: ListState, errorMessage: string) => ({
      ...state,
      errorMessage,
    }),
    removeError: (state: ListState) => ({ ...state, errorMessage: "" }),
  },
  effects: (dispatch) => {
    return {
      async load(type, rootState) {
        const nextPageURL = rootState.list.info?.next;
        const searchQuery = rootState.list.searchQuery;

        if (type === "load" && !nextPageURL) {
          return;
        }
        const nextPage = type === "init" ? 1 : getPageNumber(nextPageURL);
        const response = await loadCharacters(nextPage, searchQuery ?? "");

        if (typeof response === "string") {
          dispatch.list.addError(response);
          return;
        }

        const updatedList = {
          info: response.info,
          results:
            nextPage === 1
              ? response.results
              : [...(rootState.list.results || []), ...response.results],
        };
        dispatch.list.loaded(updatedList);
        dispatch.list.removeError();
      },
    };
  },
});

export default list;
