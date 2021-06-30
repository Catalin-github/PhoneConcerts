import { SET_LOCALES } from "./actionType";

export const setLocales = (lang) => {
  return {
    type: SET_LOCALES,
    lang,
  };
};
