import React, { Component } from "react";
import Facebook from "../../images/icon-facebook.png";
import Twitter from "../../images/icon-twitter.png";
import Instagram from "../../images/icon-instagram.png";
import CloseButton from "../../images/close-window-48.png";

class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareOption: false,
    };
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ shareOption: !this.state.shareOption });
          }}
          className="appMainMessages shareButton"
        >
          Share
        </button>
        {this.state.shareOption ? (
          <div className="shareWindow">
            <ul className="icons">
              <li className="socialIcon">
                <a
                  href={`https://www.facebook.com/sharer.php?u=${encodeURI(
                    document.location.href
                  )}`}
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    this.setState({ shareOption: !this.state.shareOption });
                  }}
                >
                  {" "}
                  <img
                    className="img-responsive image-resize"
                    src={Facebook}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="socialIcon">
                <a
                  href={`https://www.instagram.com/?url=${encodeURI(
                    document.location.href
                  )}`}
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    this.setState({ shareOption: !this.state.shareOption });
                  }}
                >
                  {" "}
                  <img
                    className="img-responsive image-resize"
                    src={Instagram}
                    alt="instagram"
                  />
                </a>
              </li>
              <li className="socialIcon">
                <a
                  href={`https://twitter.com/share?url=${encodeURI(
                    document.location.href
                  )}`}
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    this.setState({ shareOption: !this.state.shareOption });
                  }}
                >
                  {" "}
                  <img
                    className="img-responsive image-resize"
                    src={Twitter}
                    alt="twitter"
                  />
                </a>
              </li>
              <img
                className="closeIcon"
                src={CloseButton}
                alt="close button"
                onClick={() => {
                  this.setState({ shareOption: !this.state.shareOption });
                }}
              />
         
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ShareButton;
