import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setLocales } from "../redux/Language/action";
import { I18nProvider } from "../i18nProvider";
import ShareButton from "./usefulComponents/ShareButton";

function fetchConcert() {
  fetch(`/api/concert?id=${window.location.search.split("=")[1]}`)
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      const html = [data].map((concert) => {
        return `
        <div class="concertViewConC">
        <p class="concertNameConC">${concert.name}</p>
        <div class="iframeDiv">${concert.iframe}</div>
        </div>
        `;
      });
      document.querySelector("#concertu").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

class ConcertComponent extends Component {
  render() {
    fetchConcert();

    return (
      <I18nProvider locale={this.props.locales}>
        <div className="mainPageDivsConcert">
          <div className="conCTitleDiv">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none" }}
              className="appMainMessages backButtonConC"
            >
              Back
            </Link>
            <ShareButton />
          </div>
          <div id="concertu"></div>
        </div>
        <div id="concertu"></div>
      </I18nProvider>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ConcertComponent);
