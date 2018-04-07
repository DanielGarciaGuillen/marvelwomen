import React, { Component } from "react";

import "../App.css";
import ReactModal from "react-modal";

var query = "";

export default class Modal extends Component {
  render() {
    return (
      <div className="modalBox">
        <button className="escapeButton" onClick={this.handleCloseModal}>
          Close Modal
        </button>

        <img className="characterImage" src={image} alt="characterImage" />
        <h2 className="nameCharacter">{this.props.name}</h2>
        <h3 className="event">
          {" "}
          Events{/* <h4>
                  {" "}
                  Events in the Marvel Universe represent big, universe-changing
                  storyline months on history
                </h4>{" "} */}
        </h3>

        <ul className="eventList">{listEvents}</ul>
      </div>
    );
  }
}
