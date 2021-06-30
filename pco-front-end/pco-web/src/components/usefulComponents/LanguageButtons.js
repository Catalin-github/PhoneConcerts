import React from "react";
import { connect } from "react-redux";

import { setLocales } from "../../redux/Language/action";
import { LOCALES } from "../../i18nProvider";

function LanguageButtons(props) {
  return (
    <div>
      <button
        className="btn btn-link lang-buttons"
        onClick={() => props.setLocale(LOCALES.ENGLISH)}
      >
        <img src="https://www.countryflags.io/gb/shiny/24.png" alt="English" />
      </button>
      <button
        className="btn btn-link lang-buttons"
        onClick={() => props.setLocale(LOCALES.GERMAN)}
      >
        <img src="https://www.countryflags.io/de/shiny/24.png" alt="Deutsch" />
      </button>
      <button
        className="btn btn-link lang-buttons"
        onClick={() => props.setLocale(LOCALES.ROMANIAN)}
      >
        <img src="https://www.countryflags.io/ro/shiny/24.png" alt="Română" />
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    locales: state.locale.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (lang) => dispatch(setLocales(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageButtons);
