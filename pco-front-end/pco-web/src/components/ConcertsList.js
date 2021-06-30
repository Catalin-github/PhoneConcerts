import React, { Component } from "react";
import { connect } from "react-redux";
import { setLocales } from "../redux/Language/action";
import { I18nProvider } from "../i18nProvider";
// import ShareButton from "../components/usefulComponents/ShareButton";
import ".././index.css";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function fetchList() {
  fetch("/api/concerts")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      const html = data.concerts
        .map((concerts) => {
          const concertStartTime = new Date(concerts.startTime);
          const dateDay = concertStartTime.getDate();
          const monthName = month[concertStartTime.getMonth()];
          return `
        <a href="/concert?id=${concerts.id}">
          <div class ="concertData">
            <p class="concertThumbnail"><img src ="${
              concerts.thumbnail
            }" alt ="concert thumbnail" class="concertThumbnail"/></p>
            <div class="concertName_Description"><p class="concertName">${
              concerts.name
            }</p>
            <div class = "concertDescriptionDiv "><p class="concertDescription">${
              concerts.description
            }</p></div></div>
              <p class="concertDate">${dateDay + " " + monthName}</p>
          </div>
        </a>
        `;
        })
        .join("");
      document.querySelector("#list").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}
class ConcertList extends Component {
  render() {
    fetchList();
    return (
      <I18nProvider locale={this.props.locales}>
        {/* <ShareButton /> */}
        <div className="concertList">
          <div id="list"></div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ConcertList);
