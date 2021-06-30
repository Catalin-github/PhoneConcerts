import { LOCALES } from "../../i18nProvider/locale";
import { SET_LOCALES } from "./actionType";

export default function locale(state = { lang: LOCALES.ENGLISH }, action) {
  switch (action.type) {
    case SET_LOCALES:
      return { lang: action.lang };

    default:
      return state;
  }
}
